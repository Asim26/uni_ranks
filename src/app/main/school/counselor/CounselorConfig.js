import React from 'react';
import { authRoles } from 'app/auth';

const CounselorConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.school,
	routes: [
		{
			path: '/school/users',
			component: React.lazy(() => import('./Counselor'))
		}
	]
};

export default CounselorConfig;
