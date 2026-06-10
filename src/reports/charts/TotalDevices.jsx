import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import CommuteIcon from '@mui/icons-material/Commute';
/*
Displays only the total number of devices with a left-side vehicle icon.
*/

const TotalDevices = () => {
  const devices = useSelector((state) => state.devices.items || {});

  const totalDevices = useMemo(() => Object.values(devices).length, [devices]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ display: "`flex`", alignItems: "center", gap: 12, fontSize: 50, fontWeight: 700, color: "#333" }}>
          <div><CommuteIcon fontSize="inherit" /></div>
          <div>{totalDevices}</div>
        </div>
      </div>
    </div>
  );
};

export default TotalDevices;
