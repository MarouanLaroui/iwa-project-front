import {
  Avatar,
  Divider, Paper, Rating, Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FlashOffOutlinedIcon from '@mui/icons-material/FlashOffOutlined';
import { useFetchCompany } from '../../hooks/request/companyHooks';
import Feedback from '../../types/feedback/Feedback';

export default function FeedbackCardWorker(props:{
  feedback:Feedback,
}) {
  const { feedback } = props;
  const { t } = useTranslation();
  const [company, ,] = useFetchCompany(feedback.senderId);
  return (
    <Paper elevation={2} sx={{ borderRadius: '20px', paddingX: '2em' }}>
      <Stack direction="column" justifyContent="center" paddingY={4} width="100%" spacing={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="left"
            fontSize={{ xs: '15px', md: '25px' }}
          >
            {feedback.title}

          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating size="medium" name="half-rating-read" defaultValue={feedback.rate} precision={0.5} readOnly />
            <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="flex-end">
              <Typography>
                {`${feedback.rate} /`}

              </Typography>
              <Typography fontSize={15} fontWeight="bold">
                5
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Typography
          textAlign="left"
          fontSize={{ xs: '1Opx', md: '20px' }}
        >
          {`${t('work-involved')} : ${feedback.jobLabelRated}`}
        </Typography>

        <Stack paddingBottom={2}>
          <Typography
            sx={{ wordBreak: 'break-words', fontSize: { xs: '12px', md: '16px' } }}
            align="left"
          >
            {feedback.message}

          </Typography>
        </Stack>

        <Divider sx={{ width: '90%' }} />
        <Stack direction="row" alignItems="center" paddingTop={0.5} spacing={2}>
          {
            company?.pictureUrl && (
              <Box width="60px" height="60px">
                <img src={company?.pictureUrl} alt="logo" />
              </Box>
            )
          }

          {
            !company?.pictureUrl
            && (
            <Avatar sx={{ bgcolor: 'gray' }} variant="rounded">
              <FlashOffOutlinedIcon />
            </Avatar>
            )
          }

          <Typography fontSize={{ xs: '14px', md: '18px' }}>{company?.name || t('anonymous-company')}</Typography>
        </Stack>
      </Stack>
    </Paper>

  );
}
