import React, { Component, Fragment } from 'react';
import NumberFormat from 'react-number-format';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from "@material-ui/core/TextField";

function NumberFormatCustom(props) {
  const {
    inputRef,
    onChange,
    ...other
  } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={(_, e) => onChange(e)}
      thousandSeparator=" "
      decimalSeparator=","
      prefix=""
      decimalScale={2}
      fixedDecimalScale
      autoComplete="false"
      allowNegative={false}
    />
  );
}


class FloatInput extends Component {

  render() {
    const {
      label,
      disabled,
      onChange,
      onBlur,
      endAdornment,
      value,
    } = this.props;

    return (
      <Fragment>
          <TextField
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            label={label}
            fullWidth
            disabled={disabled}
            InputProps={{
              value,
              inputComponent: NumberFormatCustom,
              autoComplete: 'false',
              endAdornment: endAdornment && (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ),
            }}
          />
      </Fragment>
    );
  }
}

FloatInput.defaultProps = {
  label: '',
  validate: [],
  placeholder: '',
  disabled: false,
  isReduxField: true,
  endAdornment: '',
  value: '',
  onChange: () => {},
  onBlur: () => {},
};

export default FloatInput;
