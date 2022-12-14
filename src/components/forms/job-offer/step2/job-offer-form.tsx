import React from 'react';
import { Form, Formik } from 'formik';
import {
  Stack,
} from '@mui/material';
import { AxiosError } from 'axios';
import { createOffer } from '../../../../hooks/request/offerHooks';
import { Offer } from '../../../../types/offer/Offer';
import OfferDTO from '../../../../types/offer/OfferDTO';
import InputField from '../../../form-fields/input-field';
import jobOfferSchema from './job-offer-schema';
import useAlert from '../../../../hooks/context/useAlert';

export default function JobOfferFormLastStep(props:{
  initialOfferDTO: OfferDTO,
  onSubmitionSuccess: (createdOffer: Offer)=>void
}) {
  const { initialOfferDTO, onSubmitionSuccess } = props;
  const { setError } = useAlert();

  const onSubmit = (offerToCreate: OfferDTO) => {
    createOffer(offerToCreate)
      .then((response) => {
        onSubmitionSuccess(response.data);
      })
      .catch((err: AxiosError) => {
        setError(err);
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
