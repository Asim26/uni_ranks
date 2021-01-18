import React from 'react';
import { authRoles } from 'app/auth';

const LanguagesConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: '/admin/languages',
			component: React.lazy(() => import('./Languages'))
		}
	]
};

export default LanguagesConfig;
