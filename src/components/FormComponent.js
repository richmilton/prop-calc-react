import React, { Component } from 'react';

//stateless component Input. Currently handles types text, number, checkbox
// passed through props
const Input = ({className, name, type, onInput,
                 placeholder, label, defVal, onblur, doLabelClass, dynamicLabel}) => {

  return (
    <li key={name}>
      <input
        className={className || 'form-control'}
        key={name}
        type={type}
        name={name}
        id={name}
        onChange={(ev) => onInput(ev)}
        autoComplete={'off'}
        placeholder={placeholder || label || `${name} [${type}]`}
        defaultValue={defVal || ''}
        onBlur={(e)=>onblur(e)}
        //checked={type === 'checkbox' ? false : false}
      />
      {type !== 'submit' ? Label({name, doLabelClass, dynamicLabel, label, type}) : ''}
    </li>
  )
};

//stateless component Select
const Select = ({className, name, type, onInput,
                  placeholder, label, defVal, onblur, options, doLabelClass, dynamicLabel}) => {
  return (
    <li key={name}>
      <select
        //defaultValue={defVal}
        className={className || 'form-control'}
        key={name}
        name={name}
        id={name}
        onChange={(ev) => onInput(ev)}
        onBlur={(e)=>onblur(e)}
        //placeholder={placeholder || label || name}
      >
        <option value="" disabled>{placeholder || label || name}</option>
        {options.map(
          opt =>
            <option
              key={opt.value}
              name={opt.name}
              value={opt.value}>{opt.name}
            </option>
        )}
      </select>
      {Label({name, doLabelClass, dynamicLabel, label, type})}
    </li>
  )
};

//stateless component Label
const Label = ({name, doLabelClass, dynamicLabel, label, type}) => {
  return (
    <div className={type === 'checkbox' ? 'checkbox-label' : 'input-label'} >
      <label
        htmlFor={name}
        className={doLabelClass(name)}>
        {dynamicLabel(name, label)}
      </label>
    </div>
  )
};

const FormColumn = ({render, fields}) => {
  return (
    <ul>
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

    const arrLength = Math.ceil(this.props.fields.length / 2);
    let left = this.props.fields.slice(0);
    const right = left.splice(arrLength);

    return [
      <FormColumn
        key="1"
        fields={left}
        render={this.renderFields}
      />,
      <FormColumn
        key="2"
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