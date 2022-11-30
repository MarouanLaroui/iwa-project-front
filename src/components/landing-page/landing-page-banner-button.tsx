import { Stack } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LandingPageButton(props:{
  tKey: string,
  link: string
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { tKey, link } = props;
  return (
    <Stack
      sx={{
        background: 'white',
        '&: hover': {
          transform: 'scale(1.03)',
          transition: 'transform .1s',
          cursor: 'pointer',
        },
      }}
      justifyContent="space-between"
      direction="row"
      alignItems="center"
      paddingX={4}
      paddingY={2}
      width="100%"
      onClick={() => navigate(link)}
    >
      <Typography fontWeight="bold">{t(tKey)}</Typography>
      <ArrowForwardIosIcon />
    </Stack>
  );
}
