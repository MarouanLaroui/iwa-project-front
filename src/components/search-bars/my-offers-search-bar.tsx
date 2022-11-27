/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Button,
} from '@mui/material';
import { Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from './search-bar';
import { OfferFilters } from '../../types/offer/Offer';

export default function MyOffersSearchBar(props: {
  setFilters: React.Dispatch<React.SetStateAction<OfferFilters>>,
}) {
  const [searchedTitle, setSearchedTitle] = useState<string>('');
  const { setFilters } = props;

  useEffect(() => {
    setFilters({
      title: searchedTitle,
    });
  }, [searchedTitle]);

  return (
    <Stack direction="row" spacing="10px" justifyContent="center">
      <SearchBar sx={{ width: '60%' }} onChange={(event) => setSearchedTitle(event.target.value)} placeholder="Search by job title" />

      <Button startIcon={<SearchIcon />} variant="contained" sx={{ paddingX: '15px' }}>Rechercher</Button>
    </Stack>
  );
}
