import React, { Component } from 'react';
import StatelessComponents from './StatelessFormComponents';

const {Input, Select} = StatelessComponents;

const FormColumn = ({render, fields, className}) => {
  return (
    <ul className={className}>
      {render(fields)}
    </ul>
  )
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: props.fields,
    };
  }

  defValues = () => {
    let v = {};
    this.props.fields.map(ob => {
      v[ob.name] = ob.defVal;
      return false;
    });
    this.props.calculate(v);
    return {formData: v};
  };

  doLabel = (fname, label) => {
    const fData = this.state.formData;
    return fData && fData[fname] ? label || fname : '';
  };

  doLabelClass = (fname) => {
    const fData = this.state.formData;
    return fData && fData[fname] ? 'show' : 'hide';
  };

  renderFields = (fields) => {
    let formFields = [];
    fields.forEach((ob) => {
      ob.dynamicLabel = (n, l) => this.doLabel(n, l);
      //ob.doStyle = n => this.doStyle(n);
      ob.doLabelClass = n => this.doLabelClass(n);
      ob.onInput = e => this.handleChange(e.target);
      ob.onblur = e => this.handleChange(e.target);
      //console.log(this.state.currency);
      ob.currency = this.props['currsymbol'];
      if (ob.type === 'select') {
        formFields.push(Select(ob));
      }
      else {
        formFields.push(Input(ob));
      }
    });
    return formFields;
  };

  renderFieldCols = () => {

    const arrLength = Math.floor(this.props.fields.length / 2);
    let left = this.props.fields.slice(0);
    const right = left.splice(arrLength);

    return [
      <FormColumn
        key="1"
        fields={left}
        className='left'
        render={this.renderFields}
      />,
      <FormColumn
        key="2"
        fields={right}
        className='right'
        render={this.renderFields}
      />
      ]

  };

  handleChange = ({type, value, checked, name}) => {
    let val;
    let newFormData;
    switch(type) {
      case 'number':
        val = isNaN(value) ? 0 : (parseFloat(value) || 0);
        break;
      case 'checkbox':
        val = checked ? 'yes' : 'no';
        break;
      default:
        val = value || '';
    }

    newFormData = {...this.state.formData, [name]: val};

    this.setState({formData: newFormData}, () => {
      if (/^select-one$|^checkbox$|^number$/.test(type)) {
        this.props.calculate(this.state.formData);
      }
    });
  };

  componentDidMount() {
    this.setState(this.defValues());
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const projName = this.state.formData['projectName'];
    document.getElementById('doc-title').text = projName ? projName.replace(/ /g, '-') : 'Untitled';
  };

  render() {

    return <form
      name={this.props.name}
      id={this.props.name}
    >
      {this.props['twocols'] === 'yes' ? this.renderFieldCols() : this.renderFields(this.props.fields)}
    </form>
  }
}

export default Form;