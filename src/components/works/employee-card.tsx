import {
  CalendarMonth, CheckCircle, MoreHoriz, Person, WorkOutlineOutlined,
} from '@mui/icons-material';
import {
  Box, Button, Dialog, Paper, Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Employee from '../../types/work/Employee';
import RateWorkerForm from '../forms/feedback/rate-worker-form';
import TypographyWithIcon from '../typography-with-icon';

type EmployeeCardProps = {
  employeeProp: Employee
};

export default function EmployeeCard({ employeeProp }: EmployeeCardProps) {
  const { t } = useTranslation();

  const [isVisibleRatingModal, setIsVisibleRatingModal] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee>(employeeProp);

  const { worker } = employee;
  const { endDate } = employee;
  const today = new Date();
  const startingDateString = employee.startingDate.toDateString();
  const endDateString = employee.endDate.toDateString();

  const handleDialogClose = () => {
    setIsVisibleRatingModal(false);
  };

  const handleRateButtonClick = () => {
    setIsVisibleRatingModal(true);
  };

  return (
    <>
      <Dialog onClose={handleDialogClose} open={isVisibleRatingModal} fullWidth>
        <RateWorkerForm
          employee={employee}
          setIsVisibleRatingModal={setIsVisibleRatingModal}
          setEmployee={setEmployee}
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
          <TypographyWithIcon text={`${worker.firstname} ${worker.lastname.toUpperCase()}`} icon={<Person />} />
          <TypographyWithIcon text={employee.jobLabel} icon={<WorkOutlineOutlined />} />
          <TypographyWithIcon
            text={t('from-to', {
              startingDate: startingDateString.substring(3, startingDateString.length),
              endDate: endDateString.substring(3, endDateString.length),
            })}
            icon={<CalendarMonth />}
          />
          {today <= endDate && <TypographyWithIcon text={t('employee-currently-working')} icon={<MoreHoriz />} />}
          {!employee.isRatedByCompany
            ? <Button onClick={handleRateButtonClick}>{t('rate-employee')}</Button>
            : <TypographyWithIcon text={t('employee-already-rated')} icon={<CheckCircle />} />}
        </Stack>
      </Box>

    </>
  );
}
