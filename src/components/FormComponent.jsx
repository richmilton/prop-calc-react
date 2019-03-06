/* eslint react/prop-types: 0 */
/* eslint-env browser */
import React, { Component } from 'react';
import StatelessComponents from './StatelessFormComponents';

const { Input, Select } = StatelessComponents;

function FormColumn({ render, fields, className }) {
  return (
    <ul className={className}>
      {render(fields)}
    </ul>
  );
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: props.fields,
    };
    this.defValues = this.defValues.bind(this);
    this.doLabel = this.doLabel.bind(this);
    this.doLabelClass = this.doLabelClass.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.renderFieldCols = this.renderFieldCols.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.setState(this.defValues());
  }

  componentDidUpdate() {
    const { state } = this;
    const { projName } = state.formData;
    document.getElementById('doc-title').text = projName ? projName.replace(/ /g, '-') : 'Untitled';
  }

  defValues() {
    const v = {};
    const { props } = this;
    props.fields.map((ob) => {
      v[ob.name] = ob.defVal;
      return false;
    });
    props.calculate(v);
    return { formData: v };
  }

  doLabel(fname, label) {
    const { formData } = this.state;
    return formData && formData[fname] ? label || fname : '';
  }

  doLabelClass(fname) {
    const { formData } = this.state;
    return formData && formData[fname] ? 'show' : 'hide';
  }

  handleChange({
    type,
    value,
    checked,
    name,
  }) {
    const { state, props } = this;
    const { formData } = state;
    let val;
    switch (type) {
      case 'number':
        val = Number.isNaN(value) ? 0 : (parseFloat(value) || 0);
        break;
      case 'checkbox':
        val = checked ? 'yes' : 'no';
        break;
      default:
        val = value || '';
    }

    formData[name] = val;

    this.setState({ formData }, () => {
      if (/^select-one$|^checkbox$|^number$/.test(type)) {
        props.calculate(state.formData);
      }
    });
  }

  handleSave(e) {
    e.preventDefault();
    const { formData } = this.state;
    fetch('http://localhost:3000/comparisons', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then((r) => {
        alert(`saved ${r.id}`);
      });
  }

  renderFields(fields) {
    const formFields = [];
    const { props } = this;
    fields.forEach((field) => {
      const ob = { ...field };
      ob.dynamicLabel = (n, l) => this.doLabel(n, l);
      ob.doLabelClass = n => this.doLabelClass(n);
      ob.onInput = e => this.handleChange(e.target);
      ob.onblur = e => this.handleChange(e.target);
      ob.currency = props.currsymbol;
      if (ob.type === 'select') {
        formFields.push(Select(ob));
      } else {
        formFields.push(Input(ob));
      }
    });
    return formFields;
  }

  renderFieldCols() {
    const { state } = this;
    const arrLength = Math.floor(state.fields.length / 2);
    const left = state.fields.slice(0);
    const right = left.splice(arrLength);

    return [
      <FormColumn
        key="1"
        fields={left}
        className="left"
        render={this.renderFields}
      />,
      <FormColumn
        key="2"
        fields={right}
        className="right"
        render={this.renderFields}
      />,
    ];
  }

  render() {
    const { props } = this;
    return (
      <form
        name={props.name}
        id={props.name}
      >
        {props.twocols === 'yes' ? this.renderFieldCols() : this.renderFields(props.fields)}
        <button type="submit" className="btn-primary form-control" onClick={this.handleSave}>save this</button>
      </form>
    );
  }
}

export default Form;
