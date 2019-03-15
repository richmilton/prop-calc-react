/* eslint-env browser */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import Form from './components/FormComponent';
import { fields } from './components/formconfig';
import './css/app.css';
import ResultList from './components/ResultListComponent';
import SavedStateList from './components/SavedStateComponents';
import calculations from './logic/calculations/index';

const urls = {
  comparisons: 'http://192.168.0.12:3000/comparisons',
  rmBuy: 'https://www.rightmove.co.uk/property-for-sale/search.html?searchLocation=',
  rmRent: 'https://www.rightmove.co.uk/property-to-rent/search.html?searchLocation=',
  nhpSold: 'https://nethouseprices.com/house-prices/',
};

const postCodeRegEx = /^(GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\d{1,4})$/;

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

  getSavedStates(id) {
    const loadDefault = (hasApi) => {
      this.setState({
        savedStates: { Items: [] },
        currentState: this.setDefaultFormData(),
        hasWorkingAPI: hasApi,
      });
    };

    if (urls.comparisons === '') {
      loadDefault();
    } else {
      const selectedStateId = window.location.pathname.substr(1) || '';
      fetch(urls.comparisons)
        .then(response => response.json())
        .then((data) => {
          if (selectedStateId === '') {
            this.setState({
              savedStates: data,
              hasWorkingAPI: true,
              currentState: this.setDefaultFormData(),
            });
          } else {
            const stateToLoad = App.findState(data, selectedStateId);
            if (!stateToLoad) {
              window.location = '/';
            } else if (id && selectedStateId && selectedStateId !== id) {
              window.location = `/${id || selectedStateId}`;
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
    const links = (postCode && postCodeRegEx.test(postCode.toUpperCase())) ? (
      <div className="res-block">
        <h4>Links for this post code</h4>
        <a target="_blank" rel="noopener noreferrer" href={urls.nhpSold + postCode}>sold data</a>
        {' | '}
        <a target="_blank" rel="noopener noreferrer" href={`${urls.rmBuy + postCode}&radius=0.25&includeSSTC=true`}>for sale</a>
        {' | '}
        <a target="_blank" rel="noopener noreferrer" href={`${urls.rmRent + postCode}&radius=0.25&&includeLetAgreed=true`}>to rent</a>
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
            error={error}
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
