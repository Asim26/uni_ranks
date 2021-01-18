import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { ExternalLink } from 'react-external-link';

const useStyles = makeStyles(theme => ({
	root: {
		'& .logo-icon': {
			width: 170,
			height: 'auto',
			transition: theme.transitions.create(['width', 'height'], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		}
	}
}));

export default function Logo() {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root, 'flex items-center')}>
			{/*<ExternalLink href="http://localhost/quantum/uniranks/testing" target="_self">*/}
			<ExternalLink href="https://uniranks.com/testing" target="_self">
				<img className="logo-icon" src="assets/images/logos/uniranks-menu.png" alt="Logo" />
			</ExternalLink>
		</div>
	);
}
