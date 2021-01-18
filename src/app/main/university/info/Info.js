import history from '@history';
import React, { useState, useRef, useEffect, Fragment } from "react";
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Formsy from 'formsy-react';
import { TextFieldFormsy, FuseChipSelectFormsy } from '@fuse/core/formsy';
import { Snackbar, SnackbarContent, Typography, Icon, IconButton, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import jwtService from 'app/services/jwtService';
import { makeStyles } from '@material-ui/core/styles';
import * as base from 'app/env';

const useStyles = makeStyles({
	button: {
		width: 100,
		background: '#039be5',
		color: '#fff',
		textTransform: 'none',
		margin: '0 1.2rem',
		'&:hover': {
			background: '#039be5',
			color: '#fff',
			textTransform: 'none'
		}
	},
	link: {
		'&:hover': {
			textDecoration: 'none !important'
		}
	},
	logo: {
	  width: 89,
	  height: 89
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
	},
	logo_upload: {
  	marginLeft: '1.2rem',
  	width: '100%'
	},
	logo_button: {
		width: 'auto',
		background: '#039be5',
		color: '#fff',
		textTransform: 'none',
		'&:hover': {
			background: '#039be5',
			color: '#fff',
			textTransform: 'none'
		}
	}
});

function Info() {
	const [name, setName] = useState();
	const [logo, setLogo] = useState();
	const [email, setEmail] = useState();
	const [phone, setPhone] = useState();
	const [address, setAddress] = useState();
	const [destination, setDestination] = useState();
	const [content, setContent] = useState();
	const [message, setMessage] = useState(false);
	const [logoMessage, setLogoMessage] = useState(false);
	const [savedState, setSavedState] = useState(false);
	const [notSaved, setNotSaved] = useState(false);

	const classes = useStyles();

	const api = base.api;

	const id = jwtService.getUserId();

	const destinationSource = [];
	useEffect(() => {
		// eslint-disable-next-line
		fetch(api + 'destinations/get').then(res => res.json()).then(results => { results.map(row => {
			destinationSource.push({
				value: row.id,
		    label: row.destination
			});
		})});
	});

	useEffect(() => {
		// eslint-disable-next-line
		fetch(api + 'user/get?id=' + id).then(res => res.json()).then(results => { results.map(row => {
			setName(row.name);
			setLogo(row.logo);
			setEmail(row.email);
		})});
	});

	useEffect(() => {
		fetch(api + 'universities?userId=' + id).then(res => res.json()).then(results => {
			setPhone(results[0]['phone']);
			setAddress(results[0]['address']);
			setDestination(results[0]['destination']);
		});
	});

	useEffect(() => {
		fetch(api + 'universities?userId=' + id).then(res => res.json()).then(results => {
			setContent(results[0]['description']);
		});
	}, [api, id]);

	const escapeUnicode = (str) => {
		if (str)
		return str.replace(/(?:\r\n|\r|\n)/g, '</br>').replace(/"/g, "'");
	};

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

	const handleSubmit = (model) => {
		const dest = model.destination;
		fetch(api + 'university/updateInfo', {
			method: 'PUT',
			body: '{"id": "' + id + '", "name": "' + model.name + '", "email": "' + model.email + '", "phone": "' + model.phone + '", "address": "'  + model.address + '", "destination": "' + dest.label + '", "description": "' + escapeUnicode(content) + '"}',
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.text());
		setSavedState(true);
		setMessage(true);
	};

	const checkSaved = () => {
		history.push('/university/layout');
	};

	const handleChange = (e) => {
  	setContent(e);
  };

	const hideMessage = () => {
		setMessage(false);
		setLogoMessage(false);
		setNotSaved(false);
	};

	const formRef = useRef(null);

	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-24 border-b-1'
			}}
			header={
				<Fragment>
					<div className="page_header flex flex-1 items-center justify-between p-24">
						<div className="flex flex-col">
							<div className="flex items-center mb-16">
								<Icon className="text-18" color="action">home</Icon>
								<Icon className="text-16" color="action">chevron_right</Icon>
								<Typography color="textSecondary">General Information</Typography>
								<Icon className="text-16" color="action">chevron_right</Icon>
								<Typography color="textSecondary">Information</Typography>
							</div>
							<Typography variant="h3">University Information</Typography>
						</div>
					</div>
					{logoMessage &&
						<Snackbar	open={true}	onClose={hideMessage}	ContentProps={{	variant: 'body2',	headlineMapping: { body1: 'div', body2: 'div' }	}}>
							<SnackbarContent
								className={classes.message}
								message={
									<div className="flex items-center">
										<Typography className="mx-8">Logo successfully changed.</Typography>
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
					{message &&
						<Snackbar open={true}	onClose={hideMessage}	ContentProps={{ variant: 'body2',	headlineMapping: { body1: 'div', body2: 'div' }	}}>
							<SnackbarContent
								className={classes.message}
								message={
									<div className="flex items-center">
										<Typography className="mx-8">Data saved.</Typography>
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
					{notSaved &&
						<Snackbar open={true}	onClose={hideMessage}	ContentProps={{ variant: 'body2',	headlineMapping: { body1: 'div', body2: 'div' }	}}>
							<SnackbarContent
								className={classes.warning}
								message={
									<div className="flex items-center">
										<Typography className="mx-8">Changes not saved! If you wish to continue, please click Next button again.</Typography>
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
						<Formsy	onValidSubmit={handleSubmit} ref={formRef}>
							<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
								<div className="flex flex-col w-full sm:w-1/2 md:w-1/2 px-12">
									<h2 className="text-24 mb-16">Please provide your Information.</h2>
									<div className="flex">
										<img src={logo} alt="University Logo" className={classes.logo} />
										<input accept="image/*" className="hidden" id="button-file" type="file" onChange={handleUpload} />
										<label htmlFor="button-file" className={classes.logo_upload}>
											<Button variant="contained" className={classes.logo_button} component="span">
												<Icon>add_photo_alternate</Icon>
											</Button>
										</label>
									</div>
									<TextFieldFormsy className="my-16" type="text" name="name" label="Name" value={name} variant="filled" required />
									<div className="flex">
										<TextFieldFormsy className="mb-16 mr-16 w-1/2" type="email" name="email" label="Email" value={email} variant="filled" required />
										<TextFieldFormsy className="mb-16 w-1/2" type="text" name="phone" label="Phone Number" value={phone} variant="filled" required />
									</div>
									<div className="flex">
										<FuseChipSelectFormsy className="mb-8 selector" name="city" value="" textFieldProps={{ label: 'City', InputLabelProps: { shrink: true }, variant: 'filled' }} options="" required />
										<TextFieldFormsy className="mb-16 ml-16 flex-auto" type="text" name="address" label="Full address" value={address} variant="filled" required />
									</div>
									<div className="flex">
										<FuseChipSelectFormsy className="mb-8 selector" name="contact" value="" textFieldProps={{ label: 'Contact Person', InputLabelProps: { shrink: true }, variant: 'filled' }} options="" required />
										<TextFieldFormsy className="mb-16 ml-16 flex-auto" type="email" name="email" label="Contact Email" value="" variant="filled" required />
									</div>
									<FuseChipSelectFormsy className="mb-8" name="destinations" value={{ label: destination }} textFieldProps={{ label: 'Study Destinations', InputLabelProps: { shrink: true }, variant: 'filled' }} options={destinationSource} required/>
									<FuseChipSelectFormsy className='mb-8' name="acca" value="" textFieldProps={{ label: 'Accreditation Agencies', InputLabelProps: { shrink: true }, variant: 'filled' }} options="" required/>
								</div>
								<div className="flex flex-col w-full sm:w-1/2 md:w-1/2 px-12">
									<h2 className="text-24 mb-16">Edit the visible description here below.</h2>
									<Editor
										init={{
											height: 550,
											menubar: true,
											plugins: [
												'advlist autolink lists link image charmap print preview anchor',
												'searchreplace visualblocks code fullscreen',
												'insertdatetime media table paste code help wordcount'
											],
											toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
										}}
										apiKey='lkmmjaqdtdp18ba8hfg14b9zmkdhpvjwtxds382lkm0przdf'
										cloudChannel='5-stable'
										value={content}
										textareaName='description'
										onEditorChange={handleChange}
									/>
								</div>
							</FuseAnimateGroup>
							<div className="block m-auto text-center mt-24">
								<Button type="submit" variant="contained" className={classes.button}>Save</Button>
								<Button type="button" variant="contained" className={classes.button} onClick={checkSaved}>Next</Button>
							</div>
						</Formsy>
					</div>
				</div>
			}
			innerScroll
		/>
	);
}

export default withRouter(Info);
