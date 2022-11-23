import React from 'react';
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
  const { setFilters } = props;

  const onJobTypeChange = () => {
    setFilters({});
  };
  return (
    <Stack direction="row" spacing="10px">
      <SearchBar sx={{ width: '60%' }} />
      <FormControl sx={{ minWidth: '120px' }}>
        <InputLabel id="contract-label">Contract</InputLabel>
        <Select label="Contrat" labelId="contract-label" defaultValue={ContractType.CDI} onChange={onJobTypeChange}>
          {
            Object.keys(ContractType).map(
              (contractType) => <MenuItem value={contractType}>{contractType}</MenuItem>,
            )
          }
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: '180px' }}>
        <InputLabel id="type-label">Type</InputLabel>
        <Select label="Type" labelId="type-label" defaultValue={JobType.FULL_TIME}>
          {
            Object.keys(JobType).map(
              (contractType) => <MenuItem value={contractType}>{contractType}</MenuItem>,
            )
          }
        </Select>
      </FormControl>

      <Button startIcon={<SearchIcon />} variant="contained" sx={{ paddingX: '15px' }}>Rechercher</Button>
    </Stack>
  );
}
