import React from 'react';
import { Dialog, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

export default function PreviewImageModal(props:{
  isOpened: boolean,
  setOpened: React.Dispatch<React.SetStateAction<boolean>>,
  cldImgURL:string
}) {
  const { cldImgURL, isOpened, setOpened } = props;
  return (
    <Dialog open={isOpened}>
      <Stack>
        <Stack width="100%" direction="row" justifyContent="flex-end" zIndex={2} height="25px">
          <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => setOpened(false)}>
            <HighlightOffOutlinedIcon color="error" />
          </IconButton>
        </Stack>
        <Stack width="100%" zIndex={1} marginTop="-25px">
          <img src={cldImgURL} alt="cv" />
        </Stack>

      </Stack>
    </Dialog>
  );
}
