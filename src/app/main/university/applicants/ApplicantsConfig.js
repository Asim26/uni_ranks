import React from 'react';
import { authRoles } from 'app/auth';

const ApplicantsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.university,
	routes: [
		{
			path: '/university/applicants',
			component: React.lazy(() => import('./Applicants'))
		}
	]
};

export default ApplicantsConfig;
