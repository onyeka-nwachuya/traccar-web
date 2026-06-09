import React, { useEffect, useState } from "react";
import fetchOrThrow from "../../common/util/fetchOrThrow";
import PeopleIcon from '@mui/icons-material/People';

/*
Displays only the total number of users with a left-side users icon.
*/

const TotalUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        // Request all users to get an accurate total
        const response = await fetchOrThrow(
          "/api/users?all=true",
          { signal: controller.signal },
        );
        setUsers(await response.json());
      } catch (err) {
        if (controller.signal.aborted) return;
        setUsers([]);
      }
    };

    loadUsers();
    return () => controller.abort();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ display: "`flex`", alignItems: "center", gap: 12, fontSize: 50, fontWeight: 700, color: "#333" }}>
          <div><PeopleIcon fontSize="inherit" /></div>
          <div>{users.length}</div>
        </div>
      </div>
    </div>
  );
};

export default TotalUsers;
