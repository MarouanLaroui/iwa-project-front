import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(props:{
  label?:string,
  placeholder?: string,
  defaultValue?: string

}) {
  const { label, placeholder, defaultValue } = props;
  return (
    <TextField
      id="input-with-icon-textfield"
      label={label}
      defaultValue={defaultValue}
      placeholder={placeholder}
      fullWidth
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
