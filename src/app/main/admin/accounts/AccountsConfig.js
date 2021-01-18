import React from 'react';
import { authRoles } from 'app/auth';

const AccountsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: '/admin/accounts',
			component: React.lazy(() => import('./Accounts'))
		}
	]
};

export default AccountsConfig;
