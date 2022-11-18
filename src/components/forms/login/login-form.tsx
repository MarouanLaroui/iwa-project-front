import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import {
  Alert, Box, Button, Stack, Typography,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import saveTokenInLocalStorage from '../../../database/utils/local-storage';
import InputField from '../../InputField';

const mandarotyField: string = 'Ce champ est obligatoire.';

const formValidationSchema = yup.object({
  mail: yup.string().required(mandarotyField).email(),
  password: yup.string().required(mandarotyField).min(8),
});

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <Formik
      initialValues={{
        mail: '',
        password: '',
      }}
      validationSchema={formValidationSchema}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
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
            setSubmitting(false);
          });
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
            <Typography>
              {JSON.stringify(formik.values)}
            </Typography>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
