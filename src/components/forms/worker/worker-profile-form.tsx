import {
  Button, Grid, TextField, Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BadgeIcon from '@mui/icons-material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import EmailIcon from '@mui/icons-material/Email';
import { Formik } from 'formik';
import { Form } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import TypographyWithIcon from '../../typography-with-icon';
import Worker from '../../../types/worker/Worker';
import loginSchema from '../login/login-schema';
import InputField from '../../form-fields/input-field';

type Props = {
  worker: Worker
};

export default function WorkerProfileForm({ worker }: Props) {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);

  const dateString = worker.birthDate.toDateString();

  return (
    <Stack alignItems="flex-start" spacing="10px">
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
              <Grid item xs={12} md={6}>
                <InputField
                  label={t('first-name')}
                  name="firstName"
                  type="text"
                  fullWidth
                  disabled={!editMode}
                />
                {' '}

              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  label={t('last-name')}
                  name="lastName"
                  type="text"
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  label={t('email')}
                  name="email"
                  type="text"
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
              <Grid item container xs={12} md={6} justifyItems="flex-start">
                <DatePicker
                  disabled={!editMode}
                  label={t('birth-date')}
                  value={formik.values.birthDate}
                  onChange={(value) => { formik.setFieldValue('birthDate', value, true); }}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  renderInput={(props) => <TextField {...props}>Test</TextField>}
                />
              </Grid>
            </Grid>
            <Stack direction="row" spacing="30px" width="100%" />
            <Stack direction="row" spacing="30px" width="100%">
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
      <Typography variant="h6">
        {worker.firstName}
        {' '}
        {worker.lastName}
      </Typography>
      <TypographyWithIcon text={worker.email} icon={<EmailIcon />} />
      <TypographyWithIcon text={`${t('born-on')}${dateString.substring(3, dateString.length)}`} icon={<CakeIcon />} />
      {worker.hasDrivingLicense
      && <TypographyWithIcon text={t('has-driving-license')} icon={<BadgeIcon />} />}

    </Stack>
  );
}
