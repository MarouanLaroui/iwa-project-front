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
};

export default function RateWorkerForm({ employee, setIsVisibleRatingModal }: RateWorkerFormProps) {
  const { setError, setSuccessMessage } = useAlert();
  const { t } = useTranslation();
  const onSubmit = ({ title, message, rate }: FeedbackFormData) => {
    useCreate({
      receiverId: employee.worker.id,
      title,
      message,
      jobLabelRated: employee.jobLabel,
      rate,
    })
      .then(() => {
        setSuccessMessage(t('thanks-feedback'));
        setIsVisibleRatingModal(false);
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
