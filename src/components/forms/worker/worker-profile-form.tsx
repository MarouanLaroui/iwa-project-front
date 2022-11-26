import {
  Alert,
  Button, Grid, TextField,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Form } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { DefaultTFuncReturn } from 'i18next';
import Worker from '../../../types/worker/Worker';
import InputField from '../../form-fields/input-field';
import WorkerDTO from '../../../types/worker/WorkerDTO';
import workerSchema from './worker-schema';
import CheckboxField from '../../form-fields/checkbox-field';

type Props = {
  worker: Worker
  onSubmit: (data: WorkerDTO,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setSuccess: React.Dispatch<React.SetStateAction<DefaultTFuncReturn>>) => void
};

export default function WorkerProfileForm({ worker, onSubmit }: Props) {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('' as DefaultTFuncReturn);

  return (
    <Formik
      initialValues={{
        firstname: worker.firstname,
        lastname: worker.lastname,
        email: worker.email,
        birthDate: worker.birthDate,
        hasDrivingLicense: worker.hasDrivingLicense,
      }}
      validationSchema={workerSchema}
      onSubmit={async (data: WorkerDTO, { setSubmitting }) => {
        setSubmitting(true);
        onSubmit(data, setErrorMsg, setSuccessMsg);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Box component={Form} width="100%">
          {successMsg && (
          <Alert
            severity="success"
            onClose={() => {
              setSuccessMsg('');
            }}
          >
            {successMsg}
          </Alert>
          )}
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
          <Grid container spacing={3} marginY={1}>
            <Grid item xs={12} sm={6}>
              <InputField
                label={t('first-name')}
                name="firstname"
                type="text"
                fullWidth
                disabled={!editMode}
              />
              {' '}

            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                label={t('last-name')}
                name="lastname"
                type="text"
                fullWidth
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                label={t('email')}
                name="email"
                type="text"
                fullWidth
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                disabled={!editMode}
                label={t('birth-date')}
                value={formik.values.birthDate}
                onChange={(value) => { formik.setFieldValue('birthDate', value, true); }}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                renderInput={(props) => <TextField name="birthDate" fullWidth {...props} />}
              />
            </Grid>
            <Grid item container justifyContent="flex-start" xs={12}>
              <CheckboxField disabled={!editMode} name="hasDrivingLicense" label={t('driving-license')} />
            </Grid>
          </Grid>
          <Stack direction="row" spacing={3} justifyContent="center">
            {!editMode
             && (
             <Button
               variant="contained"
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
                  onClick={() => {
                    setEditMode(false);
                    formik.submitForm();
                  }}
                  disabled={formik.isSubmitting || !formik.isValid}
                  type="submit"
                >
                  {t('confirm')}
                </Button>
              </>
            )}

          </Stack>
        </Box>
      )}
    </Formik>
  );
}
