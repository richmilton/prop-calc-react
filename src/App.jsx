/* eslint-env browser */
import React, { Component } from 'react';
import Form from './components/FormComponent';
import { fields } from './components/formconfig';
import './css/app.css';
import ResultList from './components/ResultListComponent';
import SavedStateList from './components/SavedStateComponents';
import calculations from './logic/calculations';

class App extends Component {
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
      savedStates: [],
    };
    this.doResults = this.doResults.bind(this);
    this.calculate = this.calculate.bind(this);
    this.saveState = this.saveState.bind(this);
    this.deleteState = this.deleteState.bind(this);
    // this.selectState = this.selectState.bind(this);
  }

  componentDidMount() {
    this.getSavedStates();
  }

  getSavedStates() {
    fetch('http://localhost:3000/comparisons')
      .then(response => response.json())
      .then(data => this.setState({ savedStates: data }))
      .catch(() => this.setState({ savedStates: { Items: 'No saved items avaialable' } }));
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

  selectState(stateId) {
    alert(stateId);
  }

  render() {
    const { currency, savedStates } = this.state;
    const { Items } = savedStates;
    const savedStateList = (
      <SavedStateList
        data={Items}
        ondelete={this.deleteState}
        onselect={this.selectState}
      />
    );
    const savedList = Items ? savedStateList : '';

    return (
      <div className="App">
        <div className="column">
          <Form
            name="propcalc"
            fields={fields}
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
    );
  }
}
export default App;
