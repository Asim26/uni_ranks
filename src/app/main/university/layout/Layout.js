import React, { useState, useEffect, Fragment } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Link } from 'react-router-dom';
import { Icon, IconButton, Button, Typography, Snackbar, SnackbarContent, makeStyles } from '@material-ui/core';
import jwtService from 'app/services/jwtService';
import clsx from 'clsx';
import * as base from 'app/env';

const useStyles = makeStyles((theme) => ({
	booth_image: {
		width: '100%',
		height: 'auto',
		padding: '1rem',
		cursor: 'pointer',
		border: '3px dashed transparent',
		borderRadius: 34,
		transition: 'border .5s ease'
	},
	link: {
		'&:hover': {
			textDecoration: 'none !important'
		}
	},
	button: {
		width: 100,
		background: '#039be5',
		color: '#fff',
		margin: '0 1.2rem',
		display: 'inline-block',
		textTransform: 'none',
		'&:hover': {
			background: '#039be5',
			color: '#fff'
		}
	},
	border_around: {
		border: '3px dashed #7e7e7e',
		borderRadius: 34
	},
	message: {
	  color: '#fff',
	  backgroundColor: '#1E2125',
	  position: 'absolute',
		left: 0,
	  top: '-95vh'
	},
	warning: {
	  color: '#fff',
	  backgroundColor: '#f44336',
	  position: 'absolute',
		left: 0,
	  top: '-95vh'
	}
}));

export default function Layout() {
	const classes = useStyles();
	const [message, setMessage] = useState(false);
	const [warning, setWarning] = useState(false);
	const [warningState, setWarningState] = useState(false);
	const [error, setError] = useState(false);
	const [previous, setPrevious] = useState('0');
	const [selected, setSelected] = useState('0');
	const [saved, setSaved] = useState(false);
	const [notSaved, setNotSaved] = useState(false);

	const api = base.api;

	const url1 = 'assets/images/fair/booths/1/1.png';
	const url2 = 'assets/images/fair/booths/2/1.png';
	const url3 = 'assets/images/fair/booths/3/1.png';
	const url4 = 'assets/images/fair/booths/4/1.png';

	const id = jwtService.getUserId();

	useEffect(() => {
		// eslint-disable-next-line
		fetch(api + 'booth/get?id=' + id).then(res => res.json()).then(results => { results.map(row => {
			setPrevious(row.layout);
		})});
  });

  const handleChange = (event) => {
		setSelected(event.target.alt);
	};

	const handleSubmit = () => {
		if (previous !== selected  && previous !== '0') {
			if (!warningState) {
				setWarningState(true);
				setWarning(true);
			} else {
				fetch(api + 'booth/layout/set', { method: 'PUT', body: '{"id": "' + id + '", "layout": "' + selected + '"}', headers: { 'Content-Type': 'application/json' } }).then(res => res.text())
				fetch(api + 'booth/graphics/reset', { method: 'PUT', body: '{"id": "' + id + '"}', headers: { 'Content-Type': 'application/json' } }).then(res => res.text())
				setMessage(true);
				setSaved(true);
			}
		} else if (selected === '0') {
			setError(true);
		} else if (selected !== '0') {
			fetch(api + 'booth/layout/set', { method: 'PUT', body: '{"id": "' + id + '", "layout": "' + selected + '"}', headers: { 'Content-Type': 'application/json' } }).then(res => res.text())
			setMessage(true);
			setSaved(true);
		}
	};

	const checkSaved = () => {
		if (!saved) {
			setNotSaved(true);
		}
	};

	const hideMessage = () => {
		setMessage(false);
		setNotSaved(false);
		setWarning(false);
		setError(false);
	};

  return (
    <FusePageSimple
			classes={{ toolbar: 'px-24 border-b-1' }}
      header={
				<Fragment>
					<div className="page_header flex flex-1 items-center justify-between p-24">
						<div className="flex flex-col">
							<div className="flex items-center mb-16">
								<Icon className="text-18" color="action">home</Icon>
								<Icon className="text-16" color="action">chevron_right</Icon>
								<Typography color="textSecondary">Booth Setup</Typography>
								<Icon className="text-16" color="action">chevron_right</Icon>
								<Typography color="textSecondary">Layout</Typography>
							</div>
							<Typography variant="h3">Booth Layout</Typography>
						</div>
					</div>
					{message &&
						<Snackbar	open={true}	onClose={hideMessage}	ContentProps={{	variant: 'body2',	headlineMapping: { body1: 'div', body2: 'div' }	}}>
							<SnackbarContent
								className={classes.message}
								message={
									<div className="flex items-center">
										<Typography className="mx-8">Layout choice saved.</Typography>
									</div>
								}
								action={[
									<IconButton	key="close"	aria-label="Close" color="inherit" onClick={hideMessage}>
										<Icon>close</Icon>
									</IconButton>
								]}
							/>
						</Snackbar>
					}
					{warning &&
						<Snackbar	open={true}	onClose={hideMessage}	ContentProps={{	variant: 'body2',	headlineMapping: { body1: 'div', body2: 'div' }	}}>
							<SnackbarContent
								className={classes.warning}
								message={
									<div className="flex items-center">
										<Typography className="mx-8">Changing Layout will reset your banners. If you still want to do it click Save button again.</Typography>
									</div>
								}
								action={[
									<IconButton	key="close"	aria-label="Close" color="inherit" onClick={hideMessage}>
										<Icon>warning</Icon>
									</IconButton>
								]}
							/>
						</Snackbar>
					}
					{error &&
						<Snackbar	open={true}	onClose={hideMessage}	ContentProps={{	variant: 'body2',	headlineMapping: { body1: 'div', body2: 'div' }	}}>
							<SnackbarContent
								className={classes.warning}
								message={
									<div className="flex items-center">
										<Typography className="mx-8">You haven't selected any layout, please click on your choice.</Typography>
									</div>
								}
								action={[
									<IconButton	key="close"	aria-label="Close" color="inherit" onClick={hideMessage}>
										<Icon>warning</Icon>
									</IconButton>
								]}
							/>
						</Snackbar>
					}
					{notSaved &&
						<Snackbar	open={true}	onClose={hideMessage}	ContentProps={{	variant: 'body2',	headlineMapping: { body1: 'div', body2: 'div' }	}}>
							<SnackbarContent
								className={classes.warning}
								message={
									<div className="flex items-center">
										<Typography className="mx-8">Changes not saved.</Typography>
									</div>
								}
								action={[
									<IconButton	key="close"	aria-label="Close" color="inherit" onClick={hideMessage}>
										<Icon>warning</Icon>
									</IconButton>
								]}
							/>
						</Snackbar>
					}
        </Fragment>
      }
      content={
				<div className="w-full">
					<div className="p-24">
						<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
							<div className="widget flex w-full sm:w-1/2 md:w-1/2 mb-24">
								<img className={clsx(classes.booth_image, (selected === '1') ? classes.border_around : null)} src={url1} onClick={handleChange} alt={1} />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/2 mb-24">
								<img className={clsx(classes.booth_image, (selected === '2') ? classes.border_around : null)} src={url2} onClick={handleChange} alt={2} />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/2 mb-24">
								<img className={clsx(classes.booth_image, (selected === '3') ? classes.border_around : null)} src={url3} onClick={handleChange} alt={3} />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/2 mb-24">
								<img className={clsx(classes.booth_image, (selected === '4') ? classes.border_around : null)} src={url4} onClick={handleChange} alt={4} />
							</div>
						</FuseAnimateGroup>
						<div className="block m-auto text-center">
							<Button type="submit" variant="contained" className={classes.button} onClick={handleSubmit}>
								Save
							</Button>
							<Link className={classes.link} to="/university/colors">
								<Button type="button" variant="contained" className={classes.button} onClick={checkSaved}>
									Next
								</Button>
							</Link>
						</div>
					</div>
				</div>
      }
      innerScroll
    />
  );
}
