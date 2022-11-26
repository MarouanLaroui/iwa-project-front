import { Stack } from '@mui/system';
import React from 'react';
import CompanyOfferList from '../components/company/company-offer-list';
import UserContext from '../context/user-context';

export default function MyOfferPage() {
  return (
    <Stack width="100%" direction="column" gap="2em">
      <UserContext.Consumer>
        {(value) => value.userId && <CompanyOfferList companyData={{ id: value.userId }} />}
      </UserContext.Consumer>

    </Stack>
  );
}
