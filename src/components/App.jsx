/* eslint-env browser */
import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import Form from './form/FormComponent';
import fields from './form/formconfig';
import '../css/app.css';
import SavedStateList from './saved/SavedStateComponents';
import Results from './results/ResultsComponent';
import calculations from '../logic/calculations';
import Login from './login/LoginComponent';
import Logout from './login/LogoutComponent';
// import stateAPI from '../api/state-api';

const PropTypes = require('prop-types');

const urls = {
  comparisons: process.env.REACT_APP_COMPARISONS_URL,
};

class App extends Component {
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
      currentState: { projectName: '' },
      hasWorkingAPI: false,
      userEmail: props.cookies.get('email') || '',
    };
    this.calculate = this.calculate.bind(this);
    this.saveState = this.saveState.bind(this);
    this.deleteState = this.deleteState.bind(this);
    this.selectState = this.selectState.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { userEmail } = this.state;
    if (userEmail !== '') {
      this.getSavedStates(true);
    }
  }

  async getSavedStates(setDefault) {
    const sortByNameThenDate = (
      { projectName: pNameA, id: idA },
      { projectName: pNameB, id: idB },
    ) => {
      if ((pNameA + idA) < (pNameB + idB)) return -1;
      if ((pNameA + idA) > (pNameB + idB)) return 1;
      return 0;
    };
    const { userEmail } = this.state;

    try {
      const resp = await fetch(`${urls.comparisons}/user/${userEmail}`);
      if (resp.status === 200) {
        const data = await resp.json();

        if (data.Items.length > 0) {
          data.Items.sort(sortByNameThenDate);
        }
        this.loadState(data, setDefault);
      }
    } catch (e) {
      // console.log(e)
      this.loadState(null, true);
    }
  }

  findState(stateId) {
    const { savedStates } = this.state;
    return savedStates.Items.find(state => state.id === stateId);
  }

  loadState(data, setDefault) {
    const { userEmail } = this.state;
    const newState = {
      savedStates: data || { Items: [] },
      hasWorkingAPI: !!data,
    };

    if (setDefault) {
      newState.currentState = App.setDefaultFormData();
    }

    if (userEmail && newState.currentState) {
      newState.currentState.email = userEmail;
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

  async saveState() {
    const { currentState, currentState: { projectName, postCode }, userEmail } = this.state;
    if (projectName === '' || postCode === '') {
      return;
    }
    const stateToSave = { ...currentState, email: userEmail };
    try {
      const resp = await fetch(urls.comparisons, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stateToSave),
      });
      await resp.json();
      this.getSavedStates(false);
    } catch (e) {
      // err
    }
  }

  async deleteState(stateId) {
    const { userEmail } = this.state;
    try {
      const resp = await fetch(urls.comparisons, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: stateId, email: userEmail }),
      });
      if (resp.ok) {
        const { currentState: id } = this.state;
        this.getSavedStates(stateId === id);
      }
      // failed
    } catch (err) {
      // err
    }
  }

  selectState(stateId) {
    const selectedState = this.findState(stateId);
    this.setState({ currentState: selectedState }, () => this.calculate());
  }

  handleNew(e) {
    e.preventDefault();
    this.setState(
      { currentState: App.setDefaultFormData() }, () => this.calculate(),
    );
    e.target.blur();
  }

  login(email) {
    const { cookies } = this.props;
    cookies.set('email', email, { path: '/' });
    this.setState({ userEmail: email }, () => {
      this.getSavedStates(true);
    });
  }

  logout() {
    const { cookies } = this.props;
    cookies.set('email', '', { path: '/' });
    this.setState({ userEmail: '' });
  }

  render() {
    const {
      currency,
      savedStates,
      currentState,
      hasWorkingAPI,
      error,
      userEmail,
    } = this.state;
    const { projectName, postCode } = currentState;
    const showSave = (
      hasWorkingAPI
      && projectName !== ''
      && postCode !== ''
    );
    const { Items } = savedStates;
    const emailDomain = userEmail.split('@')[1];
    const savedList = Items.length > 0 && userEmail ? (
      <React.Fragment>
        <SavedStateList
          data={Items}
          ondelete={this.deleteState}
          onclick={this.selectState}
          useremail={userEmail}
          filter={o => o.email === userEmail}
          doLogin={this.login}
        />
        <h6>
          Other saved stuff from
          {` ${emailDomain}`}
        </h6>
        <SavedStateList
          data={Items}
          ondelete={this.deleteState}
          onclick={this.selectState}
          useremail={userEmail}
          filter={o => o.email !== userEmail}
        />
      </React.Fragment>
    )
      : (
        <div style={{ float: 'left' }}>
          You need to be whitelisted to use the view and save functions.
          You can still use the app to perform calculations which can be printed,
          if you want to save copies.
        </div>
      );
    const newButton = currentState.projectName !== '' ? (
      <ul className="right">
        <li>
          <button
            type="submit"
            className="btn-primary form-control"
            onClick={event => this.handleNew(event)}
          >
            new
          </button>
        </li>
      </ul>
    ) : '';

    return Object.keys(currentState).length > 1 && userEmail ? (
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
            showsave={showSave}
            error={error}
          />
          {newButton}
        </div>
        <div className="column results">
          {Results(this.state)}
        </div>
        <div className="column states">
          <div className="my-stuff">
            <h6>
              My stuff (
              {userEmail}
              )
            </h6>
          </div>
          <div className="logout">
            <Logout
              doLogout={this.logout}
            />
          </div>
          <div className="saved-list">
            {savedList}
          </div>
        </div>
      </div>
    )
      : (
        <Login
          doLogin={this.login}
        />
      );
  }
}

App.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(App);
