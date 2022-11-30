/* eslint-disable react/require-default-props */
import { Button, MenuItem } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SectorType } from '../../../types/company/Company';
import { Criteria } from '../../../types/criteria/Criteria';
import CriteriaDTO from '../../../types/criteria/CriteriaDTO';
import { ContractType, JobType } from '../../../types/offer/Offer';
import InputField from '../../form-fields/input-field';
import SelectField from '../../form-fields/select-field';
import { createCriterias, updateCriterias } from '../../../hooks/request/criteriaHooks';
import useAlert from '../../../hooks/context/useAlert';

export default function CriteriaForm(props:{
  criteria?: Criteria
}) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { criteria } = props;
  const { setError, setSuccessMessage } = useAlert();
  const { t } = useTranslation();

  const initalValues: CriteriaDTO = {
    contractType: criteria?.contractType || ContractType.CDD,
    jobType: criteria?.jobType || JobType.PARTIAL_TIME,
    sector: criteria?.sector || SectorType.AGRICULTURE_PECHE,
    salaryExpectation: 1300,
    startingDate: criteria?.startingDate || new Date(),
    endDate: criteria?.endDate || new Date(),
    location: criteria?.location || 'France',
    jobLabel: criteria?.jobLabel || 'Serveur',
  };

  const onSubmit = (criteriaToSubmit: CriteriaDTO) => {
    (criteria ? updateCriterias(criteriaToSubmit) : createCriterias(criteriaToSubmit)).then(() => {
      setSuccessMessage('Criteria updated');
      setEditMode(false);
    }).catch((error) => {
      setError(error);
    });
  };
  return (
    <Formik
      initialValues={initalValues}
      onSubmit={async (data: CriteriaDTO, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(data);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Stack width="100%" alignItems="center" paddingTop={2}>
          <Box component={Form} width={{ xs: '100%', md: '800px' }}>
            <Stack direction="column" spacing={4}>
              <Stack direction="row" spacing={2}>
                <SelectField
                  label="job type"
                  name="jobType"
                  placeholder="pick a type"
                  disabled={!editMode}
                  fullWidth
                >
                  {
                    Object.keys(JobType).map(
                      (jobType) => (
                        <MenuItem value={jobType} key={jobType}>
                          {jobType}
                        </MenuItem>
                      ),
                    )
                  }
                </SelectField>

                <SelectField
                  label="contract type"
                  name="contractType"
                  placeholder="pick a type"
                  fullWidth
                  disabled={!editMode}
                >
                  {
                    Object.keys(ContractType).map(
                      (contractType) => (
                        <MenuItem value={contractType} key={contractType}>
                          {contractType}
                        </MenuItem>
                      ),
                    )
                  }
                </SelectField>
              </Stack>

              <Stack direction="row" spacing={2}>
                <InputField
                  label="starting date"
                  name="startingDate"
                  type="date"
                  disabled={!editMode}
                  fullWidth
                />

                <InputField
                  label="ending date"
                  name="endDate"
                  type="date"
                  disabled={!editMode}
                  fullWidth
                />
              </Stack>

              <Stack direction="row" spacing={2}>

                <InputField
                  label="salaryExpectation"
                  name="salaryExpectation"
                  type="number"
                  disabled={!editMode}
                  fullWidth
                />

                <SelectField
                  label={t('sector')}
                  name="sector"
                  disabled={!editMode}
                >
                  {
                    Object.keys(SectorType).map(
                      (sectorType) => (
                        <MenuItem value={sectorType} key={sectorType}>
                          {sectorType}
                        </MenuItem>
                      ),
                    )
                  }
                </SelectField>
              </Stack>

              <Stack direction="row" spacing={2}>
                <InputField
                  label="location"
                  name="location"
                  placeholder="Enter a location here"
                  type="text"
                  disabled={!editMode}
                  fullWidth
                />

                <InputField
                  label="job label"
                  name="jobLabel"
                  placeholder="Enter a job"
                  type="text"
                  disabled={!editMode}
                  fullWidth
                />
              </Stack>
              {
                !editMode && (
                  <Button
                    variant="contained"
                    onClick={() => setEditMode(true)}
                    startIcon={<EditOutlinedIcon />}
                    sx={{ width: 'fit-content' }}
                  >
                    Edit

                  </Button>
                )
              }
              {
                editMode && (
                  <Button
                    variant="contained"
                    disabled={!formik.isValid}
                    startIcon={<SaveOutlinedIcon />}
                    sx={{ width: 'fit-content' }}
                    type="submit"
                  >
                    Save

                  </Button>
                )
              }

            </Stack>
          </Box>
        </Stack>

      )}
    </Formik>
  );
}
