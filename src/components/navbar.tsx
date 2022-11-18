import React from 'react';
import {
  Button, Grid, IconButton, Menu, MenuItem, Typography,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Stack } from '@mui/system';

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
    { name: 'Accueil', link: '' },
    { name: 'Trouver une entreprise', link: '' },
    { name: 'Trouver un job', link: '' },
  ];

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
              <Button key={`${page.name}button`} sx={{ color: 'black', fontWeight: 'bold' }} onClick={() => {}}>
                {page.name}
              </Button>
            ),
          )}
        </Grid>
        <Button variant="outlined" size="medium" sx={{ fontWeight: 'bold' }}>Devenir client</Button>
        <Button variant="contained" size="medium" sx={{ fontWeight: 'bold' }}>Se connecter</Button>
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
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">{page.name}</Typography>
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
              <Typography textAlign="center">Se connecter</Typography>
            </MenuItem>

            <MenuItem
              onClick={handleCloseUserMenu}
            >
              <Typography textAlign="center">Devenir client</Typography>
            </MenuItem>

          </Menu>
        </Box>

      </Grid>
    </>

  );
}
