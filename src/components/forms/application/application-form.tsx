import { Alert, Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { createApplication } from '../../../hooks/request/applicationHooks';
import { Application } from '../../../types/application/Application';
import ApplicationDTO from '../../../types/application/ApplicationDTO';
import { Offer } from '../../../types/offer/Offer';
import InputField from '../../form-fields/input-field';
import applicationSchema from './application-schema';

export default function ApplicationForm(
  props:{
    offerId: Pick<Offer, 'offerId'>,
    onSubmitionSuccess: (createdApplication: Application) => void
  },
) {
  const { offerId, onSubmitionSuccess } = props;
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (formData: ApplicationDTO) => {
    createApplication(formData, offerId)
      .then((response) => {
        onSubmitionSuccess(response.data);
      })
      .catch((err: AxiosError) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <Formik
      initialValues={{
        message: '',
        password: '',
      }}
      validationSchema={applicationSchema}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(data);
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
