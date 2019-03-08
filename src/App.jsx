/* eslint-env browser */
import React, { Component } from 'react';
import Form from './components/FormComponent';
import { fields } from './components/formconfig';
import './css/app.css';
import ResultList from './components/ResultListComponent';
import SavedStateList from './components/SavedStateComponents';
import calculations from './logic/calculations';

class App extends Component {
  static findState(savedStates, stateId) {
    return savedStates.Items.find((state, idx) => {
      if (state.id === stateId) {
        return idx;
      }
      return null;
    });
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
      selectedState: null,
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
    const selectedStateId = window.location.pathname.substr(1);
    fetch('http://localhost:3000/comparisons')
      .then(response => response.json())
      .then((data) => {
        let formData;
        if (selectedStateId !== '') {
          formData = App.findState(data, selectedStateId);
          if (!formData) {
            window.location = '/';
          }
        } else {
          formData = this.setDefaultFormData();
        }
        this.setState({
          savedStates: data,
          selectedState: formData,
        });
      })
      .catch(() => {
        if (selectedStateId !== '') {
          window.location = '/';
        } else {
          this.setState({
            savedStates: { Items: 'No saved items avaialable' },
            selectedState: this.setDefaultFormData(),
          });
        }
      });
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

  calculate(inputData) {
    const dfResult = calculations.initialFinance(inputData);
    const btlResult = calculations.freeCash(inputData);
    const flip = calculations.flip(inputData);
    const stress = calculations.stressTest(inputData);
    const currSymbol = calculations.getCurrencyCode(inputData);

    this.setState({
      data: {
        dealFinance: dfResult,
        buyToLet: btlResult,
        stress,
        flip,
      },
      currency: currSymbol,
    });
  }

  doResults() {
    const { data } = this.state;
    const {
      dealFinance,
      buyToLet,
      stress,
      flip,
    } = data;

    return (
      <React.Fragment>
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

  saveState(formData) {
    fetch('http://localhost:3000/comparisons', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(() => {
        this.getSavedStates();
      }).catch(() => this.setState({ savedStates: { Items: 'No save service avaialable' } }));
  }

  deleteState(stateId) {
    fetch('http://localhost:3000/comparisons', {
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
    const { currency, savedStates, selectedState } = this.state;
    const { Items } = savedStates;
    const savedStateList = (
      <SavedStateList
        data={Items}
        ondelete={this.deleteState}
      />
    );
    const savedList = Items ? savedStateList : '';

    return selectedState ? (
      <div className="App">
        <div className="column">
          <Form
            name="propcalc"
            fields={fields}
            formData={selectedState}
            twocols="yes"
            calculate={this.calculate}
            currsymbol={currency}
            onsave={this.saveState}
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
