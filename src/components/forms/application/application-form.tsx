/* eslint-disable react/require-default-props */
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useAlert from '../../../hooks/context/useAlert';
import { createApplication } from '../../../hooks/request/applicationHooks';
import Application from '../../../types/application/Application';
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
  const { t } = useTranslation();
  const { offerId, isSubmitOutside, onSubmitionSuccess } = props;
  const { setSuccessMessage, setError } = useAlert();

  const onSubmit = async (formData: ApplicationDTO) => {
    createApplication(formData, offerId)
      .then((response) => {
        setSuccessMessage(t('application-sent-msg'));
        if (onSubmitionSuccess) {
          onSubmitionSuccess(response.data);
        }
      })
      .catch((err: AxiosError) => {
        setError(err);
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
