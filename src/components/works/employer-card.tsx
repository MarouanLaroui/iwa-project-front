import {
  CalendarMonth, CheckCircle, MoreHoriz, WorkOutlineOutlined,
} from '@mui/icons-material';
import {
  Box, Button, Dialog, Paper, Stack, Typography,
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
        paddingX={4}
        paddingY={1}
      >
        <Stack
          direction="column"
          alignItems="flex-start"
          padding="20px"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: '70px', height: '70px' }}>
              <img src={company.pictureUrl} alt="logo" style={{ width: '100%', height: '100%' }} />
            </Box>
            <Typography fontSize="30px">{company.name}</Typography>
          </Stack>
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
