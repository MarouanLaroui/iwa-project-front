import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
  Alert, Stack,
} from '@mui/material';
import { AxiosError } from 'axios';
import { createOffer } from '../../../../hooks/request/offerHooks';
import { Offer } from '../../../../types/offer/Offer';
import OfferDTO from '../../../../types/offer/OfferDTO';
import InputField from '../../../form-fields/input-field';
import jobOfferSchema from './job-offer-schema';

export default function JobOfferFormLastStep(props:{
  initialOfferDTO: OfferDTO,
  onSubmitionSuccess: (createdOffer: Offer)=>void
}) {
  const { initialOfferDTO, onSubmitionSuccess } = props;
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = (offerToCreate: OfferDTO) => {
    createOffer(offerToCreate)
      .then((response) => {
        onSubmitionSuccess(response.data);
      })
      .catch((err: AxiosError) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <Formik
      initialValues={initialOfferDTO}
      validationSchema={jobOfferSchema}
      onSubmit={async (offerToCreate: OfferDTO, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(offerToCreate);
        setSubmitting(false);
      }}
    >
      <Form id="create-offer-form">
        <Stack
          justifyContent="center"
          direction="column"
          spacing="10px"
          gap="10px"
          maxWidth="50rem"
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

          <InputField
            label="title"
            name="title"
            placeholder="Enter a title here"
            type="text"
            fullWidth
          />

          <InputField
            label="description"
            name="description"
            placeholder="Enter a description here"
            type="text"
            multiline
            rows={4}
          />
        </Stack>
      </Form>
    </Formik>
  );
}
