import {
  Button, MenuItem,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Form } from 'react-router-dom';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { CompanyDTOFileUploadDTO } from '../../../../types/company/CompanyDTO';
import { Company, SectorType } from '../../../../types/company/Company';
import PreviewImageModal from '../../../preview-image-modal';
import companyUpdateSchema from './company-update-schema';
import InputField from '../../../form-fields/input-field';
import UploadField from '../../../form-fields/upload-field';
import SelectField from '../../../form-fields/select-field';

type Props = {
  company: Company
  onSubmit: (data: CompanyDTOFileUploadDTO) => void
};

export default function CompanyProfileForm({ company, onSubmit }: Props) {
  const { t } = useTranslation();
  const [cvPrevModalOpen, setCvPrevModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState(false);

  const initialValues: CompanyDTOFileUploadDTO = {
    name: company.name,
    email: company.email,
    employeesNumber: company.employeesNumber,
    description: company.description,
    password: '',
    sector: company.sector,
    pictureToUpload: undefined,
  };

  return (
    <>
      {/* Preview modal */}
      {
        cvPrevModalOpen
        && company.pictureUrl && (
          <PreviewImageModal
            cldImgURL={company.pictureUrl}
            isOpened={cvPrevModalOpen}
            setOpened={setCvPrevModal}
          />
        )
      }

      {/* form */}
      <Formik
        initialValues={initialValues}
        validationSchema={companyUpdateSchema}
        onSubmit={async (data: CompanyDTOFileUploadDTO, { setSubmitting }) => {
          setSubmitting(true);
          onSubmit(data);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <Box component={Form} width="100%">
            <Stack
              alignItems="center"
              justifyContent="center"
              direction="column"
              spacing="10px"
              gap="10px"
            >
              <Stack direction="row" spacing="30px" width="100%">

                <InputField
                  label={t('name')}
                  name="name"
                  type="text"
                  fullWidth
                  disabled={!editMode}
                />

                <SelectField
                  label={t('sector')}
                  name="sector"
                  disabled={!editMode}
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
                disabled={!editMode}
                fullWidth
              />

              <Stack direction="row" spacing="30px" width="100%">

                <InputField
                  label={t('number-of-employees')}
                  name="nbOfEmployees"
                  type="number"
                  disabled={!editMode}
                  fullWidth
                />
              </Stack>

              <InputField
                label="description"
                name="description"
                placeholder="Enter a message you would like the company to see"
                multiline
                disabled={!editMode}
                fullWidth
                rows={4}
              />
              <Stack width="100%" direction="row" justifyContent="flex-start">
                {
                  !editMode && company.pictureUrl && (
                    <Button variant="contained" onClick={() => setCvPrevModal(true)} startIcon={<CameraAltOutlinedIcon />}>Your CV</Button>
                  )
                }
                {editMode && (
                  <UploadField text="Upload new logo" name="pictureToUpload" currentFile={formik.values.pictureToUpload} setFieldValue={formik.setFieldValue} />
                )}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3} justifyContent="center" width="100%">
              {!editMode
                && (
                  <Button
                    variant="contained"
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    {t('edit')}
                  </Button>
                )}
              {editMode && (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEditMode(false);
                      formik.resetForm();
                    }}
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveOutlinedIcon />}
                    onClick={() => {
                      setEditMode(false);
                      formik.submitForm();
                    }}
                    disabled={formik.isSubmitting || !formik.isValid}
                    type="submit"
                  >
                    {t('save')}
                  </Button>
                </>
              )}

            </Stack>
          </Box>
        )}
      </Formik>
    </>

  );
}
