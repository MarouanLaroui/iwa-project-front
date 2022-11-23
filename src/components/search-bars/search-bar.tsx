/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(props: TextFieldProps) {
  return (
    <TextField
      id="input-with-icon-textfield"
      {...props}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}

    />
  );
}

SearchBar.defaultProps = {
  label: '',
  placeholder: '',
  defaultValue: '',
};
