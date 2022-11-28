import React from 'react';
import { Form, Formik } from 'formik';
import {
  MenuItem, Stack,
} from '@mui/material';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { JobType, ContractType } from '../../../../types/offer/Offer';
import OfferDTO from '../../../../types/offer/OfferDTO';
import CheckboxField from '../../../form-fields/checkbox-field';
import InputField from '../../../form-fields/input-field';
import SelectField from '../../../form-fields/select-field';
import jobOfferSchema from './job-offer-schema';
import TypographyWithIcon from '../../../typography-with-icon';

export default function JobOfferFormFirstStep(props:{
  initialOfferDTO: OfferDTO,
  setOfferDTO: React.Dispatch<React.SetStateAction<OfferDTO>>,
  goToNextStep: ()=>void
}) {
  const { initialOfferDTO, setOfferDTO, goToNextStep } = props;

  const onSubmit = (offerToCreate: OfferDTO) => {
    setOfferDTO({ ...offerToCreate });
    goToNextStep();
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
      <Form id="create-offer-form" style={{ width: '100%' }}>
        <Stack
          justifyContent="center"
          direction="column"
          spacing={3}
          gap="10px"
          maxWidth="50rem"
          minWidth="240px"
        >
          {/* Contract info section */}
          <Stack direction="column" spacing="30px">
            <Stack direction="row" justifyContent="flex-start">
              <TypographyWithIcon text="Contract informations" icon={<InfoOutlinedIcon />} />
            </Stack>

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
          {/* Job info section */}
          <Stack direction="column" spacing="30px">
            <Stack direction="row" justifyContent="flex-start">
              <TypographyWithIcon text="Job informations" icon={<FeedOutlinedIcon />} />
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing="30px">
              <InputField
                label="salary"
                name="salary"
                type="number"
                fullWidth
              />

              <InputField
                label="location"
                name="location"
                placeholder="Enter a location here"
                type="text"
                fullWidth
              />
            </Stack>
          </Stack>

          {/* Veicule section */}
          <Stack direction="column" spacing="30px">
            <Stack direction="column" spacing="10px" width="100%">
              <Stack direction="row" justifyContent="flex-start">
                <TypographyWithIcon text="Veicule details" icon={<DirectionsCarFilledOutlinedIcon />} />
              </Stack>
              <CheckboxField name="needDrivingLicence" label="Is driving licence needed" />
            </Stack>
          </Stack>
        </Stack>
      </Form>
    </Formik>
  );
}
