/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function UploadField(props:{
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
  currentFile?: File,
  name:string,
  text:string
}) {
  const {
    text, setFieldValue, name, currentFile,
  } = props;
  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, event?.target.files?.item(0) ? event?.target.files?.item(0) : undefined);
  };
  return (
    <Box>
      {
        !currentFile && (
          <Button variant="contained" component="label" startIcon={<AddOutlinedIcon />}>
            {text}
            <input name={name} hidden accept="image/*" type="file" multiple={false} onChange={selectFile} />
          </Button>
        )
      }

      {
        currentFile && (
          <Stack direction="column" justifyContent="center">
            <Typography>
              Current file
              {' '}
              {currentFile.name}
            </Typography>
            <Button variant="contained" component="label" startIcon={<EditOutlinedIcon />}>
              Change file
              <input name={name} hidden accept="image/*" type="file" multiple={false} onChange={selectFile} />
            </Button>
          </Stack>

        )
      }
    </Box>

  );
}
