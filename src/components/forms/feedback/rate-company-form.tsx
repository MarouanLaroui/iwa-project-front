import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useAlert from '../../../hooks/context/useAlert';
import { useCreate } from '../../../hooks/request/feedbackHooks';
import FeedbackFormData from '../../../types/feedback/FeedbackFormData';
import Employer from '../../../types/work/Employer';
import FeedbackGenericForm from './feedback-generic-form';

type RateCompanyFormProps = {
  employer: Employer
  setIsVisibleRatingModal: React.Dispatch<React.SetStateAction<boolean>>
  setEmployer: React.Dispatch<React.SetStateAction<Employer>>
};

export default function RateCompanyForm({
  employer,
  setIsVisibleRatingModal,
  setEmployer,
}:RateCompanyFormProps) {
  const { setError, setSuccessMessage } = useAlert();
  const { t } = useTranslation();
  const onSubmit = ({ title, message, rate }: FeedbackFormData) => {
    useCreate({
      receiverId: employer.company.id,
      title,
      message,
      jobLabelRated: employer.jobLabel,
      rate,
    }, employer.workId)
      .then(() => {
        setSuccessMessage(t('thanks-feedback'));
        setIsVisibleRatingModal(false);
        const newEmployer = employer;
        newEmployer.isRatedByEmployee = true;
        setEmployer(newEmployer);
      })
      .catch((err) => setError(err));
  };
  const { name } = employer.company;
  return (
    <Box padding={3}>
      <FeedbackGenericForm onSubmit={onSubmit} receiver={name} />
    </Box>
  );
}
