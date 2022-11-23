/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from './search-bar';
import { ContractType, JobType, OfferFilters } from '../../types/offer/Offer';

export default function OfferSearchBar(props: {
  setFilters: React.Dispatch<React.SetStateAction<OfferFilters>>
}) {
  const [selectedContractType, setSelectedContractType] = useState<ContractType>();
  const [selectedJobType, setSelectedJobType] = useState<JobType>();
  const { setFilters } = props;

  useEffect(() => {
    setFilters({
      contractType: selectedContractType, jobType: selectedJobType,
    });
  }, [selectedContractType, selectedJobType]);

  return (
    <Stack direction="row" spacing="10px">
      <SearchBar sx={{ width: '60%' }} />
      <FormControl sx={{ minWidth: '120px' }}>
        <InputLabel id="contract-label">Contract</InputLabel>
        <Select label="Contrat" labelId="contract-label" defaultValue={ContractType.CDI} onChange={(event) => setSelectedContractType(event.target.value as ContractType)}>
          {
            Object.keys(ContractType).map(
              (contractType) => (
                <MenuItem value={contractType} key={contractType}>
                  {contractType}
                </MenuItem>
              ),
            )
          }
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: '180px' }}>
        <InputLabel id="type-label">Type</InputLabel>
        <Select label="Type" labelId="type-label" defaultValue={JobType.FULL_TIME} onChange={(event) => setSelectedJobType(event.target.value as JobType)}>
          {
            Object.keys(JobType).map(
              (jobType) => (
                <MenuItem value={jobType} key={jobType}>
                  {jobType}
                </MenuItem>
              ),
            )
          }
        </Select>
      </FormControl>

      <Button startIcon={<SearchIcon />} variant="contained" sx={{ paddingX: '15px' }}>Rechercher</Button>
    </Stack>
  );
}
