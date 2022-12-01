/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
  Box, Button, Divider, Stack, Typography,
} from '@mui/material';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { useTranslation } from 'react-i18next';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import InputField from '../../../form-fields/input-field';
import CheckboxField from '../../../form-fields/checkbox-field';
import Worker from '../../../../types/worker/Worker';
import PreviewImageModal from '../../../preview-image-modal';

export default function RecapInfoForm(props: {
  worker: Worker
}) {
  const readonly = true;
  const { worker } = props;
  const { t } = useTranslation();
  const [cvPreviewOpen, setCvPreviewOpen] = useState<boolean>(false);

  const initialValues = {
    firstname: worker.firstname,
    lastname: worker.lastname,
    email: worker.email,
    birthDate: worker.birthDate,
    hasDrivingLicense: worker.hasDrivingLicense,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async () => {
      }}
    >
      {(formik) => (
        <Box component={Form}>
          {
            worker.cvLink && (
              <PreviewImageModal
                isOpened={cvPreviewOpen}
                setOpened={setCvPreviewOpen}
                cldImgURL={worker.cvLink}
              />
            )
          }

          <Stack
            alignItems="flex-start"
            direction="column"
            spacing="10px"
            gap="10px"
            maxWidth="40rem"
            minWidth="300px"
          >

            <Typography variant="caption">{t('your-personal-infos')}</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing="30px" width="100%">

              <InputField
                label="firstname"
                name="firstname"
                type="text"
                fullWidth
                disabled={readonly}
              />

              <InputField
                label="lastname"
                name="lastname"
                type="text"
                fullWidth
                disabled={readonly}
              />

            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing="30px" width="100%">
              <InputField
                label="email"
                name="email"
                placeholder="abc@gmail.com"
                type="email"
                inputMode="email"
                fullWidth
                disabled={readonly}
              />

              <InputField
                label={t('birth-date')}
                name="birthDate"
                type="date"
                fullWidth
                disabled={readonly}
              />

            </Stack>

            <Divider variant="middle" style={{ width: '100%' }} />

            <Typography variant="caption">{t('your-job-info')}</Typography>

            <Stack direction="row" spacing="20px" width="100%">
              <Stack direction="column" width="50%">
                <Stack direction="row" alignItems="center">
                  <DirectionsCarFilledOutlinedIcon />
                  <Typography variant="caption">{t('vehicle-details')}</Typography>
                </Stack>
                <CheckboxField name="hasDrivingLicense" label="I have my driving licence" disabled={readonly} />
              </Stack>

              <Stack direction="column" width="50%" spacing="10px">
                <Stack direction="row" alignItems="center">
                  <AttachFileOutlinedIcon />
                  <Typography variant="caption">{t('attached-files')}</Typography>
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setCvPreviewOpen(true)}
                  startIcon={<ArticleOutlinedIcon />}
                  sx={{ width: '195px' }}
                >
                  {t('your-cv')}

                </Button>
              </Stack>

            </Stack>

            {
              !readonly
              && (
                <Stack direction="row" justifyContent="center" width="100%" paddingTop="2rem">
                  <Button
                    disabled={formik.isSubmitting || !formik.isValid}
                    variant="contained"
                    type="submit"
                  >
                    {t('sign-up')}
                  </Button>
                </Stack>
              )
            }

          </Stack>
        </Box>
      )}
    </Formik>
  );
}
