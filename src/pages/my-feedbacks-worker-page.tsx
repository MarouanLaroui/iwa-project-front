import { Box, CircularProgress, Stack } from '@mui/material';
import React, {} from 'react';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/context/useAuth';
import FeedbackCardWorker from '../components/feedback/feedback-card';
import { useGetFeedbacksByReceiverId } from '../hooks/request/feedbackHooks';

export default function MyFeedbacksWorkerPage() {
  const { t } = useTranslation();
  const { workerId } = useAuth();

  const [feedbacks, ,feedbacksLoading, feedbacksError] = useGetFeedbacksByReceiverId(workerId!);

  if (feedbacksError || feedbacksLoading) {
    return <CircularProgress />;
  }

  if (feedbacks.length === 0) {
    return (<div>{t('no-feedbacks')}</div>);
  }

  return (
    <Stack
      padding={3}
      spacing={3}
      alignItems="center"
    >
      { feedbacks.map((feedback) => (
        <Box sx={{ width: '80%' }}>
          <FeedbackCardWorker key={feedback.feedbackId} feedback={feedback} />
        </Box>
      ))}
    </Stack>

  );
}
