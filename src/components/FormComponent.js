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
      {Label(props)}
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

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: props.fields,
    };
  }

  defValues () {
    let v = {};
    this.props.fields.forEach(ob => {

      v[ob.name] = ob.defVal;

    });
    return v;
  }

  doLabel (fname, label) {
    return this.state[fname] ? label || fname : '';
  }

  doLabelClass (fname) {
    return (this.state[fname]) ? 'show' : 'hide';
  }

  doStyle (fname) {
    return this.state[fname] ? {width:'60%'} : {width:'100%'};
  }

  renderFields = (fields) => {
    let formFields = [];
    fields.forEach(ob => {
      ob.dynamicLabel = (n, l) => this.doLabel(n, l);
      ob.doStyle = n => this.doStyle(n);
      ob.doLabelClass = n => this.doLabelClass(n);
      ob.onInput = e => this.handleChange(e.target, e);
      ob.onblur = e => this.handleSubmit(e);
      if (ob.type === 'select') {
        formFields.push(Select(ob))
      }
      else {
        formFields.push(Input(ob));
      }
    });
    return formFields;
  };

  handleChange = (t) => {
    let newValObject = {}, val;
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
    newValObject[t.name] = val;
    this.setState(newValObject);
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.onsubmit(this.state);
  }

  componentDidMount() {
    this.setState(this.defValues());
  }

  componentDidUpdate () {
    console.log(this.state);
  }

  render() {

    return <form
      name={this.props.name}
      id={this.props.name}
      onSubmit={(e)=>this.handleSubmit(e)}
    >
      {this.renderFields(this.state.fields)}
    </form>
  }
}

export default Form;