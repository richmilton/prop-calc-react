// stateless component Input. Currently handles types text, number, checkbox
// passed through props
/* eslint react/prop-types: 0 */
import React from 'react';
import { currencyPlaceholder } from './formconfig';

const currRegEx = new RegExp(currencyPlaceholder, 'g');

const addCurrencySymbolToLabel = (label, currencyCode) => {
  const currSymbol = String.fromCharCode(currencyCode);
  return label.replace(currRegEx, currSymbol);
};

// stateless component Label
function Label({
  name, doLabelClass, dynamicLabel, label, type, currency,
}) {
  const labelWithCurrency = addCurrencySymbolToLabel(label, currency);

  return (
    <div className={type === 'checkbox' ? 'checkbox-label' : 'input-label'}>
      <label
        htmlFor={name}
        className={doLabelClass(name)}
      >
        {dynamicLabel(name, labelWithCurrency)}
      </label>
    </div>
  );
}

function Input({
  className, name, type, onInput,
  placeholder, label, defVal, onblur, doLabelClass, dynamicLabel, currency, required,
}) {
  const labelWithCurrency = addCurrencySymbolToLabel(label, currency);

  return (
    <li key={name}>
      <input
        className={className || 'form-control'}
        key={name}
        type={type}
        name={name}
        id={name}
        onChange={e => onInput(e)}
        autoComplete="off"
        placeholder={placeholder || labelWithCurrency || `${name} [${type}]`}
        value={defVal || ''}
        checked={defVal === 'yes'}
        onBlur={e => onblur(e)}
        required={required || false}
      />
      {Label({
        name, doLabelClass, dynamicLabel, label, type, currency,
      })}
    </li>
  );
}

// stateless component Select
function Select({
  className, name, type, onInput, label, defVal, onblur, options, doLabelClass, dynamicLabel,
}) {
  return (
    <li key={name}>
      <select
        value={defVal}
        className={className || 'form-control'}
        key={name}
        name={name}
        id={name}
        onChange={e => onInput(e)}
        onBlur={e => onblur(e)}
      >
        {options.map(
          opt => (
            <option
              key={opt.value}
              name={opt.name}
              value={opt.value}
            >
              {opt.name}
            </option>
          ),
        )}
      </select>
      {Label({
        name, doLabelClass, dynamicLabel, label, type,
      })}
    </li>
  );
}

const StatelessComponents = {
  Input,
  Select,
};

export default StatelessComponents;
