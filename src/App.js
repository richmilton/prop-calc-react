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

  handleSubmit = (inputData) => {
    console.log(inputData);
    const dfResult = calculations.initialFinance(inputData);
    const btlResult = calculations.freeCash(inputData);
    const flip = calculations.flip(inputData);
    const stress = calculations.stressTest(inputData);
    //this.setState({});
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
    return (
      <React.Fragment>
        <div className="res-block">
          <h4>Deal finance</h4>
          <ResultList id="1" data={this.state.data.dealFinance}/>
        </div>
        <div className="res-block">
          <h4>Buy to let</h4>
          <ResultList id="2" data={this.state.data.buyToLet}/>
        </div>
        <div className="res-block">
          <h4>Stress test</h4>
          <ResultList id="3" data={this.state.data.stress}/>
        </div>
        <div className="res-block">
          <h4>Flip</h4>
          <ResultList id="4" data={this.state.data.flip}/>
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
              onsubmit={this.handleSubmit}
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
