import React from 'react';
import { currencyPlaceholder } from './formConstants';

const PropTypes = require('prop-types');

const basePropTypes = {
  name: PropTypes.string.isRequired,
  doLabelClass: PropTypes.func.isRequired,
  dynamicLabel: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  currency: PropTypes.number.isRequired,
};
const formControlPropTypes = {
  className: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
  defVal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
};
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

Label.propTypes = {
  ...basePropTypes,
};

function Input({
  className, name, type, onInput,
  placeholder, label, defVal,
  doLabelClass, dynamicLabel, currency, required, disabled,
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
        required={required || false}
        disabled={disabled}
      />
      {Label({
        name, doLabelClass, dynamicLabel, label, type, currency,
      })}
    </li>
  );
}

Input.propTypes = {
  ...basePropTypes,
  ...formControlPropTypes,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};

// stateless component Select
function Select({
  className, name, type, onInput, label, defVal,
  options, doLabelClass, dynamicLabel, disabled,
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
        disabled={disabled}
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

Select.propTypes = {
  ...basePropTypes,
  ...formControlPropTypes,
};

const StatelessComponents = {
  Input,
  Select,
};

export default StatelessComponents;
