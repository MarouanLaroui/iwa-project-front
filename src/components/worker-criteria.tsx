import { Stack } from '@mui/system';
import ArticleIcon from '@mui/icons-material/Article';
import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'react-i18next';
import TypographyWithIcon from './typography-with-icon';
import { Criteria } from '../types/criteria/Criteria';
import { JobType } from '../types/offer/Offer';
import { getSectorTypeTranslation } from '../types/company/Company';

type Props = {
  criteria: Criteria
};

export default function WorkerCriteria({ criteria }: Props) {
  const { t } = useTranslation();

  const jobType = criteria.jobType === JobType.FULL_TIME ? t('full-time') : t('partial-time');

  return (
    <Stack alignItems="flex-start" spacing="10px">
      <TypographyWithIcon text={criteria.contractType} icon={<ArticleIcon />} />
      <TypographyWithIcon text={jobType} icon={<AccessTimeIcon />} />
      <TypographyWithIcon text={getSectorTypeTranslation(criteria.sector)} icon={<ArticleIcon />} />
      <TypographyWithIcon text={criteria.contractType} icon={<ArticleIcon />} />
      <TypographyWithIcon text={criteria.contractType} icon={<ArticleIcon />} />
    </Stack>
  );
}
