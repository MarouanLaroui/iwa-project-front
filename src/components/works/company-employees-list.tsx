import { CircularProgress, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFetchWorksByToken } from '../../hooks/request/worksHooks';
import EmployeeCard from './employee-card';
import richAxios from '../../database/axios/axios-client';
import useAlert from '../../hooks/context/useAlert';
import Employee from '../../types/work/Employee';
import Worker from '../../types/worker/Worker';

export default function CompanyEmployeesList() {
  const { setError } = useAlert();
  const [works,, loading, error] = useFetchWorksByToken();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => works.forEach((work) => {
    const { workerId } = work;
    richAxios
      .get<Worker>(`/workers/${workerId}`)
      .then((res) => {
        const worker = res.data;
        worker.birthDate = new Date(worker.birthDate);
        const newEmployee = {
          ...work,
          worker,
        };
        newEmployee.startingDate = new Date(newEmployee.startingDate);
        newEmployee.endDate = new Date(newEmployee.endDate);
        setEmployees((currEmployees) => [...currEmployees, newEmployee]);
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
      { employees.map((employee) => <EmployeeCard key={employee.workId} employeeProp={employee} />)}
    </Stack>
  );
}
