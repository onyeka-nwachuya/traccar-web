import { Fragment } from 'react';
import {
  List,
  ListItemText,
  ListItemIcon,
  Divider,
  ListSubheader,
  ListItemButton,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const SideNav = ({ routes }) => {
  const location = useLocation();

  return (
    <List disablePadding style={{ paddingTop: '16px' }}>
      {routes.map((route) =>
        route.subheader ? (
          <Fragment key={route.subheader}>
            <Divider />
            <ListSubheader sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {route.subheader}
            </ListSubheader>
          </Fragment>
        ) : (
          <ListItemButton
            disableRipple
            component={Link}
            key={route.href}
            to={route.href}
            selected={location.pathname.match(route.match || route.href) !== null}
            sx={{ px: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 40, mr: 1 }}>{route.icon}</ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItemButton>
        ),
      )}
    </List>
  );
};

export default SideNav;

