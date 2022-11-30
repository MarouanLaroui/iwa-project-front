import {
  CalendarMonth, CheckCircle, MoreHoriz, Person, WorkOutlineOutlined,
} from '@mui/icons-material';
import {
  Box, Button, Paper, Stack,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Work } from '../../types/work/Work';
import Worker from '../../types/worker/Worker';
import TypographyWithIcon from '../typography-with-icon';

type EmployeeCardProps = {
  worker: Worker
  work: Work
};

export default function EmployeeCard({ worker, work }: EmployeeCardProps) {
  const startingDateString = work.startingDate.toDateString();
  const endDateString = work.endDate.toDateString();
  const { endDate } = work;
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
        paddingX="40px"
        paddingY="35px"
        spacing={2}
      >
        <TypographyWithIcon text={`${worker.firstname} ${worker.lastname.toUpperCase()}`} icon={<Person />} />
        <TypographyWithIcon text={work.jobLabel} icon={<WorkOutlineOutlined />} />
        <TypographyWithIcon
          text={t('from-to', {
            startingDate: startingDateString.substring(3, startingDateString.length),
            endDate: endDateString.substring(3, endDateString.length),
          })}
          icon={<CalendarMonth />}
        />
        {today <= endDate && <TypographyWithIcon text={t('currently-working')} icon={<MoreHoriz />} />}
        {!work.isRatedByCompany
          ? <Button>{t('rate-employee')}</Button>
          : <TypographyWithIcon text={t('employee-already-rated')} icon={<CheckCircle />} />}
      </Stack>
    </Box>
  );
}
