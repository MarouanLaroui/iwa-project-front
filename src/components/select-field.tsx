/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  FormControl, InputLabel, Select, SelectProps,
} from '@mui/material';
import { FieldHookConfig, useField } from 'formik';

function SelectField(props: SelectProps & FieldHookConfig<string> & {
  children: JSX.Element[],
  label:string
}) {
  const {
    inputMode,
    children,
    label,
  } = props;
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  const customSelectField = (
    <Select
      {...props}
      {...field}
      // helperText={errorText}
      error={errorText.length > 0}
      inputMode={inputMode}
    >
      {children}
    </Select>
  );

  if (label) {
    return (
      <FormControl fullWidth>
        <InputLabel id={label}>{label}</InputLabel>
        {customSelectField}
      </FormControl>
    );
  }
  return customSelectField;
}

export default SelectField;
