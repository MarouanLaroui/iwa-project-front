import React from 'react';
import { Form, Formik } from 'formik';
import {
  Box, Button, Stack,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import InputField from '../../form-fields/input-field';
import loginSchema from './login-schema';
import LoginDTO from '../../../types/company/LoginDTO';

type Props = {
  onSubmit: (data: LoginDTO) => void
};

export default function LoginForm({ onSubmit } : Props) {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        email: '',
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
            spacing={3}
            width="100%"
          >
            <InputField
              label={t('email')}
              name="email"
              placeholder="abc@gmail.com"
              type="email"
              inputMode="email"
            />
            <InputField
              label={t('password')}
              name="password"
              placeholder="password"
              type="password"
            />
            <Button
              disabled={formik.isSubmitting || !formik.isValid}
              variant="contained"
              type="submit"
            >
              {t('login')}
            </Button>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
