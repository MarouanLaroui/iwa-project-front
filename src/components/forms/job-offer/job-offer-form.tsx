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
import { ContractType, JobType, Offer } from '../../../types/offer/Offer';
import { createOffer } from '../../../hooks/request/offerHooks';
import OfferDTO from '../../../types/offer/OfferDTO';

export default function JobOfferForm(props:{
  onSubmitionSuccess: (createdOffer: Offer)=>void
}) {
  const { onSubmitionSuccess } = props;
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
      initialValues={{
        title: '',
        description: '',
        location: '',
        salary: 0,
        startingDate: new Date(),
        endDate: new Date(),
        jobType: JobType.FULL_TIME,
        contractType: ContractType.CDD,
        needDrivingLicence: false,
      }}
      validationSchema={jobOfferSchema}
      onSubmit={async (offerToCreate: OfferDTO, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(offerToCreate);
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

            <Stack direction={{ xs: 'column', md: 'row' }} spacing="30px">
              <Stack direction="row" spacing="30px" width="100%">
                <SelectField
                  label="job type"
                  name="jobType"
                  placeholder="pick a type"
                  fullWidth
                >
                  {
                    Object.keys(JobType).map(
                      (jobType) => (
                        <MenuItem value={jobType} key={jobType}>
                          {jobType}
                        </MenuItem>
                      ),
                    )
                  }
                </SelectField>

                <SelectField
                  label="contract type"
                  name="contractType"
                  placeholder="pick a type"
                  fullWidth
                >
                  {
                    Object.keys(ContractType).map(
                      (contractType) => (
                        <MenuItem value={contractType} key={contractType}>
                          {contractType}
                        </MenuItem>
                      ),
                    )
                  }
                </SelectField>

              </Stack>
              <Stack direction="row" spacing="30px" width="100%">
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
              </Stack>

            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing="30px">
              <InputField
                label="title"
                name="title"
                placeholder="Enter a title here"
                type="text"
                fullWidth
              />

              <InputField
                label="salary"
                name="salary"
                type="number"

              />

              <InputField
                label="location"
                name="location"
                placeholder="Enter a location here"
                type="text"
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
              <CheckboxField name="needDrivingLicence" label="Is driving licence needed" />
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
