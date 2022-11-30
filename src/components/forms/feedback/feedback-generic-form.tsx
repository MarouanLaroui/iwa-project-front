import { Button, Rating } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router-dom';
import FeedbackFormData from '../../../types/feedback/FeedbackFormData';
import InputField from '../../form-fields/input-field';
import feedbackSchema from './feedback-schema';

type FeedbackGenericFormProps = {
  onSubmit: (feedbackFormData: FeedbackFormData) => void
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FeedbackGenericForm({ onSubmit }: FeedbackGenericFormProps) {
  const [rate, setRating] = useState<number>(4);
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        title: '',
        message: '',
        rate: 1,
      }}
      validateOnMount
      validationSchema={feedbackSchema}
      onSubmit={async (feedbackFormData, { setSubmitting }) => {
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
              value={rate}
              onChange={(event, newValue) => {
                const newStateValue = newValue === null ? rate : newValue;
                setRating(newStateValue);
                formik.setFieldValue('rate', newStateValue);
              }}
            />
            <Button
              disabled={formik.isSubmitting || !formik.isValid}
              variant="contained"
              type="submit"
            >
              {t('submit')}
            </Button>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
