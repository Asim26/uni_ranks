import React from 'react';
import { authRoles } from 'app/auth';

const LocationsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: '/admin/locations',
			component: React.lazy(() => import('./Locations'))
		}
	]
};

export default LocationsConfig;
