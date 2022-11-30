import {
  ApartmentOutlined,
  CalendarMonth, CheckCircle, MoreHoriz, WorkOutlineOutlined,
} from '@mui/icons-material';
import {
  Box, Button, Paper, Stack,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Employer from '../../types/work/Employer';
import TypographyWithIcon from '../typography-with-icon';

type EmployerCardProps = {
  employer: Employer
};

export default function EmployerCard({ employer }: EmployerCardProps) {
  const { company } = employer;
  const startingDateString = employer.startingDate.toDateString();
  const endDateString = employer.endDate.toDateString();
  const { endDate } = employer;
  const today = new Date();
  const { t } = useTranslation();
  return (
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
        {!employer.isRatedByCompany
          ? <Button>{t('rate-employer')}</Button>
          : <TypographyWithIcon text={t('employer-already-rated')} icon={<CheckCircle />} />}
      </Stack>
    </Box>
  );
}
