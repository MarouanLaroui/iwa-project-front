import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
  Alert, Box, Button, MenuItem, Stack,
} from '@mui/material';
import { InferType } from 'yup';
import axios, { AxiosError } from 'axios';
import InputField from '../../input-field';
import jobOfferSchema from './job-offer-schema';
import SelectField from '../../selectField';

export default function JobOfferForm() {
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: InferType<typeof jobOfferSchema>) => {
    axios
      .post('auth/organizer/login', data)
      .then((response) => {
        console.log(response);
        // do something
      })
      .catch((err: AxiosError) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <Formik
      initialValues={{
        startingDate: new Date(),
        endingDate: new Date(),
        jobType: '',
        description: '',
        salary: 0,
        needDrivingLicence: false,
        hasCompanyCar: false,
      }}
      validationSchema={jobOfferSchema}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(data);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Box component={Form}>
          <Stack
            justifyContent="center"
            direction="column"
            spacing="10px"
            gap="10px"
            maxWidth="50rem"
            minWidth="300px"
          >
            {errorMsg && (
              <Alert
                severity="error"
                onClose={() => {
                  setErrorMsg('');
                }}
              >
                {errorMsg}
              </Alert>
            )}

            <Stack direction="row" spacing="30px">
              <SelectField
                label="job type"
                name="jobType"
                placeholder="pick a type"
              >
                <MenuItem value="CDD">CDD</MenuItem>
                <MenuItem value="CDI">CDI</MenuItem>
              </SelectField>

              <InputField
                label="starting date"
                name="startingDate"
                type="date"
                fullWidth
              />

              <InputField
                label="ending date"
                name="endingDate"
                type="date"
                fullWidth
              />
            </Stack>

            <InputField
              label="description"
              name="description"
              placeholder="Enter a description here"
              type="text"
              multiline
              rows={4}
            />

            <Stack direction="row" spacing="20px">
              <SelectField
                label="driving licence"
                name="needDrivingLicence"
              >
                <MenuItem value="false">mandatory</MenuItem>
                <MenuItem value="true">not mandatory</MenuItem>
              </SelectField>

              <InputField
                label="salary"
                name="salary"
                type="number"
                fullWidth
              />

            </Stack>

            <Button
              disabled={formik.isSubmitting || !formik.isValid}
              variant="contained"
              type="submit"
            >
              Se connecter
            </Button>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
