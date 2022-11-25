import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { Company } from '../../../../types/company/Company';
import { Offer } from '../../../../types/offer/Offer';
import ApplicationForm from '../../../forms/application/application-form';

export default function MessageStep(props:{
  offerId:Pick<Offer, 'offerId'>,
  companyName: Pick<Company, 'name'>,
  onSubmissionSuccess: ()=>void
}) {
  const { offerId, companyName, onSubmissionSuccess } = props;
  return (
    <Stack direction="column" spacing={2} width="100%">
      <Typography fontSize={20} fontWeight="bold">{`Écrivez un petit mot pour ${companyName.name} `}</Typography>
      <ApplicationForm
        offerId={offerId}
        onSubmitionSuccess={onSubmissionSuccess}
      />
    </Stack>
  );
}
