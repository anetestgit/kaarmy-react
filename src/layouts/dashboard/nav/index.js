import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation, NavLink as RouterLink } from 'react-router-dom';

// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar, Stack, List, ListItemText, ListItem, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
// mock
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Scrollbar from '../../../components/scrollbar';

import { StyledNavItem, StyledNavItemIcon } from './styles';
import { navConfig } from './navMenu';
import { UserAuthDetails } from '../../../components/AuthenicationUser';


//
// import navConfig from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);



  const [open, setOpen] = useState({});

  const handleClick = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));

  };

  const [open2, setOpen2] = useState(true);

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        Logo
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={UserAuthDetails.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {UserAuthDetails.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {UserAuthDetails.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      <Box >

        <List disablePadding sx={{ p: 1 }} >
          {navConfig.map((item) => (
            < div key={item.id} >
              <StyledNavItem key={item.id}
                component={RouterLink}

                to={item.path}

                sx={{
                  '&.active': {
                    color: 'text.primary',
                    bgcolor: 'action.selected',
                    fontWeight: 'fontWeightBold',
                  },
                }}
              >
                <ListItem onClick={() => item.submenu ? handleClick(item.id) : null}   >
                  <StyledNavItemIcon>
                    {item.icon}
                  </StyledNavItemIcon>
                  <ListItemText primary={item.title} />


                  {item.submenu ?

                    open[item.id] ? <ExpandLess /> : <ExpandMore />
                    :
                    ('')}
                </ListItem>

              </StyledNavItem>

              {item.submenu ?

                <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                  <List disablePadding sx={{ p: 1 }}>


                    {item.submenu.map((itemSubmenu) => (

                      <StyledNavItem key={itemSubmenu.id}
                        component={RouterLink}
                        to={itemSubmenu.path}
                      >
                        <ListItem>
                          <StyledNavItemIcon>
                            {itemSubmenu.icon}
                          </StyledNavItemIcon>
                          <ListItemText primary={itemSubmenu.title} />
                        </ListItem>
                      </StyledNavItem>

                    ))}
                  </List>
                </Collapse>

                : ('')}
            </div>

          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
