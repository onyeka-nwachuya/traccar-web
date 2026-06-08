import React from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from '../common/components/LocalizationProvider';
import PageLayout from '../common/components/PageLayout';
import ReportsMenu from '../reports/components/ReportsMenu';
import useReportStyles from '../reports/common/useReportStyles';
import { Grid, Paper, Typography, Box } from "@mui/material";
import OnlineStatusChart from "./charts/OnlineStatusChart";
import MileageChart from "./charts/MileageChart";
import IdleVsMovementChart from "./charts/IdleVsMovementChart";
import DevicesByCategoryChart from "./charts/DevicesByCategoryChart";
import DevicesByProtocolChart from "./charts/DevicesByProtocolChart";
import EventsChart from "./charts/EventsChart";
import TopSpeedChart from "./charts/TopSpeedChart";
import ActiveDevicesChart from "./charts/ActiveDevicesChart";
import ReportsPerDayChart from "./charts/ReportsPerDayChart";
import TotalDevices from "./charts/TotalDevices";
import AverageSpeedChart from "./charts/AverageSpeedChart";
import TotalUsers from "./charts/TotalUsers";


const Dashboard = () => {
  const { classes } = useReportStyles();
  const t = useTranslation();
  const user = useSelector((state) => state.session.user);

  // Helper function to check if chart is enabled (default: true if not set)
  const isChartEnabled = (chartKey) => {
    if (!user?.attributes) return true;
    const value = user.attributes[chartKey];
    return value !== 'false'; // Default to true if not explicitly disabled
  };

  return (
    <PageLayout menu={<ReportsMenu />} breadcrumbs={['reportTitle', 'reportDashboard']}>
      <Grid container spacing={3}>

        <Grid container spacing={2}>
          {isChartEnabled('chartTotalDevices') && (
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2, minHeight: 200, height: 200, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Total Vehicles</Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <TotalDevices />
                </Box>
              </Paper>
            </Grid>
          )}

          {isChartEnabled('chartTotalUsers') && (
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2, minHeight: 200, height: 200, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Total Users</Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <TotalUsers />
                </Box>
              </Paper>
            </Grid>
          )}
            </Grid>

          {isChartEnabled('chartOnlineStatus') && (
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2, minHeight: 400, height: 400, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Online vs Offline</Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <OnlineStatusChart />
                </Box>
              </Paper>
            </Grid>
          )}

          {isChartEnabled('chartActiveDevices') && (
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2, minHeight: 400, height: 400, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Active Devices (24h)</Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <ActiveDevicesChart />
                </Box>
              </Paper>
            </Grid>
          )}

          {isChartEnabled('chartDevicesByCategory') && (
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2, minHeight: 400, height: 400, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Devices by Category</Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <DevicesByCategoryChart />
                </Box>
              </Paper>
            </Grid>
          )}

          {isChartEnabled('chartDevicesByProtocol') && (
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2, minHeight: 400, height: 400, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Devices by Protocol</Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <DevicesByProtocolChart />
                </Box>
              </Paper>
            </Grid>
          )}

          {isChartEnabled('chartIdleVsMovement') && (
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2, minHeight: 400, height: 400, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Movement vs Idle</Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <IdleVsMovementChart />
                </Box>
              </Paper>
            </Grid>
          )}

          {isChartEnabled('chartMileage') && (
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2, minHeight: 400, height: 400, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Daily Mileage</Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <MileageChart />
                </Box>
              </Paper>
            </Grid>
          )}

          {isChartEnabled('chartAverageSpeed') && (
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2, minHeight: 400, height: 400, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Average Speed</Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <AverageSpeedChart />
                </Box>
              </Paper>
            </Grid>
          )}

          {isChartEnabled('chartEvents') && (
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2, minHeight: 400, height: 400, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Active Alarms / Events</Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <EventsChart />
                </Box>
              </Paper>
            </Grid>
          )}

          {isChartEnabled('chartTopSpeed') && (
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2, minHeight: 400, height: 400, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Top Speeding Instances</Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <TopSpeedChart />
                </Box>
              </Paper>
            </Grid>
          )}

          {isChartEnabled('chartReportsPerDay') && (
            <Grid item xs={12} md={12} lg={8}>
              <Paper sx={{ p: 2, minHeight: 400, height: 400, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Position Reports Per Day</Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <ReportsPerDayChart />
                </Box>
              </Paper>
            </Grid>
          )}

        </Grid>
    </PageLayout>
  )
}

export default Dashboard


