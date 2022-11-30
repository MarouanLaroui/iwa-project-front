import {
  ApartmentOutlined,
  CalendarMonth, CheckCircle, MoreHoriz, WorkOutlineOutlined,
} from '@mui/icons-material';
import {
  Box, Button, Dialog, Paper, Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Employer from '../../types/work/Employer';
import RateCompanyForm from '../forms/feedback/rate-company-form';
import TypographyWithIcon from '../typography-with-icon';

type EmployerCardProps = {
  employerProp: Employer
};

export default function EmployerCard({ employerProp }: EmployerCardProps) {
  const { t } = useTranslation();

  const [isVisibleRatingModal, setIsVisibleRatingModal] = useState<boolean>(false);
  const [employer, setEmployer] = useState<Employer>(employerProp);

  const { company } = employer;
  const { endDate } = employer;
  const today = new Date();
  const startingDateString = employer.startingDate.toDateString();
  const endDateString = employer.endDate.toDateString();

  const handleDialogClose = () => {
    setIsVisibleRatingModal(false);
  };

  const handleRateButtonClick = () => {
    setIsVisibleRatingModal(true);
  };

  return (
    <>
      <Dialog onClose={handleDialogClose} open={isVisibleRatingModal} fullWidth>
        <RateCompanyForm
          employer={employer}
          setIsVisibleRatingModal={setIsVisibleRatingModal}
          setEmployer={setEmployer}
        />
      </Dialog>
      <Box
        component={Paper}
        elevation={2}
        width="100%"
        borderRadius="5px"
      >
        <Stack
          direction="column"
          alignItems="flex-start"
          padding="20px"
          spacing={2}
        >
          <TypographyWithIcon text={company.name} icon={<ApartmentOutlined />} />
          <TypographyWithIcon text={employer.jobLabel} icon={<WorkOutlineOutlined />} />
          <TypographyWithIcon
            text={t('from-to', {
              startingDate: startingDateString.substring(3, startingDateString.length),
              endDate: endDateString.substring(3, endDateString.length),
            })}
            icon={<CalendarMonth />}
          />
          {today <= endDate && <TypographyWithIcon text={t('currently-working-for-employer')} icon={<MoreHoriz />} />}
          {!employer.isRatedByEmployee
            ? <Button onClick={handleRateButtonClick}>{t('rate-employer')}</Button>
            : <TypographyWithIcon text={t('employer-already-rated')} icon={<CheckCircle />} />}
        </Stack>
      </Box>

    </>
  );
}
