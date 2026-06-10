import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

/*
Shows device distribution by Traccar protocol type.
This helps surface protocol diversity and unsupported device families.
*/

const DevicesByProtocolChart = () => {
  const devices = useSelector((state) => state.devices.items || {});
  const positions = useSelector((state) => state.session.positions || {});

  const normalizeProtocol = (value) => {
    if (!value) {
      return null;
    }

    const raw = String(value).trim().toLowerCase();
    if (!raw) {
      return null;
    }

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
      [/^gt\d+/, 'GT06'],
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

    return value.trim();
  };

  const getDeviceProtocol = (device) => {
    const position = positions[device.id] || {};
    const protocolValue = position.protocol || device.protocol;
    const normalizedProtocol = normalizeProtocol(protocolValue);
    if (normalizedProtocol) {
      return normalizedProtocol;
    }

    const source = [device.model, device.name, device.uniqueId]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    if (!source) {
      return 'Unknown';
    }

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
          backgroundColor: [
            '#2196f3',
            '#ffca28',
            '#9c27b0',
            '#4caf50',
            '#ff5722',
            '#607d8b',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [devices]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 12,
            padding: 14,
          },
        },
      },
    }),
    [],
  );

  return <Doughnut data={data} options={options} />;
};

export default DevicesByProtocolChart;