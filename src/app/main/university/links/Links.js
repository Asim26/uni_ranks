import React from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import LinksTable from './LinksTable';
import { Icon, Typography } from '@material-ui/core';

export default function Links() {
	return (
		<FusePageSimple
			classes={{ toolbar: 'px-24 border-b-1' }}
			header={
				<div className="page_header flex flex-1 items-center justify-between p-24">
					<div className="flex flex-col">
						<div className="flex items-center mb-16">
							<Icon className="text-18" color="action">home</Icon>
							<Icon className="text-16" color="action">chevron_right</Icon>
							<Typography color="textSecondary">Booth Setup</Typography>
							<Icon className="text-16" color="action">chevron_right</Icon>
							<Typography color="textSecondary">Menu Setup</Typography>
						</div>
						<Typography variant="h3">Menu Items Setup</Typography>
					</div>
				</div>
			}
			content={
				<div className="p-24">
					<FuseAnimateGroup enter={{ animation: "transition.slideLeftBigIn", 	stagger: 100, duration: 400, delay: 100 }} leave={{ animation: "transition.slideRightBigOut", stagger: 100, duration: 400, delay: 100 }}>
						<LinksTable />
					</FuseAnimateGroup>
				</div>
			}
			innerScroll
		/>
	);
}
