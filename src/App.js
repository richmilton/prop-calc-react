import React, { Component } from 'react';
import Form from './components/FormComponent';
import fields from './components/formconfig';
import './App.css';
import ResultList from './components/ResultListComponent';
import calculations from './logic/calculations';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        dealFinance: [],
        buyToLet: []
      },
      show: 'form'
    };
  }

  handleSubmit = (inputData) => {
    console.log(inputData);
    const dfResult = calculations.initialFinance(inputData);
    const btlResult = calculations.freeCash(inputData)
    //this.setState({});
    this.setState({data: {dealFinance: dfResult, buyToLet: btlResult}, show: 'results'})
  };

  handleGoBack = () => {
    this.setState({show: 'form'})
  }

  doContent () {
    if (this.state.show === 'results') {
      return (
        <React.Fragment>
          <button
            className='btn-primary form-control'
            onClick={this.handleGoBack}
          >
            Go Back
          </button>
          <ResultList id="1" data={this.state.data.dealFinance}/>
          <ResultList id="2" data={this.state.data.buyToLet}/>
        </React.Fragment>
      )
    }
    else {
      return (
        <Form
          name={'login'}
          fields={fields}
          onsubmit={this.handleSubmit}
        />
      )
    }
  };

  render() {

    return (
      <div className="App">
        <header className="App-header">
          {this.doContent()}
        </header>
      </div>
    );
  }
}

export default App;
