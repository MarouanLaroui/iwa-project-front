import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useAlert from '../../../hooks/context/useAlert';
import { useCreate } from '../../../hooks/request/feedbackHooks';
import FeedbackFormData from '../../../types/feedback/FeedbackFormData';
import Employee from '../../../types/work/Employee';
import FeedbackGenericForm from './feedback-generic-form';

type RateWorkerFormProps = {
  employee: Employee
  setIsVisibleRatingModal: React.Dispatch<React.SetStateAction<boolean>>
  setEmployee: React.Dispatch<React.SetStateAction<Employee>>
};

export default function RateWorkerForm({
  employee,
  setIsVisibleRatingModal,
  setEmployee,
}: RateWorkerFormProps) {
  const { setError, setSuccessMessage } = useAlert();
  const { t } = useTranslation();
  const onSubmit = ({ title, message, rate }: FeedbackFormData) => {
    useCreate({
      receiverId: employee.worker.id,
      title,
      message,
      jobLabelRated: employee.jobLabel,
      rate,
    }, employee.workId)
      .then(() => {
        setSuccessMessage(t('thanks-feedback'));
        setIsVisibleRatingModal(false);
        const newEmployee = employee;
        newEmployee.isRatedByCompany = true;
        setEmployee(newEmployee);
      })
      .catch((err) => setError(err));
  };
  const { firstname, lastname } = employee.worker;
  return (
    <Box padding={3}>
      <FeedbackGenericForm onSubmit={onSubmit} receiver={`${firstname} ${lastname.toUpperCase()}`} />
    </Box>
  );
}
