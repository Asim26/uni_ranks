import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect, useRef } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import jwtService from 'app/services/jwtService';
import * as base from 'app/env';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '90vw',
		height: '90vh',
		overflowY: 'auto',
		border: 0,
		borderRadius: '8px',
		boxShadow: theme.shadows[5],
		margin: 'auto',
	},
	button: {
		width: 200,
		background: '#505050',
		color: '#fff',
		'&:hover': {
			background: '#303030',
			color: '#fff'
		}
	},
	form_button: {
		background: '#505050',
		color: '#fff',
		'&:hover': {
			background: '#303030',
			color: '#fff'
		}
	},
	logo: {
		width: 89,
		height: 89,
		margin: '0 1.2rem 1.2rem 0'
	},
	message: {
		color: '#fff',
		backgroundColor: '#1E2125',
		position: 'absolute',
		left: 0,
		top: '-95vh'
	},
	logo_upload: {
		width: '100%'
	},
	logo_button: {
		width: 'auto',
		background: '#505050',
		color: '#fff',
		textTransform: 'none',
		'&:hover': {
			background: '#303030',
			color: '#fff',
			textTransform: 'none'
		}
	},
	paper: {
		outline: 'none',
		backgroundColor: '#f7f7f7'
	},
	modalTitle: {
		position: 'absolute',
		top: 0
	},
	formTweak: {
		overflowY: 'auto',
		marginTop: '19rem'
	}
}));

export default function Profile() {
	const [message, setMessage] = useState(false);
	const [editing, setEditing] = useState(false);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [logo, setLogo] = useState();
	const [phone, setPhone] = useState();
	const [contact, setContact] = useState();
	const [contactEmail, setContactEmail] = useState();
	const [address, setAddress] = useState();

	const api = base.api;

	const id = jwtService.getUserId();

	useEffect(() => {
		// eslint-disable-next-line
		fetch(api + 'user/get?id=' + id).then(res => res.json()).then(results => { results.map(row => {
			setLogo(row.logo);
			setEmail(row.email);
			setName(row.name);
		})});
	});

	useEffect(() => {
		fetch(api + 'schools?userId=' + id).then(res => res.json()).then(results => {
			setPhone(results[0]['phone']);
			setAddress(results[0]['address']);
			setContact(results[0]['contact']);
			setContactEmail(results[0]['contactEmail']);
		});
	});

	const	handleUpload = (e) => {
		const file = e.target.files[0];
		if (!file) { return; }

		const reader = new FileReader();

		reader.readAsText(file);

		reader.onload = () => {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("id", id);
			fetch(api + 'updateLogo', { method: 'PUT', body: formData }).then(res => res.text())
		};

		reader.onerror = function () {};
	};

	const hideMessage = () => {
		setMessage(false);
	};

	const handleEditing = () => {
		setEditing(true);
	};

	const handleClose = () => {
		setEditing(false);
	};

	const formRef = useRef(null);

	function handleSubmit(model) {
		fetch(api + 'updateSchoolPr', { method: 'PUT', body: '{"id": "' + id + '", "name": "' + model.name + '", "pass": "' + model.password + '", "phone": "' + model.phone + '", "email": "' + model.email + '", "contact": "' + model.contact + '", "contactEmail": "' + model.contactEmail + '", "address": "' + model.address + '"}', headers: { 'Content-Type': 'application/json' } }).then(res => res.text());

		setMessage(true);
		setEditing(false);
	}

	const classes = useStyles();

	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-24 border-b-1'
			}}
			header={
				<div className="pt-48 px-24 w-full flex">
					{message &&
						<Snackbar
							open={true}
							onClose={hideMessage}
							ContentProps={{
								variant: 'body2',
								headlineMapping: {
									body1: 'div',
									body2: 'div'
								}
							}}
						>
							<SnackbarContent
								className={classes.message}
								message={
									<div className="flex items-center">
										<Typography className="mx-8">Profile changes saved.</Typography>
									</div>
								}
								action={[
									<IconButton
										key="close"
										aria-label="Close"
										color="inherit"
										onClick={hideMessage}
									>
										<Icon>close</Icon>
									</IconButton>
								]}
							/>
						</Snackbar>
					}
					<div className="w-full">
						<h1 className="text-48">Welcome, {name}</h1>
					</div>
					<div className="pt-48">
						<Button type="button" className={clsx(classes.button, 'normal-case')} variant="contained" onClick={handleEditing}>
							Edit Profile
						</Button>
					</div>
				</div>
			}
			content={
				<div className="p-24">
					{editing &&
						<Modal className={classes.modal} open={true} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
							<Fade in={true}>
								<Paper className={clsx(classes.paper, 'w-full')}>
									<Typography className={clsx(classes.modalTitle, 'mx-auto py-16 text-center block w-full text-32 border-b-1')}>Edit Profile</Typography>
									<Formsy onValidSubmit={handleSubmit} ref={formRef} className={clsx(classes.formTweak, 'flex flex-col justify-center w-full p-16')}>
										<div className="flex">
											<img src={logo} alt="School's Logo" className={classes.logo} />
											<input accept="image/*" className="hidden" id="button-file" type="file" onChange={handleUpload} />
											<label htmlFor="button-file" className={classes.logo_upload}>
												<Button variant="contained" className={classes.logo_button} component="span">
													<Icon>add_photo_alternate</Icon>
												</Button>
											</label>
										</div>

										<TextFieldFormsy
											className={clsx(classes.input, 'mb-16')}
											type="text"
											name="name"
											label="School's Name"
											value={name}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															person
														</Icon>
													</InputAdornment>
												)
											}}
											variant="filled"
											required
										/>

										<TextFieldFormsy
											className={clsx(classes.input, 'mb-16')}
											type="text"
											name="phone"
											label="Phone"
											value={phone}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															phone_android
														</Icon>
													</InputAdornment>
												)
											}}
											variant="filled"
											required
										/>

										<TextFieldFormsy
											className={clsx(classes.input, 'mb-16')}
											type="text"
											name="address"
											label="Address"
											value={address}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															edit_location
														</Icon>
													</InputAdornment>
												)
											}}
											variant="filled"
											required
										/>

										<TextFieldFormsy
											className={clsx(classes.input, 'mb-16')}
											type="email"
											name="email"
											value={email}
											label="Email"
											validations="isEmail"
											validationErrors={{
												isEmail: 'Please enter a valid email'
											}}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															email
														</Icon>
													</InputAdornment>
												)
											}}
											variant="filled"
											required
										/>

										<TextFieldFormsy
											className={clsx(classes.input, 'mb-16')}
											type="text"
											name="contact"
											value={contact}
											label="Contact Person"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															cake
														</Icon>
													</InputAdornment>
												)
											}}
											variant="filled"
											required
										/>

										<TextFieldFormsy
											className={clsx(classes.input, 'mb-16')}
											type="email"
											name="contactEmail"
											value={contactEmail}
											label="Contact Email"
											validations="isEmail"
											validationErrors={{
												isEmail: 'Please enter a valid email'
											}}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															email
														</Icon>
													</InputAdornment>
												)
											}}
											variant="filled"
											required
										/>

										<TextFieldFormsy
											className={clsx(classes.input, 'mb-16')}
											type="password"
											name="password"
											label="Password"
											validations="equalsField:password-confirm"
											validationErrors={{
												equalsField: 'Passwords do not match'
											}}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															vpn_key
														</Icon>
													</InputAdornment>
												)
											}}
											variant="filled"
											required
										/>

										<TextFieldFormsy
											className={clsx(classes.input, 'mb-16')}
											type="password"
											name="password-confirm"
											label="Confirm Password"
											validations="equalsField:password"
											validationErrors={{
												equalsField: 'Passwords do not match'
											}}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															vpn_key
														</Icon>
													</InputAdornment>
												)
											}}
											variant="filled"
											required
										/>

										<Button type="submit" variant="contained" className={clsx(classes.form_button, 'w-full mx-auto mt-16 normal-case')} aria-label="Apply">
											Apply Changes
										</Button>
									</Formsy>
								</Paper>
							</Fade>
						</Modal>
					}
					<div className="md:flex w-full">
						<div className="flex flex-col flex-1">
							<FuseAnimateGroup
								enter={{
									animation: 'transition.slideUpBigIn'
								}}
							>
								<Card className="w-full mb-16">
									<AppBar position="static" elevation={0}>
										<Toolbar className="px-8">
											<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
												General Information
											</Typography>
										</Toolbar>
									</AppBar>

									<CardContent>
										<div className="mb-24">
											<img src={logo} alt="Logo" className={classes.logo} />
											<Typography className="text-15"><b>Name: </b>{name}</Typography>
										</div>

										<Typography className="mb-24 text-15"><b>Email: </b>{email}</Typography>
										<Typography className="mb-24 text-15"><b>Phone: </b>{phone}</Typography>
										<Typography className="mb-24 text-15"><b>Contact Person: </b>{contact}</Typography>
										<Typography className="mb-24 text-15"><b>Contact Email: </b>{contactEmail}</Typography>
										<Typography className="mb-24 text-15"><b>Address: </b>{address}</Typography>
									</CardContent>
								</Card>
							</FuseAnimateGroup>
						</div>
					</div>
				</div>
			}
		/>
	);
}
