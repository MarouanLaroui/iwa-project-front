import {
  CalendarMonth, CheckCircle, MoreHoriz, Person, WorkOutlineOutlined,
} from '@mui/icons-material';
import {
  Box, Button, Paper, Stack,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Employee from '../../types/work/Employee';
import TypographyWithIcon from '../typography-with-icon';

type EmployeeCardProps = {
  employee: Employee
};

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const { worker } = employee;
  const startingDateString = employee.startingDate.toDateString();
  const endDateString = employee.endDate.toDateString();
  const { endDate } = employee;
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
        <TypographyWithIcon text={`${worker.firstname} ${worker.lastname.toUpperCase()}`} icon={<Person />} />
        <TypographyWithIcon text={employee.jobLabel} icon={<WorkOutlineOutlined />} />
        <TypographyWithIcon
          text={t('from-to', {
            startingDate: startingDateString.substring(3, startingDateString.length),
            endDate: endDateString.substring(3, endDateString.length),
          })}
          icon={<CalendarMonth />}
        />
        {today <= endDate && <TypographyWithIcon text={t('currently-working')} icon={<MoreHoriz />} />}
        {!employee.isRatedByCompany
          ? <Button>{t('rate-employee')}</Button>
          : <TypographyWithIcon text={t('employee-already-rated')} icon={<CheckCircle />} />}
      </Stack>
    </Box>
  );
}
