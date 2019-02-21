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

  defValues () {
    let v = {};
    this.props.fields.map(ob => {
      if (!/^submit/.test(ob.type)) {
        v[ob.name] = ob.defVal;
      }
      return false;
    });
    return {formData: v};
  }

  doLabel (fname, label) {
    const fData = this.state.formData;
    return fData && fData[fname] ? label || fname : '';
  }

  doLabelClass (fname) {
    const fData = this.state.formData;
    return fData && fData[fname] ? 'show' : 'hide';
  }

  renderFields = (fields) => {
    let formFields = [];
    fields.forEach((ob) => {
      ob.dynamicLabel = (n, l) => this.doLabel(n, l);
      //ob.doStyle = n => this.doStyle(n);
      ob.doLabelClass = n => this.doLabelClass(n);
      ob.onInput = e => this.handleChange(e.target, e);
      ob.onblur = e => this.handleSubmit(e);
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
        className={right}
        fields={right}
        render={this.renderFields}
      />
      ]

  };

  handleChange = (t) => {
    let newValObject = {}, val;
    let newFormData;
    switch(t.type) {
      case 'number':
        val = isNaN(t.value) ? 0 : (parseFloat(t.value) || 0);
        break;
      case 'checkbox':
        val = t.checked ? 'yes' : 'no';
        break;
      default:
        val = t.value || '';
    }
    if (!/^submit/.test(t.type)) {
      newValObject[t.name] = val;
      newFormData = Object.assign(this.state.formData, newValObject);
      this.setState({formData: newFormData});
      if (/^select-one$|^checkbox$/.test(t.type)) {
        this.props.onsubmit(this.state.formData);
      }
    }

  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.onsubmit(this.state.formData);
  }

  componentDidMount() {
    this.setState(this.defValues());
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps);
    console.log(prevState);
    console.log(this.state);
  };

  render() {

    return <form
      name={this.props.name}
      id={this.props.name}
      onSubmit={(e)=>this.handleSubmit(e)}
    >

        {this.props['twocols'] === 'yes' ? this.renderFieldCols() : this.renderFields(this.props.fields)}

    </form>
  }
}

export default Form;