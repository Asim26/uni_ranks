import React from 'react';
import FuseUtils from '@fuse/utils';
import { Redirect } from 'react-router-dom';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import RegisterConfig from 'app/main/register/RegisterConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import adminConfigs from 'app/main/admin/adminConfigs';
import universityConfigs from 'app/main/university/universityConfigs';
import schoolConfigs from 'app/main/school/schoolConfigs';
import counselorConfigs from 'app/main/counselor/counselorConfigs';
import repsConfigs from 'app/main/reps/repsConfigs';

const routeConfigs = [
	LogoutConfig,
	LoginConfig,
	RegisterConfig,
	...pagesConfigs,
	...adminConfigs,
	...schoolConfigs,
	...repsConfigs,
	...counselorConfigs,
	...universityConfigs
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'university', 'representative', 'school', 'counselor']),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/pages/maintenance" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
