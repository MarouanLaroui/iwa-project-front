/* eslint-disable react/require-default-props */
import { Alert, Button } from '@mui/material';
import { Stack } from '@mui/system';
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
    isSubmitOutside?: boolean,
    onSubmitionSuccess?: (createdApplication: Application) => void
  },
) {
  const { offerId, isSubmitOutside, onSubmitionSuccess } = props;
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (formData: ApplicationDTO) => {
    createApplication(formData, offerId)
      .then((response) => {
        if (onSubmitionSuccess) {
          onSubmitionSuccess(response.data);
        }
      })
      .catch((err: AxiosError) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      validationSchema={applicationSchema}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(data);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Form id="applicationForm">
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

            {!isSubmitOutside && (
            <Button
              disabled={formik.isSubmitting || !formik.isValid}
              variant="contained"
              type="submit"
            >
              Send
            </Button>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
