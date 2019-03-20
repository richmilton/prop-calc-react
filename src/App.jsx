/* eslint-env browser */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import Form from './components/FormComponent';
import { fields } from './components/formconfig';
import './css/app.css';
import ResultList from './components/ResultListComponent';
import SavedStateList from './components/SavedStateComponents';
import calculations from './logic/calculations/index';
import validatePostcode from './util/validate-postcode';

const urls = {
  comparisons: process.env.REACT_APP_COMPARISONS_URL,
  rmBuy: process.env.REACT_APP_RM_BUY_URL,
  rmRent: process.env.REACT_APP_RM_LET_URL,
  nhpSold: process.env.REACT_APP_NHP_SOLD_URL,
};

class App extends Component {
  static findState(savedStates, stateId) {
    return savedStates.Items.find(state => state.id === stateId);
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {
        dealFinance: [],
        buyToLet: [],
        stress: [],
        flip: [],
      },
      fields,
      currency: 163,
      savedStates: { Items: [] },
      currentState: null,
      hasWorkingAPI: false,
    };
    this.doResults = this.doResults.bind(this);
    this.calculate = this.calculate.bind(this);
    this.setDefaultFormData = this.setDefaultFormData.bind(this);
    this.saveState = this.saveState.bind(this);
    this.deleteState = this.deleteState.bind(this);
  }

  componentDidMount() {
    this.getSavedStates();
  }

  getSavedStates(id) {
    const loadDefault = (hasApi) => {
      this.setState({
        savedStates: { Items: [] },
        currentState: this.setDefaultFormData(),
        hasWorkingAPI: hasApi,
      });
    };

    if (!urls.comparisons || urls.comparisons === '') {
      loadDefault();
    } else {
      const selectedStateId = window.location.pathname.substr(1) || '';
      fetch(urls.comparisons)
        .then(response => response.json())
        .then((data) => {
          if (!id && selectedStateId === '') {
            this.setState({
              savedStates: data,
              hasWorkingAPI: true,
              currentState: this.setDefaultFormData(),
            });
          } else {
            const stateToLoad = App.findState(data, (selectedStateId || id));
            if (!stateToLoad) {
              window.location = '/';
            } else if (id && selectedStateId !== id) {
              window.location = `/${id}`;
            } else {
              this.setState({
                savedStates: data,
                hasWorkingAPI: true,
                currentState: stateToLoad || this.setDefaultFormData(),
              });
            }
          }
        })
        .catch(() => {
          if (selectedStateId !== '') {
            window.location = '/';
          } else {
            loadDefault(false);
          }
        });
    }
  }

  setDefaultFormData() {
    const defaults = {};
    const { state } = this;
    state.fields.map((ob) => {
      defaults[ob.name] = ob.defVal;
      return false;
    });
    return defaults;
  }

  calculate(changedField, newValue) {
    const { currentState } = this.state;
    const inputData = (changedField && newValue)
      ? { ...currentState, [changedField]: newValue } : currentState;
    const dealFinance = calculations.initialFinance(inputData);
    const buyToLet = calculations.freeCash(inputData);
    const flip = calculations.flip(inputData);
    const stress = calculations.stressTest(inputData);
    const currSymbol = calculations.getCurrencyCode(inputData);

    document.getElementById('doc-title').text = inputData.projectName.replace(/ /g, '-');

    this.setState({
      data: {
        dealFinance,
        buyToLet,
        stress,
        flip,
      },
      currency: currSymbol,
      currentState: inputData,
    });
  }

  doResults() {
    const { data, currentState } = this.state;
    const { postCode } = currentState;
    const {
      dealFinance,
      buyToLet,
      stress,
      flip,
    } = data;
    const links = (postCode && validatePostcode(postCode)) ? (
      <React.Fragment>
        <a target="_blank" rel="noopener noreferrer" href={urls.nhpSold + postCode}>sold data</a>
        {' | '}
        <a target="_blank" rel="noopener noreferrer" href={urls.rmBuy + postCode}>for sale</a>
        {' | '}
        <a target="_blank" rel="noopener noreferrer" href={`${urls.rmRent + postCode}`}>to rent</a>
      </React.Fragment>
    ) : <span style={{ color: 'red' }}>use a full valid post code to see links here</span>;
    return (
      <React.Fragment>
        <div className="res-block">
          <h6>Links for this post code</h6>
          {links}
        </div>
        <div className="res-block">
          <h6>Deal finance</h6>
          <ResultList id="1" data={dealFinance} />
        </div>
        <div className="res-block">
          <h6>Buy to let</h6>
          <ResultList id="2" data={buyToLet} />
        </div>
        <div className="res-block">
          <h6>Stress test</h6>
          <ResultList id="3" data={stress} />
        </div>
        <div className="res-block">
          <h6>Flip</h6>
          <ResultList id="4" data={flip} />
        </div>
      </React.Fragment>
    );
  }

  saveState() {
    const { currentState } = this.state;
    const { projectName, postCode } = currentState;
    if (projectName === '' || postCode === '') {
      return;
    }
    fetch(urls.comparisons, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentState),
    })
      .then(response => response.json())
      .then(({ id }) => {
        this.getSavedStates(id);
      })
      .catch(() => this.setState({ savedStates: { Items: 'No save service avaialable' } }))
      .finally(() => {
        this.setState({ error: null });
      });
  }

  deleteState(stateId) {
    fetch(urls.comparisons, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: stateId }),
    })
      .then((resp) => {
        if (resp.ok) {
          this.getSavedStates();
        } else {
          throw new Error('delete failed');
        }
      }).catch(() => this.setState({ savedStates: { Items: 'No delete service avaialable' } }));
  }

  render() {
    const {
      currency,
      savedStates,
      currentState,
      hasWorkingAPI,
      error,
    } = this.state;
    const { Items } = savedStates;
    const savedStateList = (
      <SavedStateList
        data={Items}
        ondelete={this.deleteState}
      />
    );
    const savedList = Items ? savedStateList : '';
    const newButton = window.location.pathname !== '/'
      ? (
        <ul className="right">
          <li>
            <button
              type="submit"
              className="btn-primary form-control"
              onClick={() => { window.location.href = '/'; }}
            >
              new
            </button>
          </li>
        </ul>
      )
      : '';

    return currentState ? (
      <div className="App">
        <div className="column" style={{ textAlign: 'center' }}>
          <h5>Property investment deal analyser</h5>
          <Form
            name="propcalc"
            fields={fields}
            formData={currentState}
            twocols="yes"
            calculate={this.calculate}
            currsymbol={currency}
            onsave={this.saveState}
            showsave={hasWorkingAPI}
            error={error}
          />
          {newButton}
        </div>
        <div className="column results">
          {this.doResults()}
        </div>
        <div className="column states">
          {savedList}
        </div>
      </div>
    ) : '';
  }
}
export default App;
