import React from 'react';
import { Stack } from '@mui/system';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import {
  Dialog, Divider, Typography,
} from '@mui/material';
import { Offer } from '../../../types/offer/Offer';
import MultiStepJobOfferForm from '../../forms/job-offer/multi-step-job-offer-form';

export default function CreateOfferDialog(props:{
  isCreateOfferModalOpened: boolean,
  setCreateOfferModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  onSubmitionSuccess: (createdOffer: Offer) => void
}) {
  const { isCreateOfferModalOpened, setCreateOfferModalOpened, onSubmitionSuccess } = props;
  return (
    <Dialog
      open={isCreateOfferModalOpened}
      onClose={() => setCreateOfferModalOpened(false)}
      fullWidth
    >
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        marginBottom={3}
      >
        <Stack direction="row" width="100%" justifyContent="flex-end">
          <HighlightOffOutlinedIcon
            onClick={() => setCreateOfferModalOpened(false)}
            sx={{
              cursor: 'pointer',
            }}
          />
        </Stack>
        <Stack maxWidth="95%" spacing={2}>

          <Typography variant="h5" width="100%" align="left">{'Nouvelle offre d\'emploi'}</Typography>

          <Divider sx={{ width: '100%' }} />

          <MultiStepJobOfferForm onOfferCreation={onSubmitionSuccess} />

        </Stack>

      </Stack>
    </Dialog>

  );
}
