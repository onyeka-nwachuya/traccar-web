import { Box, Paper, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from '../../common/components/LocalizationProvider';

const PanelTitle = ({ icon, title }) => (
  <Box display="flex" alignItems="center" gap={1} mb={1}>
    {icon}
    <Typography variant="subtitle2" fontWeight={700}>
      {title}
    </Typography>
  </Box>
);

const DashboardSidebarPanels = ({
  children,
  rightHeader,
  groupsPlaceholder = true,
  driversPlaceholder = true,
}) => {
  const t = useTranslation();

  return (
    <Box display="flex" flexDirection="column" height="100%" minHeight={0}>
      <Paper variant="outlined" square sx={{ p: 1.5, mb: 1 }}>
        <PanelTitle
          icon={<DirectionsCarIcon fontSize="small" />}
          title={rightHeader || t('sharedDevices')}
        />
        <Box minHeight={0} height={"calc(100vh - 320px)"} sx={{ overflow: 'hidden' }}>
          {children}
        </Box>
      </Paper>

      {groupsPlaceholder && (
        <Paper variant="outlined" square sx={{ p: 1.5, mb: 1 }}>
          <PanelTitle icon={<GroupIcon fontSize="small" />} title={t('settingsGroups')} />
          <Typography variant="body2" color="text.secondary">
            Groups panel (placeholder)
          </Typography>
        </Paper>
      )}

      {driversPlaceholder && (
        <Paper variant="outlined" square sx={{ p: 1.5 }}>
          <PanelTitle icon={<PersonIcon fontSize="small" />} title={t('sharedDrivers') || 'Drivers'} />
          <Typography variant="body2" color="text.secondary">
            Drivers panel (placeholder)
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default DashboardSidebarPanels;

