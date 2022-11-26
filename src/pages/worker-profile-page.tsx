import React, { useContext } from 'react';
import {
  Tabs, Tab, CircularProgress,
} from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import WorkerProfileForm from '../components/forms/worker/worker-profile-form';
import WorkerCriteria from '../components/worker-criteria';
import WorkerDTO from '../types/worker/WorkerDTO';
import { useFetchWorker, useUpdateWorker } from '../hooks/request/workerHooks';
import mockCriteria from '../database/mock/mockCriteria';
import AlertContext from '../context/alert-context';

export default function WorkerProfilePage() {
  const { t } = useTranslation();
  const params = useParams();
  const { setErrorMessage, setSuccessMessage } = useContext(AlertContext);

  const [value, setValue] = React.useState(0);

  const [worker, loading, error] = useFetchWorker(params.workerId!);

  if (error) {
    setErrorMessage(error.message);
  }

  // TODO: GET CRITERIA FROM REQUEST

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onUpdateWorkerSubmit = async (
    workerDTO: WorkerDTO,
  ) => {
    useUpdateWorker(workerDTO)
      .then(() => {
        setSuccessMessage(t('information-successfully-updated'));
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
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
              </Tabs>
            </Box>
            {value === 0 && <WorkerProfileForm worker={worker!} onSubmit={onUpdateWorkerSubmit} />}
            {value === 1 && <WorkerCriteria criteria={mockCriteria} />}
          </>
          )}
      {loading && <CircularProgress />}
    </>
  );
}
