/* eslint-disable react/require-default-props */
import React from 'react';
import { Form, Formik } from 'formik';
import {
  Box, Button, Divider, Stack, Typography,
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
import { WorkerCreateDTOFileUploadDTO } from '../../../../types/worker/WorkerCreateDTO';
import useAlert from '../../../../hooks/context/useAlert';
import UploadField from '../../../form-fields/upload-field';

export default function WorkerSignupForm(props:{
  onSubmissionSuccess? : (worker: WorkerAuthenticated)=> void,
  readonly: boolean,
  worker?: Worker
}) {
  // const [cv, setCV] = useState<File | null>(null);
  const { readonly, worker, onSubmissionSuccess } = props;
  const { t } = useTranslation();
  const { setError } = useAlert();

  const initialValues = {
    firstname: worker ? worker.firstname : '',
    lastname: worker ? worker.lastname : '',
    email: worker ? worker.email : '',
    password: '',
    birthDate: worker ? worker.birthDate : new Date(),
    hasDrivingLicense: worker ? worker.hasDrivingLicense : false,
    cvToUpload: undefined,
  };

  const onSubmit = async (workerToCreate: WorkerCreateDTOFileUploadDTO) => {
    registerWorker(workerToCreate)
      .then((response) => {
        if (onSubmissionSuccess) onSubmissionSuccess(response.data);
      })
      .catch((err: AxiosError) => {
        setError(err);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={workerSchema}
      onSubmit={async (data: WorkerCreateDTOFileUploadDTO, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(data);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Box component={Form}>
          <div>{JSON.stringify(formik)}</div>
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
                <UploadField text="Upload new CV" currentFile={formik.values.cvToUpload} setFieldValue={formik.setFieldValue} name="cvToUpload" />
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
