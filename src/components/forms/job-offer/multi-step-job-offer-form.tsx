import { Button, LinearProgress, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import { ContractType, JobType, Offer } from '../../../types/offer/Offer';
import OfferDTO from '../../../types/offer/OfferDTO';
import JobOfferFormFirstStep from './step1/job-offer-form';
import JobOfferFormLastStep from './step2/job-offer-form';

export default function MultiStepJobOfferForm(props:{
  onOfferCreation: (offerCreated:Offer)=>void,
}) {
  const [step, setStep] = useState<number>(1);
  const { onOfferCreation } = props;
  const [offerToCreate, setOfferToCreate] = useState<OfferDTO>(
    {
      title: '',
      description: '',
      location: '',
      salary: 0,
      startingDate: new Date(),
      endDate: new Date(),
      jobType: JobType.FULL_TIME,
      contractType: ContractType.CDD,
      needDrivingLicence: false,
    },
  );

  const goToPreviousStep = () => {
    setStep(() => step - 1);
  };

  const goToNextStep = () => {
    setStep(() => step + 1);
  };

  return (
    <Stack width="100%" spacing={2}>
      <Stack width="100%" direction="row" alignItems="center" spacing={2}>
        <Box width="90%">
          <LinearProgress variant="determinate" value={step * 50} />
        </Box>
        <Typography>{`${step * 50}%`}</Typography>

      </Stack>
      {
        step === 1 && (
        <JobOfferFormFirstStep
          initialOfferDTO={offerToCreate}
          setOfferDTO={setOfferToCreate}
          goToNextStep={goToNextStep}
        />

        )
    }

      {
      step === 2 && (
      <JobOfferFormLastStep
        initialOfferDTO={offerToCreate}
        onSubmitionSuccess={onOfferCreation}
      />
      )
    }

      <Stack width="100%" direction="row" justifyContent="flex-end" spacing={3} paddingTop={3}>
        {(step === 2) && <Button onClick={goToPreviousStep}>Précédent</Button>}
        {(step === 1) && <Button type="submit" form="create-offer-form" variant="contained">Suivant</Button>}
        {step === 2 && <Button variant="contained" type="submit" form="create-offer-form">Candidater</Button>}
      </Stack>
    </Stack>
  );
}
