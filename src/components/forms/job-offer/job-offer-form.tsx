import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
  Alert, Box, Button, MenuItem, Stack, Typography,
} from '@mui/material';
// import { InferType } from 'yup';
// import axios, { AxiosError } from 'axios';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import InputField from '../../form-fields/input-field';
import jobOfferSchema from './job-offer-schema';
import SelectField from '../../form-fields/select-field';
import CheckboxField from '../../form-fields/checkbox-field';
import { JobType } from '../../../types/offer/Offer';

export default function JobOfferForm() {
  const [errorMsg, setErrorMsg] = useState('');

  // const onSubmit = async (data: InferType<typeof jobOfferSchema>) => {
  //   axios
  //     .post('auth/organizer/login', data)
  //     .then((response) => {
  //       console.log(response);
  //       // do something
  //     })
  //     .catch((err: AxiosError) => {
  //       setErrorMsg(err.message);
  //     });
  // };

  return (
    <Formik
      initialValues={{
        startingDate: new Date(),
        endingDate: new Date(),
        jobType: JobType.FULL_TIME,
        description: '',
        salary: 0,
        needDrivingLicence: false,
        hasCompanyCar: false,
      }}
      validationSchema={jobOfferSchema}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        // await onSubmit(und);
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

              <InputField
                label="salary"
                name="salary"
                type="number"
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
            <Stack direction="column" spacing="10px" width="100%">
              <Stack direction="row" alignItems="center">
                <DirectionsCarFilledOutlinedIcon />
                <Typography variant="caption">Veichule details</Typography>
              </Stack>
              <CheckboxField name="needDrivingLicence" label="Is driving licence needed" />
              <CheckboxField name="hasCompanyCar" label="Do you provide a veichule" />
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
