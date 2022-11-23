import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
  Alert, Box, Button, Divider, Stack, Typography,
} from '@mui/material';
import { InferType } from 'yup';
import axios, { AxiosError } from 'axios';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import InputField from '../../form-fields/input-field';
import workerSchema from './worker-schema';
import CheckboxField from '../../form-fields/checkbox-field';

export default function WorkerSignupForm() {
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: InferType<typeof workerSchema>) => {
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
        firstName: '',
        lastName: '',
        email: '',
        jobType: '',
        birthDate: new Date(),
        salary: 0,
        hasCar: false,
        hasDrivingLicence: false,
      }}
      validationSchema={workerSchema}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(data);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Box component={Form}>
          <Stack
            alignItems="flex-start"
            direction="column"
            spacing="10px"
            gap="10px"
            maxWidth="40rem"
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

            <Typography variant="caption">Your personal infos</Typography>
            <Stack direction="row" spacing="30px" width="100%">

              <InputField
                label="firstname"
                name="firstName"
                type="text"
                fullWidth
              />

              <InputField
                label="lastname"
                name="lastName"
                type="text"
                fullWidth
              />

            </Stack>

            <Stack direction="row" spacing="30px" width="100%">

              <InputField
                label="email"
                name="email"
                placeholder="abc@gmail.com"
                type="email"
                inputMode="email"
                fullWidth
              />

              <InputField
                label="birth Date"
                name="birthDate"
                type="date"
                fullWidth
              />

            </Stack>

            <Divider variant="middle" style={{ width: '100%' }} />

            <Typography variant="caption">Your job infos</Typography>

            <Stack direction="row" spacing="20px" width="100%">
              <Stack direction="column" width="50%">
                <Stack direction="row" alignItems="center">
                  <DirectionsCarFilledOutlinedIcon />
                  <Typography variant="caption">Veichule details</Typography>
                </Stack>
                <CheckboxField name="hasDrivingLicence" label="I have my driving licence" />
                <CheckboxField name="hasCar" label="I have a car" />
              </Stack>

              <Stack direction="column" width="50%" spacing="10px">
                <Stack direction="row" alignItems="center">
                  <AttachFileOutlinedIcon />
                  <Typography variant="caption">Attached files</Typography>
                </Stack>
                <Button variant="contained" component="label" sx={{ width: 'fit-content' }}>
                  Upload your CV
                  <input hidden accept="image/*" type="file" />
                </Button>
              </Stack>

            </Stack>

            <Stack direction="row" justifyContent="center" width="100%" paddingTop="2rem">
              <Button
                disabled={formik.isSubmitting || !formik.isValid}
                variant="contained"
                type="submit"
              >
                Se connecter
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
