import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
  Alert, Box, Button, MenuItem, Stack, Typography,
} from '@mui/material';
// import { InferType } from 'yup';
// import axios, { AxiosError } from 'axios';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import { AxiosError } from 'axios';
import InputField from '../../form-fields/input-field';
import jobOfferSchema from './job-offer-schema';
import SelectField from '../../form-fields/select-field';
import CheckboxField from '../../form-fields/checkbox-field';
import { ContractType, JobType } from '../../../types/offer/Offer';
import { createOffer } from '../../../hooks/request/offerHooks';
import OfferDTO from '../../../types/offer/OfferDTO';

export default function JobOfferForm() {
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = (offerToCreate: OfferDTO) => {
    createOffer(offerToCreate)
      .then((response) => {
        console.log(response);
        // do something
      })
      .catch((err: AxiosError) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <Formik
      initialValues={{
        companyId: '',
        startingDate: new Date(),
        endDate: new Date(),
        jobType: JobType.FULL_TIME,
        contractType: ContractType.CDD,
        title: '',
        description: '',
        location: '',
        salary: 0,
        needDrivingLicense: false,
        hasCompanyCar: false,
      }}
      validationSchema={jobOfferSchema}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(data);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Box component={Form}>
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

            <Stack direction="row" spacing="30px">
              <SelectField
                label="job type"
                name="jobType"
                placeholder="pick a type"
              >
                <MenuItem value="CDD">CDD</MenuItem>
                <MenuItem value="CDI">CDI</MenuItem>
              </SelectField>

              <InputField
                label="starting date"
                name="startingDate"
                type="date"
                fullWidth
              />

              <InputField
                label="ending date"
                name="endingDate"
                type="date"
                fullWidth
              />

              <InputField
                label="salary"
                name="salary"
                type="number"
                fullWidth
              />
            </Stack>

            <InputField
              label="description"
              name="description"
              placeholder="Enter a description here"
              type="text"
              multiline
              rows={4}
            />
            <Stack direction="column" spacing="10px" width="100%">
              <Stack direction="row" alignItems="center">
                <DirectionsCarFilledOutlinedIcon />
                <Typography variant="caption">Veichule details</Typography>
              </Stack>
              <CheckboxField name="needDrivingLicense" label="Is driving licence needed" />
              <CheckboxField name="hasCompanyCar" label="Do you provide a veichule" />
            </Stack>

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
