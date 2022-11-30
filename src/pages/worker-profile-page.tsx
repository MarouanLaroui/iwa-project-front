import React, { useContext } from 'react';
import {
  Tabs, Tab, CircularProgress,
} from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import WorkerProfileForm from '../components/forms/worker/worker-profile-form';
import { useFetchWorker, useUpdateWorker } from '../hooks/request/workerHooks';
import AlertContext from '../context/alert-context';
import { WorkerUpdateDTO } from '../types/worker/WorkerUpdateDTO';
import useAuth from '../hooks/context/useAuth';
import CriteriaPage from './criteria-page';
import MyFeedbacksWorkerPage from './my-feedbacks-worker-page';

export default function WorkerProfilePage() {
  const { t } = useTranslation();
  const { workerId } = useAuth();
  const { setError, setSuccessMessage } = useContext(AlertContext);

  const [value, setValue] = React.useState(0);

  const [worker, loading, error] = useFetchWorker(workerId!);

  if (error) {
    setError(error);
  }

  // TODO: GET CRITERIA FROM REQUEST

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onUpdateWorkerSubmit = async (
    workerUpdateDTO: WorkerUpdateDTO,
  ) => {
    useUpdateWorker(workerUpdateDTO)
      .then(() => {
        setSuccessMessage(t('information-successfully-updated'));
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <>
      {worker
          && (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '30px' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={t('personal-information')} />
                <Tab label={t('search-criterias')} />
                <Tab label={t('feedback-received')} />
              </Tabs>
            </Box>
            {value === 0 && <WorkerProfileForm worker={worker!} onSubmit={onUpdateWorkerSubmit} />}
            {value === 1 && <CriteriaPage />}
            {value === 2 && <MyFeedbacksWorkerPage />}
          </>
          )}
      {loading && <CircularProgress />}
    </>
  );
}
