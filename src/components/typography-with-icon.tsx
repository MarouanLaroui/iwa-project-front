import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { DefaultTFuncReturn } from 'i18next';

type Props = {
  text: string | DefaultTFuncReturn
  icon: ReactElement
};

export default function TypographyWithIcon({ text, icon }: Props) {
  return (
    <Stack direction="row" justifyContent="center" gap="3px">
      {icon}
      <Typography>{text}</Typography>
    </Stack>
  );
}
