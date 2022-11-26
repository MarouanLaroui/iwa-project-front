import React, { useState } from 'react';
import {
  Tabs, Tab, Alert, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { DefaultTFuncReturn } from 'i18next';
import { useParams } from 'react-router-dom';
import WorkerProfileForm from '../components/forms/worker/worker-profile-form';
import WorkerCriteria from '../components/worker-criteria';
import { Criteria } from '../types/criteria/Criteria';
import { ContractType, JobType } from '../types/offer/Offer';
import { SectorType } from '../types/company/Company';
import WorkerDTO from '../types/worker/WorkerDTO';
import { useFetchWorker, useUpdateWorker } from '../hooks/request/workerHooks';

export default function WorkerProfilePage() {
  const { t } = useTranslation();
  const params = useParams();

  const [value, setValue] = React.useState(0);
  const [localErrorMsg, setLocalErrorMsg] = useState('');

  const [worker, loading, error] = useFetchWorker(params.workerId!);

  if (error) {
    setLocalErrorMsg(error.message);
  }

  // TODO: GET CRITERIA FROM REQUEST
  const mockCriteria: Criteria = {
    criteriaId: 'abc-123',
    workerId: 'abc-123',
    contractType: ContractType.CDD,
    jobType: JobType.FULL_TIME,
    sector: SectorType.ARTS,
    salaryExpectation: 1200,
    startingDate: new Date('2022-12-10'),
    endDate: new Date('2023-01-10'),
    location: 'Montpellier',
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onUpdateWorkerSubmit = async (
    workerDTO: WorkerDTO,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
    setSuccessMsg: React.Dispatch<React.SetStateAction<DefaultTFuncReturn>>,
  ) => {
    useUpdateWorker(workerDTO)
      .then(() => {
        setSuccessMsg(t('information-successfully-updated'));
      })
      .catch((err) => {
        setErrorMsg(err.response.data);
      });
  };

  if (worker) {
    return (
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
    );
  }

  return (
    <>
      {loading && <Typography variant="h1">LOADING</Typography>}
      {localErrorMsg && (
      <Alert
        severity="error"
        onClose={() => {
          setLocalErrorMsg('');
        }}
      >
        {localErrorMsg}
      </Alert>
      )}
    </>
  );
}
