import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { makeStyles, Typography, InputAdornment, Icon, IconButton, Snackbar, SnackbarContent, Modal, Backdrop, Fade, Paper, Button } from '@material-ui/core';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import * as base from 'app/env';
import { Link } from 'react-router-dom';
import jwtService from 'app/services/jwtService';
import clsx from 'clsx';

export function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick(tick => tick + 1);
  }, [])
  return update;
}

const useStyles = makeStyles(theme => ({
	container: {
		position: 'relative',
		width: '100%',
		height: 'auto',
		textAlign: 'center',
		display: 'block'
	},
	overlay1: {
		zIndex: '1000 !important',
		width: '293px',
		height: '123px',
		position: 'absolute',
		top: '141px',
		left: '353px'
	},
	overlay2: {
		zIndex: '1000 !important',
		width: '219px',
		height: '88px',
		position: 'absolute',
		top: '136px',
		left: '615px'
	},
	overlay3: {
		width: '220px',
		height: '89px',
		position: 'absolute',
		zIndex: '1000 !important',
		top: '143px',
		left: '380px'
	},
	overlay4: {
		zIndex: '1000 !important',
		width: '160px',
		height: '66px',
		position: 'absolute',
		top: '222px',
		left: '244px'
	},
	booth: {
		display: 'block',
		position: 'relative',
		margin: 'auto',
		height: 'auto',
		width: 1000
	},
  booth_image: {
		width: 1000,
    height: 382
  },
	booth_banner: {
		position: 'absolute',
		'&:hover': {
			cursor: 'pointer'
		},
		'& > img': {
			width: '100%',
			height: '100%'
		}
	},
	booth_banner_standing01: {
		top: 177.5,
		width: 116,
		height: 215
	},
  booth_banner10: {
		top: 142.5,
    left: 353,
    width: '292px !important',
    height: '120.5px !important',
		overflowY: 'hidden'
	},
  booth_banner11: { left: 27 },
  booth_banner12: { left: 193 },
  booth_banner13: { left: 855 },
	booth_banner_standing02: {
		top: 81.5,
    width: 112.5,
    height: 250.5
	},
  booth_banner20: {
		top: 136,
    left: 615,
    width: '219px !important',
    height: '87.5px !important',
		overflowY: 'hidden'
	},
  booth_banner21: { left: 168.5 },
  booth_banner22: { left: 325 },
  booth_banner23: { left: 478 },
	logo3: {
		top: 59,
    left: 25,
    height: 58,
    width: 467
	},
	booth_banner_standing03: {
		top: 145.5,
    width: 66.5,
    height: 114.5
	},
  booth_banner30: {
		top: 144,
		left: 380,
    width: '219px !important',
    height: '87.4px !important',
		overflowY: 'hidden'
	},
  booth_banner31: { left: 206 },
  booth_banner32: { left: 293.5 },
  booth_banner33: { left: 616.5 },
  booth_banner34: { left: 704.5 },
	logo4: {
		left: 427,
    top: 83,
    width: 157,
		height: 50
	},
	booth_banner_standing04: {
		top: 178.5,
		width: 75.5,
		height: 159.5
	},
  booth_banner40: {
		top: 221.5,
    left: 244,
    width: '160px !important',
    height: '66.4px !important',
		overflowY: 'hidden'
	},
  booth_banner41: { left: 420 },
  booth_banner42: { left: 531 },
  booth_banner43: { left: 642.5 },
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
		'&:hover': {
			background: '#039be5',
			color: '#fff'
		}
	},
	message: {
	  color: '#fff',
	  backgroundColor: '#1E2125',
	  position: 'absolute',
		left: 0,
	  top: '-95vh'
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '55vw',
		height: 'fit-content',
		border: 0,
		borderRadius: 8,
		boxShadow: theme.shadows[5],
		margin: 'auto'
	},
	paper: {
		outline: 'none',
		backgroundColor: '#f7f7f7'
	},
  note: {
    bottom: -110
  }
}));

export default function Graphics() {
	const [tv1, setTv1] = useState('assets/images/fair/banners/placeholders/1/tv.png');
	const [banner11, setBanner11] = useState('assets/images/fair/banners/placeholders/1/banner.png');
	const [banner12, setBanner12] = useState('assets/images/fair/banners/placeholders/1/banner.png');
	const [banner13, setBanner13] = useState('assets/images/fair/banners/placeholders/1/banner.png');

	const [tv2, setTv2] = useState('assets/images/fair/banners/placeholders/2/tv.png');
	const [banner21, setBanner21] = useState('assets/images/fair/banners/placeholders/2/banner.png');
	const [banner22, setBanner22] = useState('assets/images/fair/banners/placeholders/2/banner.png');
	const [banner23, setBanner23] = useState('assets/images/fair/banners/placeholders/2/banner.png');

	const [tv3, setTv3] = useState('assets/images/fair/banners/placeholders/3/tv.png');
	const [logo3, setLogo3] = useState('assets/images/fair/banners/placeholders/3/logo.png');
	const [banner31, setBanner31] = useState('assets/images/fair/banners/placeholders/3/banner.png');
	const [banner32, setBanner32] = useState('assets/images/fair/banners/placeholders/3/banner.png');
	const [banner33, setBanner33] = useState('assets/images/fair/banners/placeholders/3/banner.png');
	const [banner34, setBanner34] = useState('assets/images/fair/banners/placeholders/3/banner.png');

	const [tv4, setTv4] = useState('assets/images/fair/banners/placeholders/4/tv.png');
	const [logo4, setLogo4] = useState('assets/images/fair/banners/placeholders/4/logo.png');
	const [banner41, setBanner41] = useState('assets/images/fair/banners/placeholders/4/banner.png');
	const [banner42, setBanner42] = useState('assets/images/fair/banners/placeholders/4/banner.png');
	const [banner43, setBanner43] = useState('assets/images/fair/banners/placeholders/4/banner.png');

	const [logolnk, setLogoLnk] = useState('/');
	const [openLogo, setOpenLogo] = useState(false);

	const [message, setMessage] = useState(false);
	const [warning, setWarning] = useState(false);
	const [color, setColor] = useState();
	const [layout, setLayout] = useState();

	const api = base.api;

	const id = jwtService.getUserId();

	const forceUpdate = useForceUpdate();

	useEffect(() => {
		// eslint-disable-next-line
		fetch(api + 'booth/get?id=' + id).then(res => res.json()).then(results => { results.map(row => {
			setLayout(row.layout);
			setColor(row.color);
		})});
	});

	useEffect(() => {
		// eslint-disable-next-line
		fetch(api + 'booth/graphics/get?id=' + id).then(res => res.json()).then(results => { results.map(row => {
			if (layout === '1') {
				if (row.tvlnk !== '0') { setTv1('assets/images/fair/banners/placeholders/1/tv_upload.png'); }
				if (row.banner1 !== '0') { setBanner11(row.banner1); }
				if (row.banner2 !== '0') { setBanner12(row.banner2); }
				if (row.banner3 !== '0') { setBanner13(row.banner3); }
			} else if (layout === '2') {
				if (row.tvlnk !== '0') { setTv2('assets/images/fair/banners/placeholders/2/tv_upload.png'); }
				if (row.banner1 !== '0') { setBanner21(row.banner1); }
				if (row.banner2 !== '0') { setBanner22(row.banner2); }
				if (row.banner3 !== '0') { setBanner23(row.banner3); }
			} else if (layout === '3') {
				if (row.tvlnk !== '0') { setTv3('assets/images/fair/banners/placeholders/3/tv_upload.png'); }
				if (row.logo !== '0') { setLogo3(row.logo); }
				if (row.banner1 !== '0') { setBanner31(row.banner1); }
				if (row.banner2 !== '0') { setBanner32(row.banner2); }
				if (row.banner3 !== '0') { setBanner33(row.banner3); }
				if (row.banner4 !== '0') { setBanner34(row.banner4); }
			} else if (layout === '4') {
				if (row.tvlnk !== '0') { setTv4('assets/images/fair/banners/placeholders/4/tv_upload.png'); }
				if (row.logo !== '0') { setLogo4(row.logo); }
				if (row.banner1 !== '0') { setBanner41(row.banner1); }
				if (row.banner2 !== '0') { setBanner42(row.banner2); }
				if (row.banner3 !== '0') { setBanner43(row.banner3); }
			}
		})});
	});

	const src = 'assets/images/fair/booths/' + layout + '/' + color  + '.png';

	const classes = useStyles();

	const handleSubmit = () => {
		const formData = new FormData();
		formData.append("id", id);
		formData.append("logolnk", logolnk);

		fetch(api + 'booth/graphics/setLinks', { method: 'PUT', body: formData }).then(res => res.text());

		setMessage(true);
	};

	const hideMessage = () => {
		setMessage(false);
	};

	const hideWarning = () => {
		setWarning(false);
	};

	const formRef = useRef(null);

	const	handleUploadLogo = (e) => {
		const file = e.target.files[0];

		const fileReader = new FileReader();

		fileReader.readAsText(file);

		fileReader.onload = () => {
			const formData = new FormData();
			formData.append("id", id);
			formData.append("file", file);
			fetch(api + 'booth/graphics/setLogo', { method: 'PUT', body: formData }).then(res => res.text());
			setOpenLogo(true);
		};

		fileReader.onerror = function () {};
	};

	const	handleUpload01 = (e) => {
		const file = e.target.files[0];

		const fileReader = new FileReader();

		fileReader.readAsText(file);

		fileReader.onload = () => {
			const formData = new FormData();
			formData.append("id", id);
			formData.append("file", file);
			fetch(api + 'booth/graphics/setBanner1', { method: 'PUT', body: formData }).then(res => res.text());
		};

		fileReader.onerror = function () {};
	};

	const	handleUpload02 = (e) => {
		const file = e.target.files[0];

		const fileReader = new FileReader();

		fileReader.readAsText(file);

		fileReader.onload = () => {
			const formData = new FormData();
			formData.append("id", id);
			formData.append("file", file);
			fetch(api + 'booth/graphics/setBanner2', { method: 'PUT', body: formData }).then(res => res.text());
		};

		fileReader.onerror = function () {};
	};

	const	handleUpload03 = (e) => {
		const file = e.target.files[0];

		const fileReader = new FileReader();

		fileReader.readAsText(file);

		fileReader.onload = () => {
			const formData = new FormData();
			formData.append("id", id);
			formData.append("file", file);
			fetch(api + 'booth/graphics/setBanner3', { method: 'PUT', body: formData }).then(res => res.text());
		};

		fileReader.onerror = function () {};
	};

	const	handleUpload04 = (e) => {
		const file = e.target.files[0];

		const fileReader = new FileReader();

		fileReader.readAsText(file);

		fileReader.onload = () => {
			const formData = new FormData();
			formData.append("id", id);
			formData.append("file", file);
			fetch(api + 'booth/graphics/setBanner4', { method: 'PUT', body: formData }).then(res => res.text());
		};

		fileReader.onerror = function () {};
	};

	const	handleUploadTV = (e) => {
		const file = e.target.files[0];

		const fileReader = new FileReader();

		fileReader.readAsText(file);

		fileReader.onload = () => {
			const formData = new FormData();
			formData.append("id", id);
			formData.append("file", file);
			fetch(api + 'booth/graphics/setTvLink', { method: 'PUT', body: formData }).then(res => res.text());
		};

		fileReader.onerror = function () {};
	};

	const handleSubmitLogo = (model) => {
		setLogoLnk(model.logolnk);
		setOpenLogo(false);
		forceUpdate();
	};

	const handleCloseLogo = () => { setOpenLogo(false); };

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
                <Typography color="textSecondary">Graphics</Typography>
              </div>
              <Typography variant="h3">Booth Graphics Setup</Typography>
            </div>
          </div>
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
										<Typography className="mx-8">Banners successfully uploaded.</Typography>
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
					{warning &&
						<Snackbar
							open={true}
							onClose={hideWarning}
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
										<Typography className="mx-8">Your layout and/or color settings is incorrect, please go back and save those.</Typography>
									</div>
								}
								action={[
									<IconButton
										key="close"
										aria-label="Close"
										color="inherit"
										onClick={hideWarning}
									>
										<Icon>close</Icon>
									</IconButton>
								]}
							/>
						</Snackbar>
					}
				</Fragment>
			}
			content={
				<div className="p-24">
					<FuseAnimateGroup enter={{ animation: "transition.slideLeftBigIn", 	stagger: 100, duration: 400, delay: 100 }} leave={{ animation: "transition.slideRightBigOut", stagger: 100, duration: 400, delay: 100 }}>
						<div className={classes.container}>
							{layout === '1' &&
							<div className={classes.booth}>
								<Typography className="w-full block mx-auto my-16 text-center text-24">
									Click on banner / TV to upload your graphics and set their links.
								</Typography>
								<Typography className={clsx(classes.note, 'w-full block mx-auto text-center text-12 absolute')}>
									<b>Note: </b>Banners format should be either <i>.jpg</i>, <i>.jpeg</i> or <i>.png</i> and not more then 150kB.
								</Typography>

								<img className={classes.booth_image} src={src} alt="Booth" />

                <input accept="video/*" className="hidden" id="banner10" type="file" onChange={handleUploadTV} />
								<label htmlFor="banner10">
									<img className={clsx(classes.booth_banner10, classes.booth_banner)} src={tv1} alt="TV Video" />
								</label>

								<input accept="image/*" className="hidden" id="banner11" type="file" onChange={handleUpload01} />
								<label htmlFor="banner11">
									<img className={clsx(classes.booth_banner11, classes.booth_banner, classes.booth_banner_standing01)} src={banner11} alt="Banner" />
								</label>

								<input accept="image/*" className="hidden" id="banner12" type="file" onChange={handleUpload02} />
								<label htmlFor="banner12">
									<img className={clsx(classes.booth_banner12, classes.booth_banner, classes.booth_banner_standing01)} src={banner12} alt="Banner" />
								</label>

								<input accept="image/*" className="hidden" id="banner13" type="file" onChange={handleUpload03} />
								<label htmlFor="banner13">
									<img className={clsx(classes.booth_banner13, classes.booth_banner, classes.booth_banner_standing01)} src={banner13} alt="Banner" />
								</label>
							</div>
							}
							{layout === '2' &&
							<div className={classes.booth}>
								<Typography className="w-full block mx-auto my-16 text-center text-24">
									Click on banner / TV to upload your graphics and set their links.
								</Typography>
                <Typography className={clsx(classes.note, 'w-full block mx-auto text-center text-12 absolute')}>
									<b>Note: </b>Banners format should be either <i>.jpg</i>, <i>.jpeg</i> or <i>.png</i> and not more then 150kB.
								</Typography>

								<img className={classes.booth_image} src={src} alt="Booth" />

								<input accept="video/*" className="hidden" id="banner20" type="file" onChange={handleUploadTV} />
								<label htmlFor="banner20">
									<img className={clsx(classes.booth_banner20, classes.booth_banner)} src={tv2} alt="TV Video" />
								</label>

								<input accept="image/*" className="hidden" id="banner21" type="file" onChange={handleUpload01} />
								<label htmlFor="banner21">
									<img className={clsx(classes.booth_banner21, classes.booth_banner, classes.booth_banner_standing02)} src={banner21} alt="Banner" />
								</label>

								<input accept="image/*" className="hidden" id="banner22" type="file" onChange={handleUpload02} />
								<label htmlFor="banner22">
									<img className={clsx(classes.booth_banner22, classes.booth_banner, classes.booth_banner_standing02)} src={banner22} alt="Banner" />
								</label>

								<input accept="image/*" className="hidden" id="banner23" type="file" onChange={handleUpload03} />
								<label htmlFor="banner23">
									<img className={clsx(classes.booth_banner23, classes.booth_banner, classes.booth_banner_standing02)} src={banner23} alt="Banner" />
								</label>
							</div>
							}
							{layout === '3' &&
							<div className={classes.booth}>
								<Typography className="w-full block mx-auto my-16 text-center text-24">
									Click on banner / TV to upload your graphics and set their links.
								</Typography>
                <Typography className={clsx(classes.note, 'w-full block mx-auto text-center text-12 absolute')}>
									<b>Note: </b>Banners format should be either <i>.jpg</i>, <i>.jpeg</i> or <i>.png</i> and not more then 150kB.
								</Typography>

								<img className={classes.booth_image} src={src} alt="Booth" />

								<input accept="image/*" className="hidden" id="logo3" type="file" onChange={handleUploadLogo} />
								<label htmlFor="logo3">
									<img className={clsx(classes.logo3, classes.booth_banner)} src={logo3} alt="Logo" />
								</label>

                <input accept="video/*" className="hidden" id="banner30" type="file" onChange={handleUploadTV} />
								<label htmlFor="banner30">
									<img className={clsx(classes.booth_banner30, classes.booth_banner)} src={tv3} alt="TV Video" />
								</label>

								<input accept="image/*" className="hidden" id="banner31" type="file" onChange={handleUpload01} />
								<label htmlFor="banner31">
									<img className={clsx(classes.booth_banner31, classes.booth_banner, classes.booth_banner_standing03)} src={banner31} alt="Banner" />
								</label>

								<input accept="image/*" className="hidden" id="banner32" type="file" onChange={handleUpload02} />
								<label htmlFor="banner32">
									<img className={clsx(classes.booth_banner32, classes.booth_banner, classes.booth_banner_standing03)} src={banner32} alt="Banner" />
								</label>

								<input accept="image/*" className="hidden" id="banner33" type="file" onChange={handleUpload03} />
								<label htmlFor="banner33">
									<img className={clsx(classes.booth_banner33, classes.booth_banner, classes.booth_banner_standing03)} src={banner33} alt="Banner" />
								</label>

								<input accept="image/*" className="hidden" id="banner34" type="file" onChange={handleUpload04} />
								<label htmlFor="banner34">
									<img className={clsx(classes.booth_banner34, classes.booth_banner, classes.booth_banner_standing03)} src={banner34} alt="Banner" />
								</label>
							</div>
							}
							{layout === '4' &&
							<div className={classes.booth}>
								<Typography className="w-full block mx-auto my-16 text-center text-24">
									Click on banner / TV to upload your graphics and set their links.
								</Typography>
                <Typography className={clsx(classes.note, 'w-full block mx-auto text-center text-12 absolute')}>
									<b>Note: </b>Banners format should be either <i>.jpg</i>, <i>.jpeg</i> or <i>.png</i> and not more then 150kB.
								</Typography>

								<img className={classes.booth_image} src={src} alt="Booth" />

								<input accept="image/*" className="hidden" id="logo4" type="file" onChange={handleUploadLogo} />
								<label htmlFor="logo4">
									<img className={clsx(classes.logo4, classes.booth_banner)} src={logo4} alt="Logo" />
								</label>

                <input accept="video/*" className="hidden" id="banner40" type="file" onChange={handleUploadTV} />
								<label htmlFor="banner40">
									<img className={clsx(classes.booth_banner40, classes.booth_banner)} src={tv4} alt="TV Video" />
								</label>

								<input accept="image/*" className="hidden" id="banner41" type="file" onChange={handleUpload01} />
								<label htmlFor="banner41">
									<img className={clsx(classes.booth_banner41, classes.booth_banner, classes.booth_banner_standing04)} src={banner41} alt="Banner" />
								</label>

								<input accept="image/*" className="hidden" id="banner42" type="file" onChange={handleUpload02} />
								<label htmlFor="banner42">
									<img className={clsx(classes.booth_banner42, classes.booth_banner, classes.booth_banner_standing04)} src={banner42} alt="Banner" />
								</label>

								<input accept="image/*" className="hidden" id="banner43" type="file" onChange={handleUpload03} />
								<label htmlFor="banner43">
									<img className={clsx(classes.booth_banner43, classes.booth_banner, classes.booth_banner_standing04)} src={banner43} alt="Banner" />
								</label>
							</div>
							}
							{openLogo &&
								<Modal className={classes.modal} open={true} onClose={handleCloseLogo} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
									<Fade in={true}>
										<Paper className={clsx(classes.paper, 'w-full')}>
											<Formsy
												onValidSubmit={handleSubmitLogo}
												ref={formRef}
												className="flex flex-col justify-center w-full mt-16 p-16"
											>
												<TextFieldFormsy
													className="mb-16"
													type="text"
													name="logolnk"
													label="Logo Link"
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<Icon className="text-20" color="action">
																	insert_link
																</Icon>
															</InputAdornment>
														)
													}}
													variant="outlined"
													required
												/>

												<Button
													type="submit"
													variant="contained"
													className={clsx(classes.button, 'w-full mx-auto mt-16 normal-case')}
													aria-label="Add link"
												>
													Add link
												</Button>
                        <Typography className="text-16 mt-16" color="textSecondary"><b>Note: </b>Please add links in format like: <u>google.com</u> and not <u>http://google.com</u>.</Typography>
											</Formsy>
											</Paper>
										</Fade>
									</Modal>
								}
							<div className="block m-auto text-center mt-24">
								<Button type="submit" variant="contained" className={clsx(classes.button, 'normal-case')} onClick={handleSubmit}>
									Save
								</Button>
								<Link className={classes.link} to="/university/links">
									<Button type="button" variant="contained" className={clsx(classes.button, 'normal-case')}>
										Next
									</Button>
								</Link>
							</div>
						</div>
					</FuseAnimateGroup>
				</div>
			}
			innerScroll
		/>
	);
}
