import { authRoles } from 'app/auth';
// import i18next from 'i18next';
// import ar from './navigation-i18n/ar';
// import en from './navigation-i18n/en';
// import tr from './navigation-i18n/tr';

// i18next.addResourceBundle('en', 'navigation', en);
// i18next.addResourceBundle('tr', 'navigation', tr);
// i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'management',
		title: 'System Management',
		auth: authRoles.admin,
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'accounts',
				title: 'Accounts',
				auth: authRoles.admin,
				type: 'item',
				icon: 'account_circle',
				url: '/admin/accounts'
			},
			{
				id: 'locations',
				title: 'Locations',
				auth: authRoles.admin,
				type: 'item',
				icon: 'map',
				url: '/admin/locations'
			},
			{
				id: 'programs',
				title: 'Programs',
				auth: authRoles.admin,
				type: 'item',
				icon: 'library_books',
				url: '/admin/programs'
			},
			{
				id: 'institutions',
				title: 'Institutions',
				auth: authRoles.admin,
				type: 'item',
				icon: 'location_city',
				url: '/admin/institutions'
			},
			{
				id: 'languages',
				title: 'Languages',
				auth: authRoles.admin,
				type: 'item',
				icon: 'translate',
				url: '/admin/languages'
			},
			{
				id: 'currencies',
				title: 'Currencies',
				auth: authRoles.admin,
				type: 'item',
				icon: 'monetization_on',
				url: '/admin/currencies'
			}
		]
	},
	{
		id: 'university-general',
		title: 'General Information',
		auth: authRoles.university,
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'info',
				title: 'Information',
				auth: authRoles.university,
				type: 'item',
				icon: 'playlist_add_check',
				url: '/university/info'
			},
			{
				id: 'programs',
				title: 'Programs',
				auth: authRoles.university,
				type: 'item',
				icon: 'add_to_photos',
				url: '/university/programs'
			},
			{
				id: 'materials',
				title: 'Documents / Video',
				auth: authRoles.university,
				type: 'item',
				icon: 'video_library',
				url: '/university/materials'
			},
			{
				id: 'representative',
				title: 'Representatives',
				auth: authRoles.university,
				type: 'item',
				icon: 'supervised_user_circle',
				url: '/university/users'
			},
			{
				id: 'applicants',
				title: 'Applicants',
				auth: authRoles.university,
				type: 'item',
				icon: 'account_box',
				url: '/university/applicants'
			},
			{
				id: 'reports',
				title: 'Statistics',
				auth: authRoles.university,
				type: 'item',
				icon: 'bar_chart',
				url: '/university/stats'
			},
			{
				id: 'schools',
				title: 'Schools List',
				auth: authRoles.university,
				type: 'item',
				icon: 'school',
				url: '/university/schools'
			},
			{
				id: 'fairs',
				title: 'Fairs List',
				auth: authRoles.university,
				type: 'item',
				icon: 'art_track',
				url: '/university/fairs'
			},
			{
				id: 'university-webinars',
				title: 'Webinars',
				auth: authRoles.university,
				type: 'item',
				icon: 'cast_for_education',
				url: '/university/webinars'
			},
			{
				id: 'university-workshops',
				title: 'Workshops',
				auth: authRoles.university,
				type: 'item',
				icon: 'dvr',
				url: '/university/workshops'
			}
		]
	},
	{
		id: 'booth-setup',
		title: 'Booth Setup',
		auth: authRoles.university,
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'booth-layout',
				title: 'Layout',
				auth: authRoles.university,
				type: 'item',
				icon: 'cached',
				url: '/university/layout'
			},
			{
				id: 'booth-colors',
				title: 'Colors',
				auth: authRoles.university,
				type: 'item',
				icon: 'color_lens',
				url: '/university/colors'
			},
			{
				id: 'booth-graphics',
				title: 'Graphics',
				auth: authRoles.university,
				type: 'item',
				icon: 'image',
				url: '/university/graphics'
			},
			{
				id: 'booth-content',
				title: 'Menu Setup',
				auth: authRoles.university,
				type: 'item',
				icon: 'link',
				url: '/university/links'
			},
			{
				id: 'booth-publish',
				title: 'Review / Publish',
				auth: authRoles.university,
				type: 'item',
				icon: 'youtube_searched_for',
				url: '/university/publish'
			}
		]
	}
];

export default navigationConfig;
