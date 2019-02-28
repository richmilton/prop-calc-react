//stateless component Input. Currently handles types text, number, checkbox
// passed through props
import React from "react";

const Input = ({className, name, type, onInput,
                 placeholder, label, defVal, onblur, doLabelClass, dynamicLabel, currency}) => {

  const currSymbol = String.fromCharCode(currency);
  const labelCmp = label.replace(/##CURR##/g, currSymbol);

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
        placeholder={placeholder || labelCmp || `${name} [${type}]`}
        defaultValue={defVal || ''}
        onBlur={(e)=>onblur(e)}
      />
      {Label({name, doLabelClass, dynamicLabel, label, type, currency})}
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
const Label = ({name, doLabelClass, dynamicLabel, label, type, currency}) => {

  const currSymbol = String.fromCharCode(currency);
  const labelCmp = label.replace(/##CURR##/g, currSymbol);

  return (
    <div className={type === 'checkbox' ? 'checkbox-label' : 'input-label'} >
      <label
        htmlFor={name}
        className={doLabelClass(name)}
      >
        {dynamicLabel(name, labelCmp)}
      </label>
    </div>
  )
};

const StatelessComponents = {
  Input,
  Select
};

export default StatelessComponents;