/* eslint-env browser */
import React, { Component } from 'react';
import field from './formconfig';

const PropTypes = require('prop-types');

const { name, type, label } = field;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ email: e.target.value });
  }

  handleSubmit(e) {
    const { props: { doLogin }, state: { email } } = this;
    e.preventDefault();
    if (email) {
      doLogin(email);
    }
  }

  render() {
    return (
      <div className="column" style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            key={name}
            type={type}
            name={name}
            id={name}
            placeholder={`${label} [${type}]`}
            onChange={this.handleChange}
            onBlur={this.handleChange}
            required
          />
          <button
            type="submit"
            className="btn-primary form-control"
          >
            go
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  doLogin: PropTypes.func.isRequired,
};

export default Login;
