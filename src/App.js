import React, { Component } from 'react';
import Form from './components/FormComponent';
import fields from './components/formconfig';
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
        flip: []
      }
    };
  }

  calculate = (inputData) => {

    const dfResult = calculations.initialFinance(inputData);
    const btlResult = calculations.freeCash(inputData);
    const flip = calculations.flip(inputData);
    const stress = calculations.stressTest(inputData);

    this.setState({
      data: {
        dealFinance: dfResult,
        buyToLet: btlResult,
        stress: stress,
        flip: flip
      }
    });
  };

  doResults = () => {

    const {dealFinance, buyToLet, stress, flip} = this.state.data;
    
    return (
      <React.Fragment>
        <div className="res-block">
          <h4>Deal finance</h4>
          <ResultList id="1" data={dealFinance}/>
        </div>
        <div className="res-block">
          <h4>Buy to let</h4>
          <ResultList id="2" data={buyToLet}/>
        </div>
        <div className="res-block">
          <h4>Stress test</h4>
          <ResultList id="3" data={stress}/>
        </div>
        <div className="res-block">
          <h4>Flip</h4>
          <ResultList id="4" data={flip}/>
        </div>
      </React.Fragment>
    )
  };

  render() {

    return (
      <div className="App">
          <div className="column">
            <Form
              name={'propcalc'}
              fields={fields}
              twocols="yes"
              calculate={this.calculate}
            />
          </div>
          <div className="column results">
            {this.doResults()}
          </div>
      </div>
    );
  }
}

export default App;
