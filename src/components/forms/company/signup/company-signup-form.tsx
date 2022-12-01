import React from 'react';
import { Form, Formik } from 'formik';
import {
  Box, Button, MenuItem, Stack,
} from '@mui/material';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import InputField from '../../../form-fields/input-field';
import companySchema from './company-schema';
import SelectField from '../../../form-fields/select-field';
import { SectorType } from '../../../../types/company/Company';
import { signUpCompany } from '../../../../hooks/request/companyHooks';
import CompanyAuthenticated from '../../../../types/company/CompanyAuthenticated';
import useAlert from '../../../../hooks/context/useAlert';
import { CompanyDTOFileUploadDTO } from '../../../../types/company/CompanyDTO';
import UploadField from '../../../form-fields/upload-field';

export default function CompanySignupForm(
  props:{
    onSubmitionSuccess: (createdCompany:CompanyAuthenticated)=>void
  },
) {
  const { onSubmitionSuccess } = props;
  const { t } = useTranslation();
  const { setError } = useAlert();

  const onSubmit = async (companyToCreate: CompanyDTOFileUploadDTO) => {
    signUpCompany(companyToCreate)
      .then((response) => {
        onSubmitionSuccess(response.data);
      })
      .catch((err: AxiosError) => {
        setError(err);
      });
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        employeesNumber: 1,
        slogan: '',
        description: '',
        sector: SectorType.AGRICULTURE_PECHE,
        picturToUpload: undefined,
      }}
      validationSchema={companySchema}
      onSubmit={async (data: CompanyDTOFileUploadDTO, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(data);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Box component={Form}>
          <Stack
            alignItems="center"
            direction="column"
            spacing="10px"
            gap="10px"
            maxWidth="40rem"
            minWidth="300px"
          >
            <Stack direction="row" spacing="30px" width="100%">

              <InputField
                label={t('name')}
                name="name"
                type="text"
                fullWidth
              />

              <SelectField
                label={t('sector')}
                name="sector"
              >
                {
                  Object.keys(SectorType).map(
                    (sectorType) => (
                      <MenuItem value={sectorType} key={sectorType}>
                        {sectorType}
                      </MenuItem>
                    ),
                  )
                }
              </SelectField>

            </Stack>

            <InputField
              label="email"
              name="email"
              placeholder="abc@gmail.com"
              type="email"
              inputMode="email"
              fullWidth
            />

            <Stack direction="row" spacing="30px" width="100%">
              <InputField
                label={t('password')}
                name="password"
                placeholder="Ac6Qj@v"
                type="password"
                fullWidth
              />

              <InputField
                label={t('number-of-employees')}
                name="nbOfEmployees"
                type="number"
                fullWidth
              />
            </Stack>
            <InputField
              label="Slogan"
              name="slogan"
              type="text"
              fullWidth
            />
            <InputField
              label="description"
              name="description"
              placeholder="Explain how amazing your company is!"
              multiline
              fullWidth
              rows={4}
            />
            <Stack width="100%" direction="row" justifyContent="flex-start">
              <UploadField text="Upload company logo" currentFile={formik.values.pictureToUpload} setFieldValue={formik.setFieldValue} name="pictureToUpload" />
            </Stack>

            <Button
              disabled={formik.isSubmitting || !formik.isValid}
              variant="contained"
              type="submit"
            >
              {t('sign-up')}
            </Button>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
