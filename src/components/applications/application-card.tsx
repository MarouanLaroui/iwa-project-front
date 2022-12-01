import { Cancel, CheckCircle, PendingActions } from '@mui/icons-material';
import {
  Avatar,
  Box, Button, Stack, Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AlertContext from '../../context/alert-context';
import { acceptApplicationByCompany } from '../../hooks/request/applicationHooks';
import ApplicationFull from '../../types/application/ApplicationFull';
import TypographyWithIcon from '../typography-with-icon';
import PreviewImageModal from '../preview-image-modal';

type ApplicationCardProps = {
  applicationFull: ApplicationFull;
};

function ApplicationStatus({ applicationFull }: ApplicationCardProps) {
  const { t } = useTranslation();

  if (applicationFull.isValidatedByCompany) {
    if (applicationFull.isValidatedByWorker) {
      return <TypographyWithIcon sx={{ color: 'green' }} text={t('fully-accepted')} icon={<CheckCircle sx={{ color: 'green' }} />} />;
    }
    return <TypographyWithIcon sx={{ color: 'orange' }} text={t('company-accepted')} icon={<PendingActions sx={{ color: 'orange' }} />} />;
  }
  return <TypographyWithIcon sx={{ color: 'gray' }} text={t('not-accepted')} icon={<Cancel sx={{ color: 'gray' }} />} />;
}

export default function ApplicationCard({ applicationFull }: ApplicationCardProps) {
  const [prevModalOpen, setPrevModalOpen] = useState<boolean>(false);
  const { setError, setSuccessMessage } = useContext(AlertContext);
  const [application, setApplication] = useState<ApplicationFull>(applicationFull);
  const { t } = useTranslation();
  const { worker } = application;
  return (
    <Box
      width="100%"
      borderRadius="5px"
      paddingY={2}
    >
      {/* Modal */}
      {worker.cvLink && (
        <PreviewImageModal
          isOpened={prevModalOpen}
          setOpened={setPrevModalOpen}
          cldImgURL={worker.cvLink}
        />
      )}
      {/* component */}
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        paddingX={4}
        spacing={2}
      >

        <Stack
          width="100%"
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          paddingX="20px"
          paddingY="20px"
          spacing={3}
        >
          <Stack>
            {
              worker.pictureUrl
              && (
              <Avatar
                alt={`${worker.firstname} ${worker.lastname}`}
                src={worker.pictureUrl}
                sx={{ width: { xs: 80, lg: 65 }, height: { xs: 80, lg: 65 } }}
              />
              )
            }
            {
              !worker.pictureUrl && (
                <Avatar
                  sx={{ width: { xs: 80, lg: 75 }, height: { xs: 80, lg: 75 } }}
                >
                  {(worker.firstname[0] + worker.lastname[0]).toUpperCase()}
                </Avatar>
              )
            }
          </Stack>

          <Stack
            direction="column"
            alignItems="flex-start"
            gap="5px"
          >
            <Typography textAlign="left" fontWeight="bold">
              {worker.firstname}
              {' '}
              {worker.lastname.toUpperCase()}
            </Typography>
            <Typography textAlign="left" fontStyle="italic">
              {t('born-on')}
              {worker.birthDate.toDateString().substring(3, worker.birthDate.toDateString().length)}
            </Typography>
            <ApplicationStatus applicationFull={application} />
            <Typography
              sx={{ wordBreak: 'break-all', fontSize: { xs: '16px', md: '16px' } }}
              textAlign="left"
            >
              {`"${application.message}"`}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Stack>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setPrevModalOpen(true)}
              startIcon={<ArticleOutlinedIcon />}
              sx={{ width: '195px' }}
            >
              {t('candidate-cv')}

            </Button>
          </Stack>

          <Stack direction="row">
            {!applicationFull.isValidatedByCompany && (
              <Button
                fullWidth
                variant="outlined"
                sx={{ width: '195px' }}
                onClick={() => {
                  acceptApplicationByCompany(application.applicationId)
                    .then(() => {
                      setSuccessMessage(t('application-accepted'));
                      setApplication({ ...application, isValidatedByCompany: true });
                    })
                    .catch((err: AxiosError) => setError(err));
                }}
              >
                {t('accept-application')}
              </Button>
            )}

          </Stack>
        </Stack>

      </Stack>

    </Box>
  );
}
