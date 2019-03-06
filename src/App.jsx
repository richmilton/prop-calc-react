/* eslint-env browser */
import React, { Component } from 'react';
import Form from './components/FormComponent';
import { fields } from './components/formconfig';
import './css/app.css';
import ResultList from './components/ResultListComponent';
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
  }

  componentDidMount() {
    fetch('http://localhost:3000/comparisons')
      .then(response => response.json())
      .then(data => this.setState({ savedStates: data }));
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
    const { state } = this;
    const {
      dealFinance,
      buyToLet,
      stress,
      flip,
    } = state.data;

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

  render() {
    const { currency, savedStates } = this.state;
    return (
      <div className="App">
        <div className="column">
          <Form
            name="propcalc"
            fields={fields}
            twocols="yes"
            calculate={this.calculate}
            currsymbol={currency}
          />
        </div>
        <div className="column results">
          {this.doResults()}
        </div>
        <div className="column states">
          {JSON.stringify(savedStates)}
        </div>
      </div>
    );
  }
}
export default App;
