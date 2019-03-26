/* eslint react/prop-types: 0 */
/* eslint-env browser */
import React, { Component } from 'react';
import StatelessComponents from './StatelessFormComponents';
import { types } from './formconfig';

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
    this.doLabel = this.doLabel.bind(this);
    this.doLabelClass = this.doLabelClass.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.renderFieldCols = this.renderFieldCols.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { props } = this;
    props.calculate();
  }

  doLabel(fname, label) {
    const { formData } = this.props;
    return formData && formData[fname] ? label || fname : '';
  }

  doLabelClass(fname) {
    const { formData } = this.props;
    return formData && formData[fname] ? 'show' : 'hide';
  }

  handleChange({
    type,
    value,
    checked,
    name,
  }) {
    const { props } = this;
    let val;

    switch (type) {
      case types.NUMBER:
        val = Number.isNaN(value) ? 0 : (parseFloat(value) || 0);
        break;
      case types.CHECKBOX:
        val = checked ? 'yes' : 'no';
        break;
      default:
        val = value || '';
    }

    props.calculate(name, val);
  }

  handleSave(e) {
    e.preventDefault();
    const { props } = this;
    const { onsave } = props;
    onsave();
    e.target.blur();
  }

  renderFields(fields) {
    const formFields = [];
    const { currsymbol, formData } = this.props;
    fields.forEach((field) => {
      const ob = { ...field };
      ob.dynamicLabel = (n, l) => this.doLabel(n, l);
      ob.doLabelClass = n => this.doLabelClass(n);
      ob.onInput = e => this.handleChange(e.target);
      ob.onblur = e => this.handleChange(e.target);
      ob.currency = currsymbol;
      ob.defVal = formData[ob.name];
      if (ob.type === 'select') {
        formFields.push(Select(ob));
      } else {
        formFields.push(Input(ob));
      }
    });
    return formFields;
  }

  renderFieldCols() {
    const { fields } = this.props;
    const arrLength = Math.floor(fields.length / 2);
    const left = fields.slice(0);
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
    const {
      name,
      twocols,
      fields,
      showsave,
    } = this.props;
    const button = showsave ? (
      <ul className="left">
        <li>
          <button
            type="submit"
            className="btn-primary form-control"
            onClick={this.handleSave}
          >
            save this
          </button>
        </li>
      </ul>
    ) : '';

    return (
      <form
        name={name}
        id={name}
      >
        {twocols === 'yes' ? this.renderFieldCols() : this.renderFields(fields)}
        {button}
      </form>
    );
  }
}

export default Form;
