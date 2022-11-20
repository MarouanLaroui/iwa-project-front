import React from 'react';
import {
  Button, Grid, IconButton, Menu, MenuItem, Typography,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HOME_ROUTE, COMPANY_SEARCH_ROUTE, OFFER_SEARCH_ROUTE } from '../pages/routing/routes';

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { t } = useTranslation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = [
    { name: t('home'), link: HOME_ROUTE },
    { name: t('search-job'), link: OFFER_SEARCH_ROUTE },
    { name: t('search-company'), link: COMPANY_SEARCH_ROUTE },
  ];

  const navigation = useNavigate();

  return (
    <>
      {/* Desktop navbar */}
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        paddingY="20px"
        display={{ xs: 'none', lg: 'flex' }}
        gap="20px"
      >
        <Stack direction="row" alignItems="center">
          <WorkOutlineIcon fontSize="large" />
          <Stack direction="column">
            <Typography variant="h4" fontWeight="bold">YourJob</Typography>
            <Typography>find your next job</Typography>
          </Stack>
        </Stack>

        <Grid xs container direction="row" gap="10px" alignItems="center">
          {pages.map(
            (page) => (

              <Button key={`${page.name}button`} sx={{ color: 'black', fontWeight: 'bold' }} onClick={() => { navigation(page.link); }}>
                {page.name}
              </Button>
            ),
          )}
        </Grid>
        <Button variant="contained" size="medium" sx={{ fontWeight: 'bold' }}>{t('worker-login')}</Button>
        <Button variant="outlined" size="medium" sx={{ fontWeight: 'bold' }}>{t('company-login')}</Button>
      </Grid>

      {/* Mobile navbar */}
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        paddingY="20px"
        display={{ xs: 'flex', lg: 'none' }}
        gap="20px"
      >
        <Box>
          <IconButton
            size="large"
            color="inherit"
            aria-haspopup="true"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={() => {
                  navigation(page.link);
                  handleCloseNavMenu();
                }}
              >
                {page.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Grid xs container direction="row" alignItems="center" justifyContent="center">
          <WorkOutlineIcon fontSize="large" />
          <Stack direction="column">
            <Typography variant="h4" fontWeight="bold">YourJob</Typography>
            <Typography>find your next job</Typography>
          </Stack>
        </Grid>

        <Box>
          <IconButton
            size="large"
            color="inherit"
            aria-haspopup="true"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenUserMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="user-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              onClick={handleCloseUserMenu}
            >
              <Typography textAlign="center">{t('worker-login')}</Typography>
            </MenuItem>

            <MenuItem
              onClick={handleCloseUserMenu}
            >
              <Typography textAlign="center">{t('company-login')}</Typography>
            </MenuItem>

          </Menu>
        </Box>

      </Grid>
    </>

  );
}
