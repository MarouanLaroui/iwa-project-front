/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

// improve any type to accept typo parameters
export default function TypographyWithIcon(props:any) {
  const { text, icon, ...textFieldProps } = props;
  return (
    <Stack direction="row" justifyContent="center" gap="5px">
      {icon}
      <Typography {...textFieldProps}>{text}</Typography>
    </Stack>
  );
}
