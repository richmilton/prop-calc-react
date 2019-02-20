import React, { Component } from 'react';

//stateless component Input. Currently handles types text, number, checkbox
// passed through props
const Input = (props) => {

  return (
    <li key={props.name}>
      <input
        className={props.className || 'form-control'}
        key={props.name}
        type={props.type}
        name={props.name}
        id={props.name}
        onChange={(ev) => props.onInput(ev)}
        autoComplete={'off'}
        placeholder={props.placeholder || props.label || `${props.name} [${props.type}]`}
        defaultValue={props.defVal || ''}
        onBlur={(e)=>props.onblur(e)}
        //checked={props.type === 'checkbox' ? false : false}
      />
      {props.type !== 'submit' ? Label(props) : ''}
    </li>
  )
};

//stateless component Select
const Select = (props) => {
  return (
    <li key={props.name}>
      <select
        //defaultValue={props.defVal}
        className={props.className || 'form-control'}
        key={props.name}
        name={props.name}
        id={props.name}
        onChange={(ev) => props.onInput(ev)}
        onBlur={(e)=>props.onblur(e)}
        //placeholder={props.placeholder || props.label || props.name}
      >
        <option value="" disabled>{props.placeholder || props.label || props.name}</option>
        {props.options.map(
          opt =>
            <option
              key={opt.value}
              name={opt.name}
              value={opt.value}>{opt.name}
            </option>
        )}
      </select>
      {Label(props)}
    </li>
  )
};

//stateless component Label
const Label = (props) => {
  return (
    <div className={'inputLabel'} >
      <label
        htmlFor={props.name}
        className={props.doLabelClass(props.name)}>
        {props.dynamicLabel(props.name, props.label)}
      </label>
    </div>
  )
};

const FormColumn = (props) => {
  return (
    <ul>
      {props.render(props.fields)}
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

  doStyle (fname) {
    const fData = this.state.formData;
    return fData && fData[fname] ? {width:'60%'} : {width:'100%'};
  }

  renderFields = (fields) => {
    let formFields = [];
    fields.forEach((ob, i) => {
      ob.dynamicLabel = (n, l) => this.doLabel(n, l);
      ob.doStyle = n => this.doStyle(n);
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

  renderFieldCols = (cols) => {

    const arrLength = Math.ceil(this.props.fields.length / 2);
    let left = this.props.fields.slice(0);
    const right = left.splice(arrLength);
    console.log(left);
    console.log(right);
    console.log(arrLength, this.props.fields.length)

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

        {this.props.cols === '2' ? this.renderFieldCols() : this.renderFields(this.props.fields)}

    </form>
  }
}

export default Form;