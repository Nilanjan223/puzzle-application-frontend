import React, { useEffect, useState } from "react";

import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import "./Admin.css";
// const DUMMY = {

// }

const Admin = () => {
  //   let allUsers;

  //   const allUsers = useRef(null);
  const [loadedUser, setLoadedUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin");
        const responseData = await response.json();
        setLoadedUser(responseData.users);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <h2>
        <LoadingSpinner />
      </h2>
    );
  }
  const adminEmail="admin@test.com";
  //   console.log(loadedUser);
  //   console.log("dt", typeof loadedUser);

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>USER</th>
            <th>STAGE(out of 5)</th>
            <th>HINTS USED</th>
            <th>ACCURACY</th>
          </tr>
        </thead>
        <tbody>
          {loadedUser.map((item) => {
            if(item.email === adminEmail )
            {
                return null;
            }
            return (
              <tr className="active-row">
                <td key={item.email}>{item.email}</td>
                {item.stage === 6 ? <td>COMPLETED</td> : <td>{item.stage}</td>}
                <td>{item.hint}</td>
                <td>{((5 - item.hint) / 5) * 100}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
