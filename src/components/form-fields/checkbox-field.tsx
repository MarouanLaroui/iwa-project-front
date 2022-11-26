/* eslint-disable react/jsx-props-no-spreading */
import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';
import React from 'react';

export default function CheckboxField(props: CheckboxProps & FieldHookConfig<string> & {
  label:string
}) {
  const { label } = props;
  const [field] = useField(props);
  // const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <FormControlLabel
      control={(
        <Checkbox
          {...props}
          {...field}
        />
    )}
      label={label}
    />
  );
}
