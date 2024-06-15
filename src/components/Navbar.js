import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';

import { paths } from '../constants/paths';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as BrawlStarsIcon } from '../images/BrawlStarsIcon.svg';

const Toolbar = styled(MuiToolbar)({
  maxWidth: 1400,
  width: '100%',
  padding: '16px 16px 0 16px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  justifyContent: 'space-between',
  gap: '12px',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  '& .MuiTabs-flexContainer': {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const currentIndex = paths.indexOf(currentPath);
  const [value, setValue] = React.useState(currentIndex !== -1 ? currentIndex : 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(paths[newValue]);
  };

  React.useEffect(() => {
    const currentIndex = paths.indexOf(location.pathname);
    if (currentIndex !== -1) {
      setValue(currentIndex);
    }
  }, [location.pathname]);

  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: theme.palette.divider,
      })}
    >
      <Toolbar variant="regular">
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Tabs value={value} onChange={handleChange} aria-label="navbar tabs">
            <Tab label="Club" {...a11yProps(0)} />
            <Tab label="Player" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
          <BrawlStarsIcon style={{ width: 56, height: 56 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
