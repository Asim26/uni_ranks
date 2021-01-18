import React, { useState, Fragment } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { InputLabel, MenuItem, FormControl, Select, Icon, Typography } from '@material-ui/core';
import Schools from './components/Schools';

export default function Institutions() {
	const [institution, setInstitution] = useState(10);

	const handleChange = (event) => {
		setInstitution(event.target.value);
	};

	return (
		<FusePageSimple
			classes={{ toolbar: 'px-24 border-b-1' }}
			header={
				<div className="page_header flex flex-1 items-center justify-between p-24">
					<div className="flex flex-col">
						<div className="flex items-center mb-16">
							<Icon className="text-18" color="action">home</Icon>
							<Icon className="text-16" color="action">chevron_right</Icon>
							<Typography color="textSecondary">Management</Typography>
							<Icon className="text-16" color="action">chevron_right</Icon>
							<Typography color="textSecondary">Institutions Control</Typography>
						</div>
						<Typography variant="h3">Institutions Control</Typography>
					</div>
				</div>
			}
			content={
				<Fragment>
					<div className="header_table_selector">
		        <FormControl variant="filled">
							<InputLabel id="institutions-label">Institution</InputLabel>
              <Select labelId="institutions-label" value={institution} onChange={handleChange} label="Role" className="selector">
		            <MenuItem value={10}>School</MenuItem>
		            <MenuItem value={20}>Univeristy</MenuItem>
		            <MenuItem value={30}>Agency</MenuItem>
		            <MenuItem value={40}>Training Center</MenuItem>
		            <MenuItem value={50}>Company</MenuItem>
		          </Select>
		        </FormControl>
		      </div>
					<div className="p-24">
						{institution === 10 &&
							<FuseAnimateGroup enter={{ animation: "transition.slideLeftBigIn", 	stagger: 100, duration: 400, delay: 100 }} leave={{ animation: "transition.slideRightBigOut", stagger: 100, duration: 400, delay: 100 }}>
								<Schools />
							</FuseAnimateGroup>
						}
					</div>
				</Fragment>
			}
			innerScroll
		/>
	);
}
