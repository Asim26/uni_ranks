import React from 'react';
import { authRoles } from 'app/auth';

const InstitutionsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: '/admin/institutions',
			component: React.lazy(() => import('./Institutions'))
		}
	]
};

export default InstitutionsConfig;
