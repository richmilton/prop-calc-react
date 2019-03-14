/* eslint-env browser */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import Form from './components/FormComponent';
import { fields } from './components/formconfig';
import './css/app.css';
import ResultList from './components/ResultListComponent';
import SavedStateList from './components/SavedStateComponents';
import calculations from './logic/calculations/index';

// https://nethouseprices.com/house-prices/bs16%203uh
// https://www.rightmove.co.uk/property-to-rent/search.html?searchLocation=BS16+3UH
// https://www.rightmove.co.uk/property-for-sale/search.html?searchLocation=BS16+3UH

const urls = {
  comparisons: 'http://192.168.0.12:3000/comparisons',
  rmBuy: 'https://www.rightmove.co.uk/property-for-sale/search.html?searchLocation=',
  rmRent: 'https://www.rightmove.co.uk/property-to-rent/search.html?searchLocation=',
  nhpSold: 'https://nethouseprices.com/house-prices/',
};

// const url = '';

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

  getSavedStates() {
    const loadDefault = () => {
      this.setState({
        savedStates: { Items: [] },
        currentState: this.setDefaultFormData(),
        hasWorkingAPI: false,
      });
    };

    if (urls.comparisons === '') {
      loadDefault();
    } else {
      const selectedStateId = window.location.pathname.substr(1);
      fetch(urls.comparisons)
        .then(response => response.json())
        .then((data) => {
          let stateToLoad;
          if (selectedStateId !== '') {
            stateToLoad = App.findState(data, selectedStateId);
            if (!stateToLoad) {
              window.location = '/';
            }
          } else {
            stateToLoad = this.setDefaultFormData();
          }
          this.setState({
            savedStates: data,
            currentState: stateToLoad,
            hasWorkingAPI: true,
          });
        })
        .catch(() => {
          if (selectedStateId !== '') {
            window.location = '/';
          } else {
            loadDefault();
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
    const inputData = { ...currentState, [changedField]: newValue };
    const dealFinance = calculations.initialFinance(inputData);
    const buyToLet = calculations.freeCash(inputData);
    const flip = calculations.flip(inputData);
    const stress = calculations.stressTest(inputData);
    const currSymbol = calculations.getCurrencyCode(inputData);

    if (changedField === 'projectName') {
      document.getElementById('doc-title').text = newValue.replace(/ /g, '-');
    }

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
    const links = (postCode !== '') ? (
      <div className="res-block">
        <h4>Links</h4>
        <a target="_blank" rel="noopener noreferrer" href={urls.nhpSold + postCode}>sold data</a>
        {' | '}
        <a target="_blank" rel="noopener noreferrer" href={urls.rmBuy + postCode}>for sale</a>
        {' | '}
        <a target="_blank" rel="noopener noreferrer" href={urls.rmRent + postCode}>to rent</a>
      </div>
    ) : '';

    return (
      <React.Fragment>
        {links}
        <div className="res-block">
          <h4>Deal finance</h4>
          <ResultList id="1" data={dealFinance} />
        </div>
        <div className="res-block">
          <h4>Buy to let</h4>
          <ResultList id="2" data={buyToLet} />
        </div>
        <div className="res-block">
          <h4>Stress test</h4>
          <ResultList id="3" data={stress} />
        </div>
        <div className="res-block">
          <h4>Flip</h4>
          <ResultList id="4" data={flip} />
        </div>
      </React.Fragment>
    );
  }

  saveState() {
    const { currentState } = this.state;
    if (currentState.projectName === '') {
      alert('you must supply a project name');
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
        this.getSavedStates();
      }).catch(() => this.setState({ savedStates: { Items: 'No save service avaialable' } }));
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
    } = this.state;
    const { Items } = savedStates;
    const savedStateList = (
      <SavedStateList
        data={Items}
        ondelete={this.deleteState}
      />
    );
    const savedList = Items ? savedStateList : '';

    return currentState ? (
      <div className="App">
        <div className="column">
          <Form
            name="propcalc"
            fields={fields}
            formData={currentState}
            twocols="yes"
            calculate={this.calculate}
            currsymbol={currency}
            onsave={this.saveState}
            showsave={hasWorkingAPI}
          />
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
