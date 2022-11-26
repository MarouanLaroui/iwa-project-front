/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
  Alert, Box, Button, Divider, Stack, Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { useTranslation } from 'react-i18next';
import InputField from '../../../form-fields/input-field';
import workerSchema from './worker-schema';
import CheckboxField from '../../../form-fields/checkbox-field';
import Worker from '../../../../types/worker/Worker';
import { registerWorker } from '../../../../hooks/request/workerHooks';
import WorkerAuthenticated from '../../../../types/worker/WorkerAuthenticated';
import WorkerCreateDTO from '../../../../types/worker/WorkerCreateDTO';

export default function WorkerSignupForm(props:{
  onSubmissionSuccess? : (worker: WorkerAuthenticated)=> void,
  readonly: boolean,
  worker?: Worker
}) {
  const { readonly, worker, onSubmissionSuccess } = props;
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (workerToCreate: WorkerCreateDTO) => {
    registerWorker(workerToCreate)
      .then((response) => {
        if (onSubmissionSuccess) onSubmissionSuccess(response.data);
      })
      .catch((err: AxiosError) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <Formik
      initialValues={{
        firstname: worker ? worker.firstname : '',
        lastname: worker ? worker.lastname : '',
        email: worker ? worker.email : '',
        password: '',
        birthDate: worker ? worker.birthDate : new Date(),
        hasDrivingLicense: worker ? worker.hasDrivingLicense : false,
      }}
      validationSchema={workerSchema}
      onSubmit={async (data: WorkerCreateDTO, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(data);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Box component={Form}>
          <Stack
            alignItems="flex-start"
            direction="column"
            spacing="10px"
            gap="10px"
            maxWidth="40rem"
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

            <InputField
              label="email"
              name="email"
              placeholder="abc@gmail.com"
              type="email"
              inputMode="email"
              fullWidth
              disabled={readonly}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing="30px" width="100%">

              <InputField
                label={t('password')}
                name="password"
                placeholder="X82@.c"
                type="password"
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
                <Button disabled={readonly} variant="contained" component="label" sx={{ width: 'fit-content' }}>
                  {t('upload-your-cv')}
                  <input hidden accept="image/*" type="file" />
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
