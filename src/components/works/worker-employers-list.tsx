import { CircularProgress, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFetchWorksByToken } from '../../hooks/request/worksHooks';
import richAxios from '../../database/axios/axios-client';
import useAlert from '../../hooks/context/useAlert';
import { Company } from '../../types/company/Company';
import Employer from '../../types/work/Employer';
import EmployerCard from './employer-card';

export default function WorkerEmployersList() {
  const { setError } = useAlert();
  const [works,, loading, error] = useFetchWorksByToken();
  const [employers, setEmployers] = useState<Employer[]>([]);

  useEffect(() => works.forEach((work) => {
    const { companyId } = work;
    richAxios
      .get<Company>(`/companies/${companyId}`)
      .then((res) => {
        const company = res.data;
        const newEmployer = {
          ...work,
          company,
        };
        newEmployer.startingDate = new Date(newEmployer.startingDate);
        newEmployer.endDate = new Date(newEmployer.endDate);
        setEmployers((currEmployers) => [...currEmployers, newEmployer]);
      })
      .catch((err) => {
        setError(err);
      });
  }), [works]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    setError(error);
  }

  return (
    <Stack spacing={3}>
      { employers.map((employer) => <EmployerCard key={employer.workId} employerProp={employer} />)}
    </Stack>
  );
}
