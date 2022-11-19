import { Alert, Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import axios from '../../../database/axios/axios-client';
import InputField from '../../input-field';
import applicationSchema from './application-schema';

export default function ApplicationForm(
  props:{
    offerId: number,
  },
) {
  const { offerId } = props;
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <Formik
      initialValues={{
        mail: '',
        password: '',
      }}
      validationSchema={applicationSchema}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        axios
          .post('auth/organizer/login', data)
          .then((response) => {
            console.log(response);
            console.log(offerId);
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
              label="message"
              name="message"
              placeholder="Enter a message you would like the company to see"
              multiline
              rows={4}
            />

            <Button
              disabled={formik.isSubmitting || !formik.isValid}
              variant="contained"
              type="submit"
            >
              Send
            </Button>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
