import { grey, green, indigo } from '@mui/material/colors';

const validatedColor = (color) => (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color) ? color : null);

const gpsgatePrimary = '#ff6f00'; // warm accent similar to many GPSGate-style dashboards
const gpsgateSecondary = '#009688'; // teal secondary

export default (server, darkMode) => {
  const appearance = server?.attributes?.appearance;
  const themeMode = appearance?.theme;
  const useGpsgateTheme = themeMode === 'gpsgate';

  return {
    mode: darkMode ? 'dark' : 'light',
    background: {
      default: darkMode ? grey[900] : '#f5f6fa',
    },
    primary: {
      main: useGpsgateTheme
        ? gpsgatePrimary
        : validatedColor(server?.attributes?.colorPrimary) || (darkMode ? indigo[200] : indigo[900]),
    },
    secondary: {
      main: useGpsgateTheme
        ? gpsgateSecondary
        : validatedColor(server?.attributes?.colorSecondary) || (darkMode ? green[200] : green[800]),
    },
    neutral: {
      main: grey[500],
    },
    geometry: {
      main: useGpsgateTheme ? '#ff6f00' : '#3bb2d0',
    },
    alwaysDark: {
      main: grey[900],
    },
  };
};

