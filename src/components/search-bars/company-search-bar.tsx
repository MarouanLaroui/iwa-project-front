/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from './search-bar';
import { CompanyFilters, SectorType } from '../../types/company/Company';

export default function CompanySearchBar(props: {
  setFilters: React.Dispatch<React.SetStateAction<CompanyFilters>>,
  filters: CompanyFilters
}) {
  const [selectedSector, setSelectedSector] = useState<SectorType>();
  const [searchedName, setSelectedSearchedName] = useState<string>('');
  const { filters, setFilters } = props;

  useEffect(() => {
    setFilters({
      sector: selectedSector, companyName: searchedName,
    });
  }, [searchedName, selectedSector]);

  return (
    <Stack direction="row" spacing="10px">
      <SearchBar sx={{ width: '60%' }} onChange={(event) => setSelectedSearchedName(event.target.value)} />
      <FormControl sx={{ minWidth: '120px' }}>
        <InputLabel id="contract-label">Sector</InputLabel>
        <Select label="Contrat" labelId="contract-label" defaultValue={filters.sector} onChange={(event) => setSelectedSector(event.target.value as SectorType)}>
          {
            Object.keys(SectorType).map(
              (sectorType) => (
                <MenuItem value={sectorType} key={sectorType}>
                  {sectorType}
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
