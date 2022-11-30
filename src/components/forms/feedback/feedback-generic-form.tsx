import { InsertEmoticon } from '@mui/icons-material';
import { Button, Rating } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router-dom';
import FeedbackFormData from '../../../types/feedback/FeedbackFormData';
import InputField from '../../form-fields/input-field';
import TypographyWithIcon from '../../typography-with-icon';
import feedbackSchema from './feedback-schema';

type FeedbackGenericFormProps = {
  onSubmit: (feedbackFormData: FeedbackFormData) => void
  receiver: string
};

export default function FeedbackGenericForm({ onSubmit, receiver }: FeedbackGenericFormProps) {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        title: '',
        message: '',
        rate: 1,
      }}
      validationSchema={feedbackSchema}
      onSubmit={(feedbackFormData, { setSubmitting }) => {
        setSubmitting(true);
        onSubmit(feedbackFormData);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Box component={Form} width="100%">
          <Stack
            justifyContent="center"
            direction="column"
            spacing={3}
            width="100%"
          >
            <TypographyWithIcon text={t('currently-giving-feedback', { receiver })} icon={<InsertEmoticon />} />
            <InputField
              label={t('feedback-title')}
              name="title"
              placeholder="What a great job!"
              type="text"
            />
            <InputField
              label={t('feedback-details')}
              name="message"
              placeholder="..."
              type="text"
              multiline
              rows={5}
            />
            <Rating
              name="rate"
              size="large"
              value={formik.values.rate}
              onChange={(event, newValue) => {
                const newStateValue = newValue === null ? formik.values.rate : newValue;
                formik.setFieldValue('rate', newStateValue);
              }}
            />
            <Button
              disabled={formik.isSubmitting || !formik.isValid}
              variant="contained"
              type="submit"
              onClick={formik.submitForm}
            >
              {t('submit')}
            </Button>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
