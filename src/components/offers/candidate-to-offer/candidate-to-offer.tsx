import {
  Button, Divider, LinearProgress, Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import { Company } from '../../../types/company/Company';
import { Offer } from '../../../types/offer/Offer';
import MessageStep from './steps/message-step';
import VerifyInfoStep from './steps/verify-info-step';

export default function CandidateToOffer(props:{
  offer: Offer,
  company: Company
}) {
  const [step, setStep] = useState(0);
  const { company, offer } = props;
  const onSubmitionSuccess = () => {};

  const goToPreviousStep = () => {
    setStep(() => step - 1);
  };

  const goToNextStep = () => {
    setStep(() => step + 1);
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      padding={3}
      alignItems="center"
    >
      <Typography variant="h5" width="100%" align="left">{`Postuler chez ${company.name}`}</Typography>

      <Divider sx={{ width: '100%' }} />
      <Stack width="100%" direction="row" alignItems="center" spacing={2}>
        <Box width="90%">
          <LinearProgress variant="determinate" value={step * 50} />
        </Box>
        <Typography>{`${step * 50} %`}</Typography>

      </Stack>

      {step === 0 && <VerifyInfoStep />}
      {step === 1
      && (
      <MessageStep
        offerId={{ offerId: offer.offerId }}
        companyName={{ name: company.name }}
        onSubmissionSuccess={onSubmitionSuccess}
      />
      )}

      <Divider sx={{ width: '100%' }} />
      <Stack width="100%" direction="row" justifyContent="flex-end" spacing={3}>
        {(step === 1 || step === 2) && <Button onClick={goToPreviousStep}>Précédent</Button>}
        {(step === 0 || step === 1) && <Button variant="contained" onClick={goToNextStep}>Suivant</Button>}
        {step === 2 && <Button variant="contained">Candidater</Button>}
      </Stack>

    </Stack>

  );
}
