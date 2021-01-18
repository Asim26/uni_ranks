import React from 'react';
import { authRoles } from 'app/auth';

const ProfileConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.counselor,
	routes: [
		{
			path: '/counselor/profile',
			component: React.lazy(() => import('./Profile'))
		}
	]
};

export default ProfileConfig;
