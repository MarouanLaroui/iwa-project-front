/* eslint-disable no-nested-ternary */
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
import useAuth from '../../hooks/context/useAuth';
import { workerAccountPages, workerPages } from './pages/worker-pages';
import { companyAccountPages, companyPages } from './pages/company-pages';
import { baseAccountPages, basePages } from './pages/base-pages';

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { workerId, companyId } = useAuth();
  const { t } = useTranslation();

  const getPages = () => {
    if (workerId) return workerPages;
    if (companyId) return companyPages;
    return basePages;
  };

  const getAccountPages = () => {
    if (workerId) return workerAccountPages;
    if (companyId) return companyAccountPages;
    return baseAccountPages;
  };

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

  const navigation = useNavigate();

  return (
    <>
      {/* Desktop navbar */}
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        paddingTop="20px"
        display={{ xs: 'none', lg: 'flex' }}
        gap="20px"
        width="100%"
      >
        <Stack direction="row" alignItems="center">
          <WorkOutlineIcon fontSize="large" />
          <Stack direction="column">
            <Typography variant="h4" fontWeight="bold">YourJob</Typography>
            <Typography>find your next job</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" gap="10px" alignItems="center" width="100%" justifyContent="space-between" marginLeft="20px">
          {getPages().map(
            (page) => (
              <Button
                key={`${page.nameKey}button`}
                sx={{ color: 'black', fontWeight: 'bold' }}
                onClick={() => { navigation(page.link); }}
              >
                {t(`${page.nameKey}`)}
              </Button>
            ),
          )}
          <Stack direction="row" gap="30px">
            {
              getAccountPages().map((page) => (
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ fontWeight: 'bold' }}
                  onClick={() => navigation(page.link)}
                >
                  {t(`${page.nameKey}`)}
                </Button>
              ))
            }
          </Stack>
        </Stack>
      </Stack>

      {/* Mobile navbar */}
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        paddingTop="10px"
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
            {getPages().map((page) => (
              <MenuItem
                key={page.nameKey}
                onClick={() => {
                  navigation(page.link);
                  handleCloseNavMenu();
                }}
              >
                {t(`${page.nameKey}`)}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Grid item xs alignItems="center" justifyContent="center">
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
            {
              getAccountPages().map((page) => (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigation(page.link);
                  }}
                >
                  <Typography textAlign="center">
                    {t(`${page.nameKey}`)}
                  </Typography>
                </MenuItem>
              ))
            }
            {
              (companyId || workerId) && (
                <MenuItem
                  onClick={() => {
                  }}
                >
                  Déconnexion
                </MenuItem>
              )
            }
          </Menu>
        </Box>
      </Grid>
    </>

  );
}
