import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
  Alert, Box, Button, MenuItem, Stack,
} from '@mui/material';
import { InferType } from 'yup';
import axios, { AxiosError } from 'axios';
import InputField from '../../input-field';
import companySchema from './company-schema';
import SelectField from '../../select-field';

export default function CompanyForm() {
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: InferType<typeof companySchema>) => {
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
        name: '',
        email: '',
        nbOfEmployees: 1,
        description: '',
        sector: '',
      }}
      validationSchema={companySchema}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(data);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Box component={Form}>
          <Stack
            alignItems="center"
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
            <Stack direction="row" spacing="30px" width="100%">

              <InputField
                label="name"
                name="name"
                type="text"
                fullWidth
              />

              <InputField
                label="email"
                name="email"
                placeholder="abc@gmail.com"
                type="email"
                inputMode="email"
                fullWidth
              />

            </Stack>

            <Stack direction="row" spacing="30px" width="100%">

              <SelectField
                label="sector"
                name="sector"
              >
                <MenuItem value="Aviation">Aviation</MenuItem>
                <MenuItem value="Marouan le boss">Mystère</MenuItem>
              </SelectField>

              <InputField
                label="number of Employees"
                name="nbOfEmployees"
                type="number"
                fullWidth
              />

            </Stack>

            <InputField
              label="description"
              name="description"
              placeholder="Enter a message you would like the company to see"
              multiline
              fullWidth
              rows={4}
            />
            <Button
              disabled={formik.isSubmitting || !formik.isValid}
              variant="contained"
              type="submit"
            >
              Sign up
            </Button>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
