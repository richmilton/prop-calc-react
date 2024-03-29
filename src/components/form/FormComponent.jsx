/* eslint-env browser */
import React, { Component } from 'react';
import StatelessComponents from '../common/StatelessFormComponents';
import { formTypes } from '../common/appConstants';

const PropTypes = require('prop-types');

const { Input, Select } = StatelessComponents;

function FormColumn({ render, fields, className }) {
  return (
    <ul className={className}>
      {render(fields)}
    </ul>
  );
}

FormColumn.propTypes = {
  render: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string.isRequired,
};

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
    const { calculate } = this.props;
    calculate();
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

    console.log(value, name);

    switch (type) {
      case formTypes.NUMBER:
        val = Number.isNaN(value) ? 0 : (Number.parseFloat(value) || 0);
        break;
      case formTypes.CHECKBOX:
        val = checked ? 'yes' : 'no';
        break;
      default:
        val = value || '';
    }

    props.calculate(name, val);
  }

  handleSave(e) {
    e.preventDefault();
    const { onsave } = this.props;
    onsave();
    e.target.blur();
  }

  renderFields(fields) {
    const formFields = [];
    const { currsymbol, formData } = this.props;
    const disable = ({ regex, whenField }) => regex.test(formData[whenField]);

    fields.forEach((field) => {
      const ob = { ...field };
      ob.dynamicLabel = (n, l) => this.doLabel(n, l);
      ob.doLabelClass = n => this.doLabelClass(n);
      ob.onInput = e => this.handleChange(e.target);
      ob.onblur = e => this.handleChange(e.target);
      ob.currency = currsymbol;
      ob.defVal = formData[ob.name];
      ob.disabled = ob.disabled && ob.disabled.some(disable);
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

Form.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  formData: PropTypes.shape({}).isRequired,
  twocols: PropTypes.string.isRequired,
  calculate: PropTypes.func.isRequired,
  currsymbol: PropTypes.number.isRequired,
  onsave: PropTypes.func.isRequired,
  showsave: PropTypes.bool.isRequired,
};

export default Form;
