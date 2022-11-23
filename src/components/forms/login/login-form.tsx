import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
  Alert, Box, Button, Stack, Typography,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import { InferType } from 'yup';
import saveTokenInLocalStorage from '../../../database/utils/local-storage';
import InputField from '../../form-fields/input-field';
import loginSchema from './login-schema';

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = (data: InferType<typeof loginSchema>) => {
    axios
      .post('auth/organizer/login', data)
      .then((response) => {
        saveTokenInLocalStorage(response.data.access_token);
        axios.defaults.headers.common = {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        };
        // do something
      })
      .catch((err: AxiosError) => {
        setErrorMsg(err.message);
      });
  };
  return (
    <Formik
      initialValues={{
        mail: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        onSubmit(data);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Box component={Form} width="100%">
          <Stack
            justifyContent="center"
            direction="column"
            spacing="10px"
            width="100%"
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

            <InputField
              label="mail"
              name="mail"
              placeholder="abc@gmail.com"
              type="email"
              inputMode="email"
            />
            <InputField
              label="password"
              name="password"
              placeholder="password"
              type="password"
            />
            <Typography variant="caption" color="text.secondary">
              Mot de passe oublié ? Cliquez ici !
            </Typography>
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
