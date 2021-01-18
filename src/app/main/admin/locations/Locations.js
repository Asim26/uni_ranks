import React, { useState } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Icon, Typography, Tab, Tabs } from '@material-ui/core';
import Continents from './components/Continents';
import SubContinents from './components/SubContinents';
import Countries from './components/Countries';
import Regions from './components/Regions';
import Cities from './components/Cities';

export default function Locations() {
	const [selectedTab, setSelectedTab] = useState(0);

	const handleTabChange = (event, value) => {
		setSelectedTab(value);
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
							<Typography color="textSecondary">Locations Control</Typography>
						</div>
						<Typography variant="h3">Locations Control</Typography>
					</div>
				</div>
			}
			contentToolbar={
				<Tabs
					value={selectedTab}
					onChange={handleTabChange}
					indicatorColor="primary"
					textColor="primary"
					className="w-full"
				>
					<Tab className="normal-case" label="Continents" />
					<Tab className="normal-case" label="Sub Continents" />
					<Tab className="normal-case" label="Countries" />
					<Tab className="normal-case" label="Regions" />
					<Tab className="normal-case" label="Cities" />
				</Tabs>
			}
			content={
				<div className="p-24">
					{selectedTab === 0 && (
						<FuseAnimateGroup enter={{ animation: "transition.slideLeftBigIn", 	stagger: 100, duration: 400, delay: 100 }} leave={{ animation: "transition.slideRightBigOut", stagger: 100, duration: 400, delay: 100 }}>
							<Continents />
						</FuseAnimateGroup>
					)}
					{selectedTab === 1 && (
						<FuseAnimateGroup enter={{ animation: "transition.slideLeftBigIn", 	stagger: 100, duration: 400, delay: 100 }} leave={{ animation: "transition.slideRightBigOut", stagger: 100, duration: 400, delay: 100 }}>
							<SubContinents />
						</FuseAnimateGroup>
					)}
					{selectedTab === 2 && (
						<FuseAnimateGroup enter={{ animation: "transition.slideLeftBigIn", 	stagger: 100, duration: 400, delay: 100 }} leave={{ animation: "transition.slideRightBigOut", stagger: 100, duration: 400, delay: 100 }}>
							<Countries />
						</FuseAnimateGroup>
					)}
					{selectedTab === 3 && (
						<FuseAnimateGroup enter={{ animation: "transition.slideLeftBigIn", 	stagger: 100, duration: 400, delay: 100 }} leave={{ animation: "transition.slideRightBigOut", stagger: 100, duration: 400, delay: 100 }}>
							<Regions />
						</FuseAnimateGroup>
					)}
					{selectedTab === 4 && (
						<FuseAnimateGroup enter={{ animation: "transition.slideLeftBigIn", 	stagger: 100, duration: 400, delay: 100 }} leave={{ animation: "transition.slideRightBigOut", stagger: 100, duration: 400, delay: 100 }}>
							<Cities />
						</FuseAnimateGroup>
					)}
				</div>
			}
			innerScroll
		/>
	);
}
