/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

export default function UploadField(props:{
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  file: File | null
}) {
  const { file, setFile } = props;

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event?.target.files?.item(0) ? event?.target.files?.item(0) : null;
    setFile(selectedFile);
  };
  return (
    <Box>
      {
        !file && (
        <Button variant="contained" component="label">
          Upload your CV
          <input hidden accept="image/*" type="file" multiple={false} onChange={selectFile} />
        </Button>
        )
      }

      {
        file && (
          <Stack direction="column" justifyContent="center">
            <Typography>
              Current file
              {' '}
              {file.name}
            </Typography>
            <Button variant="contained" component="label">
              Change file
              <input hidden accept="image/*" type="file" multiple={false} onChange={selectFile} />
            </Button>
          </Stack>

        )
      }
    </Box>

  );
}
