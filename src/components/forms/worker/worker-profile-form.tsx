import {
  Button, Checkbox, FormControlLabel, Grid, TextField,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Form } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import Worker from '../../../types/worker/Worker';
import loginSchema from '../login/login-schema';
import InputField from '../../form-fields/input-field';

type Props = {
  worker: Worker
};

export default function WorkerProfileForm({ worker }: Props) {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);

  return (
    <Formik
      initialValues={{
        firstName: worker.firstName,
        lastName: worker.lastName,
        email: worker.email,
        birthDate: worker.birthDate,
        hasDrivingLicense: worker.hasDrivingLicense,
      }}
      validationSchema={loginSchema}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        // TODO: call submit function
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Box component={Form} width="100%">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputField
                label={t('first-name')}
                name="firstName"
                type="text"
                fullWidth
                disabled={!editMode}
              />
              {' '}

            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                label={t('last-name')}
                name="lastName"
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
                renderInput={(props) => <TextField fullWidth {...props} />}
              />
            </Grid>
            <Grid item container justifyContent="flex-start" xs={12}>
              <FormControlLabel
                control={
                  <Checkbox disabled={!editMode} name="hasDrivingLicense" onChange={formik.handleChange} checked={formik.values.hasDrivingLicense} />
                  }
                label={t('driving-license')}
              />
            </Grid>
          </Grid>
          <Stack direction="row" spacing={3} justifyContent="center">
            {editMode && (
            <Button
              variant="outlined"
              onClick={() => {
                setEditMode(false);
                formik.resetForm();
              }}
            >
              {t('cancel')}
            </Button>
            )}
            <Button
              variant="contained"
              onClick={() => {
                setEditMode(!editMode);
              }}
              disabled={editMode && (!formik.isValid || formik.isSubmitting)}
            >
              { editMode ? t('confirm') : t('edit')}
            </Button>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
