/* eslint-env browser */
import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import confirmDialog from './common/confirmDialog'; // Import
import Form from './form/FormComponent';
import fields from './form/formconfig';
import '../css/app.css';
import SavedStateList from './saved/SavedStateComponents';
import Results from './results/ResultsComponent';
import calculations from '../logic/calculations';
import Login from './login/LoginComponent';
import Logout from './login/LogoutComponent';
import toastMessages from './toastMessages';
import { toastPlaceHolder } from './common/appConstants';
import shallowObjectEquals from '../util/shallowObjectEquals';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import showDate from '../util/showDate';
import StatelessComponents from './common/StatelessFormComponents';

const PropTypes = require('prop-types');

const { Input } = StatelessComponents;

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
      showInput: true,
      showResults: true,
      showSaved: true,
    };
    this.topRef = React.createRef();
    this.calculate = this.calculate.bind(this);
    this.saveState = this.saveState.bind(this);
    this.deleteState = this.deleteState.bind(this);
    this.selectState = this.selectState.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.toastIt = this.toastIt.bind(this);
    this.checkSaveOrAbortChanges = this.checkSaveOrAbortChanges.bind(this);
    this.tabLink = this.tabLink.bind(this);
    this.selectTab = this.selectTab.bind(this);
  }

  componentDidMount() {
    const { userEmail } = this.state;
    if (userEmail !== '') {
      this.getSavedStates(true);
    }
  }

  getSavedStates(setDefault) {
    const retrieveStates = async () => {
      const sortByNameThenDate = (
        { projectName: pNameA, id: idA },
        { projectName: pNameB, id: idB },
      ) => {
        if ((pNameA + idA) < (pNameB + idB)) return -1;
        if ((pNameA + idA) > (pNameB + idB)) return 1;
        return 0;
      };
      const { userEmail } = this.state;
      let data = null;
      let setDefaultState = setDefault;

      try {
        const resp = await fetch(`${urls.comparisons}/user/${userEmail}`);
        if (resp.status === 200) {
          data = await resp.json();

          if (data.Items.length > 0) {
            data.Items.sort(sortByNameThenDate);
            this.toastIt(toastMessages.dataRetrieved);
          } else {
            this.toastIt(toastMessages.noneSaved);
          }
        } else if (resp.status === 403) {
          this.toastIt(toastMessages.unrecognisedUser);
        } else {
          setDefaultState = true;
          this.toastIt(toastMessages.dataRetrievalError);
        }
      } catch (e) {
        setDefaultState = true;
        this.toastIt(toastMessages.dataRetrievalError);
      } finally {
        this.loadState(data, setDefaultState);
      }
    };
    retrieveStates(setDefault).then(() => ({ getSavedStates: 'finished' }));
  }

  toastIt({ message, options }, label) {
    const { toastManager } = this.props;
    toastManager.add(message.replace(toastPlaceHolder, label), options);
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

  saveState() {
    const persistState = async () => {
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
        this.toastIt(toastMessages.savedSuccess, projectName);
      } catch (e) {
        this.toastIt(toastMessages.saveError, projectName);
      } finally {
        // don't overwrite changes in form
        this.getSavedStates(false);
      }
    };
    persistState().then(() => ({ saveState: 'finished' }));
  }

  deleteState(stateId) {
    const { projectName } = this.findState(stateId);
    const message = `do you really want to delete '${projectName}' created ${showDate(stateId)}`;
    confirmDialog(message, () => {
      let setDefault = false;
      const removeState = async (deleteStateId) => {
        const { userEmail } = this.state;
        try {
          const resp = await fetch(urls.comparisons, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: deleteStateId, email: userEmail }),
          });
          if (resp.status === 200) {
            const { currentState: id } = this.state;
            setDefault = id === deleteStateId;
            this.toastIt(toastMessages.deleteSuccess, projectName);
          }
        } catch (err) {
          this.toastIt(toastMessages.deleteError, projectName);
        } finally {
          this.getSavedStates(setDefault);
        }
      };
      removeState(stateId).then(() => ({ delete: 'finished' }));
    });
  }

  selectState(stateId) {
    this.checkSaveOrAbortChanges(() => {
      const selectedState = this.findState(stateId);
      this.setState({ currentState: selectedState, showInput: true }, () => {
        const { currentState: { projectName } } = this.state;
        this.toastIt(toastMessages.loaded, projectName);
        this.calculate();
        window.scrollTo({ top: this.topRef, left: 0, behavior: 'smooth' });
      });
    });
  }

  checkSaveOrAbortChanges(fn) {
    const { currentState, currentState: { projectName, id } } = this.state;
    const changed = projectName !== '' && !shallowObjectEquals(currentState, this.findState(id));
    const message = `'${projectName}' data has changed, changes will be lost, do you want to continue?`;
    if (!changed) {
      fn();
    } else {
      confirmDialog(message, fn, 'Save new version and continue', () => {
        this.saveState();
        fn();
      });
    }
  }

  handleNew(e) {
    this.checkSaveOrAbortChanges(() => {
      e.preventDefault();
      this.setState(
        { currentState: App.setDefaultFormData() }, () => this.calculate(),
      );
    });
    e.target.blur();
  }

  login(email) {
    const { cookies } = this.props;
    cookies.set('email', email, { path: '/' });
    this.setState({ userEmail: email }, () => {
      this.toastIt(toastMessages.login, email);
      this.getSavedStates(true);
    });
  }

  tabLink(event) {
    event.preventDefault();
    const { id } = event.target;
    this.setState({ selectedTab: id });
  }

  logout() {
    const { cookies } = this.props;
    cookies.set('email', '', { path: '/' });
    this.setState({ userEmail: '' }, () => {
      this.toastIt(toastMessages.logout);
    });
  }

  selectTab(event) {
    const { target: { name, checked } } = event;
    this.setState({ [name]: checked });
  }

  render() {
    const {
      currency,
      savedStates,
      currentState,
      hasWorkingAPI,
      error,
      userEmail,
      showInput,
      showResults,
      showSaved,
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
          {toastMessages.unrecognisedUser.message}
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
        <div className="d-flex flex-wrap">
          <div
            ref={this.topRef}
            className="column text-center"
          >
            <h5>Property investment deal analyser</h5>
          </div>
          <div className="column">
            <ul className="display-options">
              <li className="do-label">
                show:
              </li>
              <Input
                style={{ float: 'left' }}
                name="showInput"
                label="input"
                defVal={showInput ? 'yes' : 'no'}
                type="checkbox"
                onInput={this.selectTab}
                placeholder=""
                required={false}
              />
              <Input
                style={{ float: 'left' }}
                name="showResults"
                defVal={showResults ? 'yes' : 'no'}
                label="results"
                type="checkbox"
                onInput={this.selectTab}
                placeholder=""
                required={false}
              />
              <Input
                style={{ float: 'left' }}
                name="showSaved"
                defVal={showSaved ? 'yes' : 'no'}
                label="saved"
                type="checkbox"
                onInput={this.selectTab}
                placeholder=""
                required={false}
              />
            </ul>
          </div>
        </div>
        <div
          className="column input-form"
          style={{ display: showInput ? '' : 'none' }}
        >
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
        <div className="column results" style={{ display: showResults ? '' : 'none' }}>
          {Results(this.state)}
        </div>
        <div className="column states" style={{ display: showSaved ? '' : 'none' }}>
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
  cookies: PropTypes.instanceOf(Object).isRequired,
  toastManager: PropTypes.instanceOf(Object).isRequired,
};

export default withCookies(App);
