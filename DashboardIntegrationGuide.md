# Traccar Web Dashboard Integration Guide

This guide explains how to add the custom dashboard to `traccar-web` from a fresh clone.

It is written for a React beginner. Each step tells you:

- which file or folder is involved
- whether to create or edit it
- where to place the code
- why the step is needed

The dashboard lives at:

```text
/reports/dashboard
```

It appears inside the existing Reports area and uses the existing Traccar Redux data, Traccar API helpers, Material UI layout components, and Chart.js charts.

## 1. Clone Traccar Web

Open a terminal and run:

```bash
git clone https://github.com/traccar/traccar-web.git
cd traccar-web
```

If you use your own fork, replace the URL with your fork URL:

```bash
git clone https://github.com/YOUR_NAME/traccar-web.git
cd traccar-web
```

## 2. Install Dependencies

Run:

```bash
npm install
```

This installs everything from `package.json`.

## 3. Confirm Dashboard Packages

Edit:

```text
package.json
```

Inside the `"dependencies"` object, confirm these packages exist:

```json
"@mui/icons-material": "^9.0.1",
"chart.js": "^4.5.1",
"dayjs": "^1.11.21",
"react-chartjs-2": "^5.3.1"
```

What each package does:

- `@mui/icons-material`: provides dashboard and summary icons.
- `chart.js`: renders the actual charts.
- `react-chartjs-2`: lets React components render Chart.js charts.
- `dayjs`: handles date formatting for daily report charts.

If any package is missing, install it:

```bash
npm install @mui/icons-material chart.js react-chartjs-2 dayjs
```

Files affected by this step:

```text
package.json
package-lock.json
```

## 4. Register Chart.js

Edit:

```text
src/index.jsx
```

Add this import at the very top of the file, before every other import:

```jsx
import 'chart.js/auto';
```

The beginning of the file should look like this:

```jsx
import 'chart.js/auto';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
```

Why this is needed:

Chart.js needs its chart types, scales, and plugins registered before charts can render. `chart.js/auto` registers the common defaults automatically.

## 5. Create the Dashboard Folder Structure

Create this folder if it does not already exist:

```text
src/main/charts
```

This folder stores every chart component used by the dashboard.

Files/folders involved:

```text
src/main
src/main/charts
```

## 6. Create the Dashboard Page

Create:

```text
src/main/Dashboard.jsx
```

This file is the main dashboard screen. It:

- uses the existing `PageLayout`
- shows the existing `ReportsMenu`
- places charts in Material UI cards
- checks user attributes to decide which cards are visible

Add this code:

```jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Paper, Typography, Box } from '@mui/material';
import PageLayout from '../common/components/PageLayout';
import ReportsMenu from '../reports/components/ReportsMenu';
import useReportStyles from '../reports/common/useReportStyles';
import OnlineStatusChart from './charts/OnlineStatusChart';
import MileageChart from './charts/MileageChart';
import IdleVsMovementChart from './charts/IdleVsMovementChart';
import DevicesByCategoryChart from './charts/DevicesByCategoryChart';
import DevicesByProtocolChart from './charts/DevicesByProtocolChart';
import EventsChart from './charts/EventsChart';
import TopSpeedChart from './charts/TopSpeedChart';
import ActiveDevicesChart from './charts/ActiveDevicesChart';
import ReportsPerDayChart from './charts/ReportsPerDayChart';
import TotalDevices from './charts/TotalDevices';
import AverageSpeedChart from './charts/AverageSpeedChart';
import TotalUsers from './charts/TotalUsers';

const Dashboard = () => {
  const { classes } = useReportStyles();
  const user = useSelector((state) => state.session.user);

  const isChartEnabled = (chartKey) => {
    if (!user?.attributes) return true;
    const value = user.attributes[chartKey];
    return value !== 'false';
  };

  return (
    <PageLayout menu={<ReportsMenu />} breadcrumbs={['reportTitle', 'reportDashboard']}>
      <Grid container spacing={3}>
        {isChartEnabled('totalDevices') && (
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, minHeight: 200, height: 200, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Total Vehicles</Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <TotalDevices />
              </Box>
            </Paper>
          </Grid>
        )}

        {isChartEnabled('totalUsers') && (
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, minHeight: 200, height: 200, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Total Users</Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <TotalUsers />
              </Box>
            </Paper>
          </Grid>
        )}

        {isChartEnabled('chartOnlineStatus') && (
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, minHeight: 400, height: 400, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Online vs Offline</Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <OnlineStatusChart />
              </Box>
            </Paper>
          </Grid>
        )}

        {isChartEnabled('chartActiveDevices') && (
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, minHeight: 400, height: 400, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Active Devices (24h)</Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <ActiveDevicesChart />
              </Box>
            </Paper>
          </Grid>
        )}

        {isChartEnabled('chartDevicesByCategory') && (
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, minHeight: 400, height: 400, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Devices by Category</Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <DevicesByCategoryChart />
              </Box>
            </Paper>
          </Grid>
        )}

        {isChartEnabled('chartDevicesByProtocol') && (
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, minHeight: 400, height: 400, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Devices by Protocol</Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <DevicesByProtocolChart />
              </Box>
            </Paper>
          </Grid>
        )}

        {isChartEnabled('chartIdleVsMovement') && (
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, minHeight: 400, height: 400, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Movement vs Idle</Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <IdleVsMovementChart />
              </Box>
            </Paper>
          </Grid>
        )}

        {isChartEnabled('chartMileage') && (
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, minHeight: 400, height: 400, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Daily Mileage</Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <MileageChart />
              </Box>
            </Paper>
          </Grid>
        )}

        {isChartEnabled('chartAverageSpeed') && (
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, minHeight: 400, height: 400, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Average Speed</Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <AverageSpeedChart />
              </Box>
            </Paper>
          </Grid>
        )}

        {isChartEnabled('chartEvents') && (
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, minHeight: 400, height: 400, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Active Alarms / Events</Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <EventsChart />
              </Box>
            </Paper>
          </Grid>
        )}

        {isChartEnabled('chartTopSpeed') && (
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, minHeight: 400, height: 400, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Top Speeding Instances</Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <TopSpeedChart />
              </Box>
            </Paper>
          </Grid>
        )}

        {isChartEnabled('chartReportsPerDay') && (
          <Grid item xs={12} md={12} lg={8}>
            <Paper sx={{ p: 2, minHeight: 400, height: 400, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Position Reports Per Day</Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <ReportsPerDayChart />
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </PageLayout>
  );
};

export default Dashboard;
```

Beginner note:

`isChartEnabled('chartKey')` checks the logged-in user's attributes. If the saved value is the string `'false'`, that card is hidden. If the value is missing or set to `'true'`, the card is visible.

Important key update:

Use these keys for the first two cards:

```jsx
isChartEnabled('totalDevices')
isChartEnabled('totalUsers')
```

Do not use the older keys:

```jsx
isChartEnabled('chartMaintenanceDue')
isChartEnabled('chartTopActiveDevices')
```

## 7. Create Total Devices Chart

Create:

```text
src/main/charts/TotalDevices.jsx
```

Add:

```jsx
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CommuteIcon from '@mui/icons-material/Commute';

const TotalDevices = () => {
  const devices = useSelector((state) => state.devices.items || {});

  const totalDevices = useMemo(() => Object.values(devices).length, [devices]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 50, fontWeight: 700, color: '#333' }}>
        <span><CommuteIcon fontSize="inherit" /></span>
        <span>{totalDevices}</span>
      </div>
    </div>
  );
};

export default TotalDevices;
```

What it does:

It reads `state.devices.items` from Redux and counts how many devices are currently loaded.

## 8. Create Total Users Chart

Create:

```text
src/main/charts/TotalUsers.jsx
```

Add:

```jsx
import React, { useEffect, useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import fetchOrThrow from '../../common/util/fetchOrThrow';

const TotalUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        const response = await fetchOrThrow('/api/users?all=true', { signal: controller.signal });
        setUsers(await response.json());
      } catch (error) {
        if (!controller.signal.aborted) {
          setUsers([]);
        }
      }
    };

    loadUsers();
    return () => controller.abort();
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 50, fontWeight: 700, color: '#333' }}>
        <span><PeopleIcon fontSize="inherit" /></span>
        <span>{users.length}</span>
      </div>
    </div>
  );
};

export default TotalUsers;
```

What it does:

It calls the Traccar API endpoint `/api/users?all=true` and displays the number of users returned.

Permission note:

If the logged-in account is not allowed to list all users, the value may show `0`.

## 9. Create Online Status Chart

Create:

```text
src/main/charts/OnlineStatusChart.jsx
```

Add:

```jsx
import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const OnlineStatusChart = () => {
  const devices = useSelector((state) => state.devices.items || {});
  const positions = useSelector((state) => state.session.positions || {});

  const data = useMemo(() => {
    const now = Date.now();
    let online = 0;
    let offline = 0;

    Object.values(devices).forEach((device) => {
      const position = positions[device.id];

      if (!position) {
        offline += 1;
        return;
      }

      const fixTime = new Date(position.fixTime).getTime();
      const diffMinutes = (now - fixTime) / 60000;

      if (diffMinutes <= 10) {
        online += 1;
      } else {
        offline += 1;
      }
    });

    return {
      labels: ['Online', 'Offline'],
      datasets: [
        {
          data: [online, offline],
          backgroundColor: ['#4CAF50', '#F44336'],
          borderColor: ['#388E3C', '#D32F2F'],
          borderWidth: 2,
        },
      ],
    };
  }, [devices, positions]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 12,
          padding: 14,
        },
      },
    },
  }), []);

  return <Doughnut data={data} options={options} />;
};

export default OnlineStatusChart;
```

What it does:

It treats devices with a position fix within the last 10 minutes as online.

## 10. Create Active Devices Chart

Create:

```text
src/main/charts/ActiveDevicesChart.jsx
```

Add:

```jsx
import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const ActiveDevicesChart = () => {
  const devices = useSelector((state) => state.devices.items || {});
  const positions = useSelector((state) => state.session.positions || {});

  const data = useMemo(() => {
    const now = Date.now();
    let active = 0;
    let inactive = 0;

    Object.values(devices).forEach((device) => {
      const position = positions[device.id];
      if (position && now - new Date(position.fixTime).getTime() <= 24 * 60 * 60 * 1000) {
        active += 1;
      } else {
        inactive += 1;
      }
    });

    return {
      labels: ['Active (24h)', 'Inactive'],
      datasets: [
        {
          data: [active, inactive],
          backgroundColor: ['#00bcd4', '#9e9e9e'],
          borderColor: ['#0288d1', '#616161'],
          borderWidth: 1,
        },
      ],
    };
  }, [devices, positions]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 12,
          padding: 14,
        },
      },
    },
  }), []);

  return <Doughnut data={data} options={options} />;
};

export default ActiveDevicesChart;
```

What it does:

It counts devices that reported a position within the last 24 hours.

## 11. Create Devices By Category Chart

Create:

```text
src/main/charts/DevicesByCategoryChart.jsx
```

Add:

```jsx
import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const DevicesByCategoryChart = () => {
  const devices = useSelector((state) => state.devices.items || {});

  const data = useMemo(() => {
    const categories = {};

    Object.values(devices).forEach((device) => {
      const category = device.category || device.attributes?.category || 'Unknown';
      categories[category] = (categories[category] || 0) + 1;
    });

    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: ['#3f51b5', '#ff9800', '#4caf50', '#f44336', '#9c27b0', '#00bcd4'],
        },
      ],
    };
  }, [devices]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 12,
          padding: 14,
        },
      },
    },
  }), []);

  return <Pie data={data} options={options} />;
};

export default DevicesByCategoryChart;
```

What it does:

It groups devices by their `category` value.

## 12. Create Devices By Protocol Chart

Create:

```text
src/main/charts/DevicesByProtocolChart.jsx
```

Add:

```jsx
import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const DevicesByProtocolChart = () => {
  const devices = useSelector((state) => state.devices.items || {});
  const positions = useSelector((state) => state.session.positions || {});

  const normalizeProtocol = (value) => {
    if (!value) return null;

    const raw = String(value).trim().toLowerCase();
    if (!raw) return null;

    const mapping = [
      [/^gl\d+/, 'Queclink'],
      [/^tk\d+/, 'TK102'],
      [/^gt\d+/, 'GT06'],
      [/^meitrack/, 'Meitrack'],
      [/^teltonika/, 'Teltonika'],
      [/^quectel|^queclink/, 'Queclink'],
      [/^ruptela/, 'Ruptela'],
      [/^concox/, 'Concox'],
      [/^xexun/, 'Xexun'],
      [/^topflytech/, 'Topflytech'],
      [/^m2m/, 'M2M'],
      [/^binatone/, 'Binatone'],
      [/^coban/, 'Coban'],
      [/^suntech/, 'Suntech'],
      [/^tk10/, 'TK10'],
      [/^gps\d+/, 'Coban'],
      [/^osmand/, 'Android'],
      [/^h02/, 'iTrackSafe'],
    ];

    for (const [pattern, label] of mapping) {
      if (pattern.test(raw)) {
        return label;
      }
    }

    const protocolMatch = raw.match(/\b(gl\d+|tk\d+|gt\d+|meitrack|teltonika|quectel|ruptela|concox|xexun|topflytech|m2m|binatone|coban|suntech)\b/);
    if (protocolMatch) {
      return protocolMatch[1].toUpperCase();
    }

    return String(value).trim();
  };

  const getDeviceProtocol = (device) => {
    const position = positions[device.id] || {};
    const protocolValue = position.protocol || device.protocol;
    const normalizedProtocol = normalizeProtocol(protocolValue);
    if (normalizedProtocol) return normalizedProtocol;

    const source = [device.model, device.name, device.uniqueId].filter(Boolean).join(' ').toLowerCase();
    if (!source) return 'Unknown';

    const patternMatch = source.match(/\b(gl\d+|tk\d+|gt\d+|meitrack|teltonika|quectel|ruptela|concox|xexun|topflytech|m2m|binatone|coban|suntech)\b/);
    if (patternMatch) {
      return patternMatch[1].toUpperCase();
    }

    return 'Unknown';
  };

  const data = useMemo(() => {
    const protocols = {};

    Object.values(devices).forEach((device) => {
      const protocol = getDeviceProtocol(device);
      protocols[protocol] = (protocols[protocol] || 0) + 1;
    });

    return {
      labels: Object.keys(protocols),
      datasets: [
        {
          data: Object.values(protocols),
          backgroundColor: ['#2196f3', '#ffca28', '#9c27b0', '#4caf50', '#ff5722', '#607d8b'],
          borderWidth: 1,
        },
      ],
    };
  }, [devices, positions]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 12,
          padding: 14,
        },
      },
    },
  }), []);

  return <Doughnut data={data} options={options} />;
};

export default DevicesByProtocolChart;
```

What it does:

It tries to identify each device protocol from position data, device data, model, name, or unique ID.

## 13. Create Idle Vs Movement Chart

Create:

```text
src/main/charts/IdleVsMovementChart.jsx
```

Add:

```jsx
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const IdleVsMovementChart = () => {
  const positions = useSelector((state) => state.session.positions || {});

  const data = useMemo(() => {
    let moving = 0;
    let idle = 0;

    Object.values(positions).forEach((position) => {
      if (position.attributes?.motion) {
        moving += 1;
      } else {
        idle += 1;
      }
    });

    return {
      labels: ['Moving', 'Idle'],
      datasets: [
        {
          label: 'Position count',
          data: [moving, idle],
          backgroundColor: ['#4caf50', '#ff9800'],
          borderRadius: 6,
        },
      ],
    };
  }, [positions]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 12,
          padding: 14,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { precision: 0 } },
    },
  }), []);

  return <Bar data={data} options={options} />;
};

export default IdleVsMovementChart;
```

What it does:

It reads the `motion` flag on live positions and counts moving vs idle positions.

## 14. Create Mileage Chart

Create:

```text
src/main/charts/MileageChart.jsx
```

Add:

```jsx
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { distanceFromMeters } from '../../common/util/converter';
import { useAttributePreference } from '../../common/util/preferences';

const MileageChart = () => {
  const devices = useSelector((state) => state.devices.items || {});
  const positions = useSelector((state) => state.session.positions || {});
  const distanceUnit = useAttributePreference('distanceUnit', 'km');

  const data = useMemo(() => {
    const mileage = Object.values(devices).map((device) => {
      const position = positions[device.id];
      const distanceMeters = (position?.attributes?.totalDistance || device?.attributes?.totalDistance || 0) * 1 || 0;

      return {
        name: device.name || `Device ${device.id}`,
        distance: distanceFromMeters(distanceMeters, distanceUnit),
      };
    });

    const sorted = mileage.sort((a, b) => b.distance - a.distance).slice(0, 8);

    return {
      labels: sorted.map((item) => item.name),
      datasets: [
        {
          label: `Mileage (${distanceUnit})`,
          data: sorted.map((item) => item.distance.toFixed(1)),
          backgroundColor: '#2196f3',
          borderRadius: 6,
        },
      ],
    };
  }, [devices, positions, distanceUnit]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 12,
          padding: 14,
        },
      },
      tooltip: {
        callbacks: {
          label(context) {
            return `${context.parsed.y} ${distanceUnit.toUpperCase()}`;
          },
        },
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  }), [distanceUnit]);

  return <Bar data={data} options={options} />;
};

export default MileageChart;
```

What it does:

It reads odometer/total distance values and displays the top 8 devices by distance.

## 15. Create Average Speed Chart

Create:

```text
src/main/charts/AverageSpeedChart.jsx
```

Add:

```jsx
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { speedFromKnots } from '../../common/util/converter';

const AverageSpeedChart = () => {
  const positions = useSelector((state) => state.session.positions || {});
  const devices = useSelector((state) => state.devices.items || {});
  const speedUnit = 'kmh';

  const data = useMemo(() => {
    const categoryStats = {};

    Object.entries(positions).forEach(([deviceId, position]) => {
      const speed = position.speed || 0;
      const device = devices[deviceId] || {};
      const category = device.category || device.attributes?.category || 'Unknown';
      const convertedSpeed = speedFromKnots(speed, speedUnit);

      if (!categoryStats[category]) {
        categoryStats[category] = { max: 0 };
      }

      categoryStats[category].max = Math.max(categoryStats[category].max, convertedSpeed);
    });

    const chartData = Object.entries(categoryStats)
      .map(([category, stats]) => ({ category, maxSpeed: stats.max }))
      .sort((a, b) => b.maxSpeed - a.maxSpeed)
      .slice(0, 8);

    return {
      labels: chartData.map((item) => item.category),
      datasets: [
        {
          label: `Max speed (${speedUnit.toUpperCase()})`,
          data: chartData.map((item) => item.maxSpeed.toFixed(1)),
          backgroundColor: '#3f51b5',
          borderRadius: 6,
        },
      ],
    };
  }, [positions, devices]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 12,
          padding: 14,
        },
      },
      tooltip: {
        callbacks: {
          label(context) {
            return `${context.parsed.y} KM/H`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Speed (KM/H)' },
      },
    },
  }), []);

  return <Bar data={data} options={options} />;
};

export default AverageSpeedChart;
```

What it does:

It groups live speed data by device category and displays the highest speed per category.

## 16. Create Events Chart

Create:

```text
src/main/charts/EventsChart.jsx
```

Add:

```jsx
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const EventsChart = () => {
  const events = useSelector((state) => state.events.items || []);

  const data = useMemo(() => {
    const counts = {
      overspeed: 0,
      geofenceEnter: 0,
      geofenceExit: 0,
      harshBraking: 0,
      harshAcceleration: 0,
    };

    events.forEach((event) => {
      const key = event.type;
      if (counts[key] !== undefined) {
        counts[key] += 1;
      }
    });

    return {
      labels: Object.keys(counts),
      datasets: [
        {
          label: 'Event count',
          data: Object.values(counts),
          backgroundColor: ['#f44336', '#2196f3', '#ff9800', '#9c27b0', '#4caf50'],
          borderRadius: 6,
        },
      ],
    };
  }, [events]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 12,
          padding: 14,
        },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0 } },
    },
  }), []);

  return <Bar data={data} options={options} />;
};

export default EventsChart;
```

What it does:

It counts recent events already available in Redux.

## 17. Create Top Speed Chart

Create:

```text
src/main/charts/TopSpeedChart.jsx
```

Add:

```jsx
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { speedFromKnots } from '../../common/util/converter';

const TopSpeedChart = () => {
  const positions = useSelector((state) => state.session.positions || {});
  const devices = useSelector((state) => state.devices.items || {});

  const data = useMemo(() => {
    const speeds = Object.entries(positions)
      .map(([deviceId, position]) => ({
        deviceId,
        name: devices[deviceId]?.name || `Device ${deviceId}`,
        speed: speedFromKnots(position.speed || 0, 'kmh'),
      }))
      .sort((a, b) => b.speed - a.speed)
      .slice(0, 8);

    return {
      labels: speeds.map((item) => item.name),
      datasets: [
        {
          label: 'Speed (KM/H)',
          data: speeds.map((item) => item.speed.toFixed(1)),
          backgroundColor: '#f44336',
          borderRadius: 6,
        },
      ],
    };
  }, [positions, devices]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 12,
          padding: 14,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Speed (KM/H)' },
      },
    },
  }), []);

  return <Bar data={data} options={options} />;
};

export default TopSpeedChart;
```

What it does:

It shows the 8 devices with the highest current reported speed.

## 18. Create Reports Per Day Chart

Create:

```text
src/main/charts/ReportsPerDayChart.jsx
```

Add:

```jsx
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const ReportsPerDayChart = () => {
  const events = useSelector((state) => state.events.items || []);

  const data = useMemo(() => {
    const labels = Array.from({ length: 7 }, (_, index) =>
      dayjs().subtract(6 - index, 'day').format('YYYY-MM-DD'),
    );

    const counts = labels.reduce((acc, label) => ({ ...acc, [label]: 0 }), {});

    events.forEach((event) => {
      const timestamp = event.serverTime || event.deviceTime || event.time;
      const day = timestamp ? dayjs(timestamp).format('YYYY-MM-DD') : null;
      if (day && counts[day] !== undefined) {
        counts[day] += 1;
      }
    });

    return {
      labels,
      datasets: [
        {
          label: 'Reports per day',
          data: labels.map((day) => counts[day]),
          backgroundColor: '#4caf50',
          borderRadius: 6,
        },
      ],
    };
  }, [events]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 12,
          padding: 14,
        },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0 } },
    },
  }), []);

  return <Bar data={data} options={options} />;
};

export default ReportsPerDayChart;
```

What it does:

It groups recent events by day for the last 7 days.

## 19. Add Dashboard Route

Edit:

```text
src/Navigation.jsx
```

Near the top of the file, add this import with the other page imports:

```jsx
import Dashboard from './main/Dashboard';
```

Then find the reports route block:

```jsx
<Route path="reports">
```

Inside that block, add the dashboard route before the other report pages:

```jsx
<Route path="dashboard" element={<Dashboard />} />
```

The final block should include:

```jsx
<Route path="reports">
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="combined" element={<CombinedReportPage />} />
  <Route path="chart" element={<ChartReportPage />} />
  <Route path="events" element={<EventReportPage />} />
</Route>
```

Why this is needed:

React Router uses this route to display `Dashboard.jsx` when the user visits `/reports/dashboard`.

## 20. Add Dashboard Menu Item

Edit:

```text
src/reports/components/ReportsMenu.jsx
```

Add this import near the other icon imports:

```jsx
import DashboardIcon from '@mui/icons-material/Dashboard';
```

Inside the first `<List>`, add this before the existing report menu items:

```jsx
<MenuItem
  title={t('reportDashboard')}
  link={buildLink('/reports/dashboard')}
  icon={<DashboardIcon />}
  selected={location.pathname === '/reports/dashboard'}
/>
```

Why this is needed:

This makes the Dashboard visible in the Reports sidebar.

## 21. Add Dashboard Translation

Edit:

```text
src/resources/l10n/en.json
```

Add this key near the other report labels:

```json
"reportDashboard": "Dashboard"
```

Example placement:

```json
"reportChart": "Chart",
"reportDashboard": "Dashboard",
"reportCombined": "Combined"
```

Why this is needed:

The menu calls `t('reportDashboard')`. Without the translation key, the label may display incorrectly.

Optional localization:

If your project supports other languages, add `reportDashboard` to the other files in:

```text
src/resources/l10n
```

## 22. Add Dashboard Toggles To User Page

Edit:

```text
src/settings/UserPage.jsx
```

This page is used by admins/managers to edit users.

Near the top of the file, after the imports and before `const UserPage = () => {`, add:

```jsx
const chartToggleOptions = [
  { key: 'totalDevices', label: 'Total Devices Chart' },
  { key: 'totalUsers', label: 'Total Users Chart' },
  { key: 'chartOnlineStatus', label: 'Online vs Offline Chart' },
  { key: 'chartActiveDevices', label: 'Active Devices (24h) Chart' },
  { key: 'chartDevicesByCategory', label: 'Devices by Category Chart' },
  { key: 'chartDevicesByProtocol', label: 'Devices by Protocol Chart' },
  { key: 'chartIdleVsMovement', label: 'Movement vs Idle Chart' },
  { key: 'chartMileage', label: 'Daily Mileage Chart' },
  { key: 'chartAverageSpeed', label: 'Average Speed Chart' },
  { key: 'chartEvents', label: 'Active Alarms / Events Chart' },
  { key: 'chartTopSpeed', label: 'Top Speeding Instances Chart' },
  { key: 'chartReportsPerDay', label: 'Position Reports Per Day Chart' },
];
```

Make sure these Material UI imports are present:

```jsx
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
```

Then add this accordion inside the user edit form, near other user attribute/preferences accordions:

```jsx
<Accordion>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography variant="subtitle1">{t('reportDashboard')}</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <FormGroup>
      {chartToggleOptions.map((option) => (
        <FormControlLabel
          key={option.key}
          control={
            <Checkbox
              checked={item.attributes?.[option.key] !== 'false'}
              onChange={(event) =>
                setItem({
                  ...item,
                  attributes: {
                    ...item.attributes,
                    [option.key]: event.target.checked ? 'true' : 'false',
                  },
                })
              }
            />
          }
          label={option.label}
        />
      ))}
    </FormGroup>
  </AccordionDetails>
</Accordion>
```

Why this is needed:

This lets an admin configure which dashboard cards a user can see.

Important key consistency note:

The keys here must match `Dashboard.jsx`. If the dashboard checks `totalDevices`, this page must save `totalDevices`, not `chartTotalDevices`.

## 23. Add Dashboard Toggles To Preferences Page

Edit:

```text
src/settings/PreferencesPage.jsx
```

This page lets the current user control their own preferences.

Find the part of the page that renders preference accordions. Add this accordion near the other preferences sections:

```jsx
<Accordion>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography variant="subtitle1">{t('reportDashboard')}</Typography>
  </AccordionSummary>
  <AccordionDetails className={classes.details}>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={attributes.totalDevices !== 'false'}
            onChange={(event) =>
              setAttributes({
                ...attributes,
                totalDevices: event.target.checked ? 'true' : 'false',
              })
            }
          />
        }
        label="Total Devices Chart"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={attributes.totalUsers !== 'false'}
            onChange={(event) =>
              setAttributes({
                ...attributes,
                totalUsers: event.target.checked ? 'true' : 'false',
              })
            }
          />
        }
        label="Total Users Chart"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={attributes.chartOnlineStatus !== 'false'}
            onChange={(event) =>
              setAttributes({
                ...attributes,
                chartOnlineStatus: event.target.checked ? 'true' : 'false',
              })
            }
          />
        }
        label="Online vs Offline Chart"
      />
    </FormGroup>
  </AccordionDetails>
</Accordion>
```

Repeat the same checkbox pattern for:

```text
chartActiveDevices
chartDevicesByCategory
chartDevicesByProtocol
chartIdleVsMovement
chartMileage
chartAverageSpeed
chartEvents
chartTopSpeed
chartReportsPerDay
```

Why this is needed:

This lets users hide or show dashboard cards from their own preferences.

## 24. Optional Development API Proxy

Edit:

```text
vite.config.js
```

If your frontend runs on Vite and your Traccar backend runs somewhere else, add or update the `server.proxy` configuration.

Example:

```jsx
server: {
  port: 3000,
  proxy: {
    '/api/socket': {
      target: 'ws://YOUR_TRACCAR_SERVER:8082',
      ws: true,
    },
    '/api': {
      target: 'http://YOUR_TRACCAR_SERVER:8082',
      changeOrigin: true,
    },
  },
},
```

Replace:

```text
YOUR_TRACCAR_SERVER
```

with your Traccar server hostname or IP address.

Why this is useful:

The dashboard calls endpoints such as `/api/users?all=true`. During local development, the proxy forwards those requests to the backend.

## 25. Run The Project

Start the Vite dev server:

```bash
npm run start
```

Open:

```text
http://localhost:3000
```

Log in, then open:

```text
http://localhost:3000/reports/dashboard
```

You can also use the Reports sidebar and click Dashboard.

## 26. Build For Production

Run:

```bash
npm run build
```

This checks that the React app can compile for production.

## 27. Test Checklist

Use this checklist after integration:

- `npm install` completed successfully.
- `npm run start` opens the Vite app.
- `npm run build` completes without errors.
- `/reports/dashboard` opens.
- The Reports sidebar shows Dashboard.
- Total Vehicles displays a count.
- Total Users displays a count for an account with permission to list users.
- Online/offline chart renders.
- Active devices chart renders.
- Category and protocol charts render.
- Event-based charts render when events exist in Redux.
- Preference checkboxes hide and show the matching dashboard cards.
- Browser console has no Chart.js registration error.
- Browser console has no missing import error.

## 28. All Files And Folders Involved

Folders involved:

```text
src
src/main
src/main/charts
src/reports/components
src/resources/l10n
src/settings
```

Files to create:

```text
src/main/Dashboard.jsx
src/main/charts/ActiveDevicesChart.jsx
src/main/charts/AverageSpeedChart.jsx
src/main/charts/DevicesByCategoryChart.jsx
src/main/charts/DevicesByProtocolChart.jsx
src/main/charts/EventsChart.jsx
src/main/charts/IdleVsMovementChart.jsx
src/main/charts/MileageChart.jsx
src/main/charts/OnlineStatusChart.jsx
src/main/charts/ReportsPerDayChart.jsx
src/main/charts/TopSpeedChart.jsx
src/main/charts/TotalDevices.jsx
src/main/charts/TotalUsers.jsx
```

Files to edit:

```text
package.json
package-lock.json
src/index.jsx
src/Navigation.jsx
src/reports/components/ReportsMenu.jsx
src/resources/l10n/en.json
src/settings/UserPage.jsx
src/settings/PreferencesPage.jsx
vite.config.js
```

Files used by the dashboard but usually not edited:

```text
src/common/components/PageLayout.jsx
src/common/components/LocalizationProvider.jsx
src/common/util/fetchOrThrow.js
src/common/util/converter.js
src/common/util/preferences.js
src/reports/common/useReportStyles.js
src/store
```

Dependency files affected by installation:

```text
package.json
package-lock.json
node_modules
```

Generated build folder after production build:

```text
build
```

or, depending on Vite configuration:

```text
dist
```

## 29. Dashboard Visibility Keys

These are the final keys used to hide/show cards:

```text
totalDevices
totalUsers
chartOnlineStatus
chartActiveDevices
chartDevicesByCategory
chartDevicesByProtocol
chartIdleVsMovement
chartMileage
chartAverageSpeed
chartEvents
chartTopSpeed
chartReportsPerDay
```

The value must be a string:

```text
'true'
'false'
```

Example user attributes:

```json
{
  "totalDevices": "true",
  "totalUsers": "true",
  "chartOnlineStatus": "false"
}
```

With those attributes:

- Total Devices shows.
- Total Users shows.
- Online vs Offline is hidden.

## 30. Beginner Troubleshooting

Problem: `/reports/dashboard` shows a blank page.

Check:

```text
src/Navigation.jsx
```

Make sure this route exists:

```jsx
<Route path="dashboard" element={<Dashboard />} />
```

Problem: the Dashboard menu item is missing.

Check:

```text
src/reports/components/ReportsMenu.jsx
```

Make sure the `MenuItem` for `/reports/dashboard` was added.

Problem: charts do not render.

Check:

```text
src/index.jsx
```

Make sure this is the first import:

```jsx
import 'chart.js/auto';
```

Problem: Total Users shows `0`.

Check:

- the logged-in user has permission to call `/api/users?all=true`
- the backend API is reachable
- the Vite proxy is configured during local development

Problem: a toggle does not hide a chart.

Check:

- the key in `Dashboard.jsx`
- the key in `UserPage.jsx`
- the key in `PreferencesPage.jsx`

All three must match exactly.

Example:

```text
totalDevices
```

is not the same as:

```text
chartTotalDevices
```

## 31. Integration Package Zip

This repository includes a zip package for easy copying:

```text
DashboardIntegrationFiles.zip
```

The zip contains:

```text
DashboardIntegrationGuide.md
src/main/Dashboard.jsx
src/main/charts/*.jsx
```

Use the guide for the files that must be edited manually:

```text
src/index.jsx
src/Navigation.jsx
src/reports/components/ReportsMenu.jsx
src/resources/l10n/en.json
src/settings/UserPage.jsx
src/settings/PreferencesPage.jsx
vite.config.js
package.json
```
