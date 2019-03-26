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

  static setDefaultFormData() {
    const defaults = {};
    fields.map((ob) => {
      defaults[ob.name] = ob.defVal;
      return false;
    });
    return defaults;
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
      currency: 163,
      savedStates: { Items: [] },
      currentState: null,
      hasWorkingAPI: false,
    };
    this.doResults = this.doResults.bind(this);
    this.calculate = this.calculate.bind(this);
    // this.setDefaultFormData = this.setDefaultFormData.bind(this);
    this.saveState = this.saveState.bind(this);
    this.deleteState = this.deleteState.bind(this);
    this.selectState = this.selectState.bind(this);
  }

  componentDidMount() {
    this.getSavedStates(true);
  }

  getSavedStates(setDefault) {
    fetch(urls.comparisons)
      .then(response => response.json())
      .then((data) => {
        if (data.Items.length > 0) {
          data.Items.sort((a, b) => {
            if (a.projectName < b.projectName) return -1;
            if (a.projectName > b.projectName) return 1;
            return 0;
          });
        }
        this.loadState(data, setDefault);
      })
      .catch(() => {
        this.loadState(null, true);
      });
  }

  loadState(data, setDefault) {
    const newState = {
      savedStates: data || { Items: [] },
      hasWorkingAPI: !!data,
    };

    if (setDefault) {
      newState.currentState = App.setDefaultFormData();
    }

    this.setState(newState);
  }

  calculate(changedField, newValue) {
    const { currentState } = this.state;
    const inputData = (changedField)
      ? { ...currentState, [changedField]: newValue } : currentState;
    const dealFinance = calculations.initialFinance(inputData);
    const buyToLet = calculations.freeCash(inputData);
    const flip = calculations.flip(inputData);
    const stress = calculations.stressTest(inputData);
    const currSymbol = calculations.getCurrencyCode(inputData);

    document.getElementById('doc-title').text = inputData.projectName.replace(/ /g, '-');

    const newState = {
      data: {
        dealFinance,
        buyToLet,
        stress,
        flip,
      },
      currency: currSymbol,
    };

    if (changedField) {
      newState.currentState = inputData;
    }

    this.setState(newState);
  }

  doResults() {
    const { data, currentState } = this.state;
    const {
      postCode,
      askingPrice,
      monthlyRent,
      propertyValue,
    } = currentState;
    const {
      dealFinance,
      buyToLet,
      stress,
      flip,
    } = data;
    const { oneK, oneHundredK } = { oneK: 1000, oneHundredK: 100000 };
    const maxPrice = Math
      .ceil((askingPrice || propertyValue || 400000) / oneHundredK * 1.2) * oneHundredK;
    const maxRent = Math.ceil((monthlyRent || oneK) / oneK * 1.2) * oneK;
    const links = (postCode && validatePostcode(postCode)) ? (
      <React.Fragment>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={urls.nhpSold + postCode}
        >
          sold data
        </a>
        {' | '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${urls.rmBuy + postCode}&maxPrice=${(maxPrice)}`}
        >
          for sale
        </a>
        {' | '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${urls.rmRent + postCode}&maxPrice=${maxRent}`}
        >
          to rent
        </a>
      </React.Fragment>
    ) : <span style={{ color: 'red', fontStyle: 'italic' }}>use a full valid post code to see links here</span>;
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
      .then(() => {
        this.getSavedStates(false);
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
          const { currentState } = this.state;
          this.getSavedStates(stateId === currentState.id);
        } else {
          throw new Error('delete failed');
        }
      }).catch(() => this.setState({ savedStates: { Items: 'No delete service avaialable' } }));
  }

  selectState(stateId) {
    const { savedStates } = this.state;
    const selectedState = App.findState(savedStates, stateId);
    this.setState({ currentState: selectedState }, () => this.calculate());
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
        onclick={this.selectState}
      />
    );
    const savedList = Items ? savedStateList : '';
    const newButton = (
      <ul className="right">
        <li>
          <button
            type="submit"
            className="btn-primary form-control"
            onClick={
              (e) => {
                e.preventDefault();
                this.setState(
                  { currentState: App.setDefaultFormData() }, () => this.calculate(),
                );
                e.target.blur();
              }
            }
          >
            new
          </button>
        </li>
      </ul>
    );

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
