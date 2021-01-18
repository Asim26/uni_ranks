import React, { useState, Fragment } from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import SuperAdmin from '../roles/SuperAdmin';

export default function RoleChooser() {
  const [role, setRole] = useState(10);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Fragment>
      <div className="header_table_selector">
        <FormControl variant="filled">
          <InputLabel id="roles-label">Role</InputLabel>
          <Select labelId="roles-label" value={role} onChange={handleChange} label="Role" className="selector">
            <MenuItem value={10}>Super Admin</MenuItem>
            <MenuItem value={20}>Univeristy Admin</MenuItem>
            <MenuItem value={30}>School Admin</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="table_render">
        {role === 10 &&
          <SuperAdmin />
        }
      </div>
    </Fragment>
  );
}
