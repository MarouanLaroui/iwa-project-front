/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';

function InputField(props: TextFieldProps & FieldHookConfig<string>) {
  const {
    inputMode,
  } = props;
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={errorText.length > 0}
      inputMode={inputMode}
    />
  );
}

export default InputField;
