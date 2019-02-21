//stateless component Input. Currently handles types text, number, checkbox
// passed through props
import React from "react";

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

const StatelessComponents = {
  Input,
  Select
};

export default StatelessComponents;