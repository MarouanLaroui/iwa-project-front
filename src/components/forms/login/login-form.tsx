import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
  Alert, Box, Button, Stack, Typography,
} from '@mui/material';
import InputField from '../../form-fields/input-field';
import loginSchema from './login-schema';
import LoginDTO from '../../../types/company/LoginDTO';

type Props = {
  onSubmit: (data: LoginDTO, setError: React.Dispatch<React.SetStateAction<string>>) => void
};

export default function LoginForm({ onSubmit } : Props) {
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        onSubmit(data, setErrorMsg);
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
              label="email"
              name="email"
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
