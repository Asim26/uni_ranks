import React, { useState, useEffect, Fragment } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { Button, Snackbar, SnackbarContent, Typography, Icon, IconButton, makeStyles } from '@material-ui/core';
import html2canvas from 'html2canvas';
import jwtService from 'app/services/jwtService';
import * as base from 'app/env';
import clsx from 'clsx';

const useStyles = makeStyles({
	contigent: {
	  width: 'fit-content !important',
	  textAlign: 'center'
	},
	booth: {
		position: 'relative',
		width: '1000px !important',
		height: '382px !important',
		backgroundColor: 'rgba(0, 0, 0, 0)'
	},
  booth_image: {
		width: '100% !important',
    height: '100% !important',
		backgroundColor: 'rgba(0, 0, 0, 0)'
  },
	booth_banner: {
		position: 'absolute',
		'& > img': {
			width: '100%',
			height: '100%'
		},
		'&:hover': {
			textDecoration: 'none !important'
		}
	},
	booth_banner_standing01: {
		top: 125.5,
		width: 116,
		height: 215
	},
  booth_banner10: {
		top: 90,
    left: 353,
    width: '292px !important',
    height: '120.5px !important',
		overflowY: 'hidden'
	},
  booth_banner11: { left: 27 },
  booth_banner12: { left: 193 },
  booth_banner13: { left: 855 },
	booth_banner_standing02: {
		top: 29.5,
    width: 112.5,
    height: 250.5
	},
  booth_banner20: {
		top: 84,
    left: 615,
    width: '219px !important',
    height: '87.5px !important',
		overflowY: 'hidden'
	},
  booth_banner21: { left: 168.5 },
  booth_banner22: { left: 325 },
  booth_banner23: { left: 478 },
	logo3: {
		top: 7,
    left: 25,
    height: 58,
    width: 467,
		backgroundColor: 'rgba(0, 0, 0, 0)'
	},
	booth_banner_standing03: {
		top: 93.5,
    width: 66.5,
    height: 114.5
	},
  booth_banner30: {
		top: 92,
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
		top: 31,
		left: 427,
    width: 157,
		height: 50,
		backgroundColor: 'rgba(0, 0, 0, 0)'
	},
	booth_banner_standing04: {
		top: 126.5,
		width: 75.5,
		height: 159.5
	},
  booth_banner40: {
		top: 169.5,
    left: 244,
    width: '160px !important',
    height: '66.4px !important',
		overflowY: 'hidden'
	},
  booth_banner41: { left: 420 },
  booth_banner42: { left: 531 },
  booth_banner43: { left: 642.5 },
	message: {
		color: '#fff',
		backgroundColor: '#1E2125',
		position: 'absolute',
		left: 0,
		top: '-95vh'
	},
	button: {
		width: 100,
		background: '#039be5',
		color: '#fff',
		'&:hover': {
			background: '#039be5',
			color: '#fff',
		}
	}
});

export default function Publish(props) {
	const [tv, setTV] = useState();
	const [logo, setLogo] = useState();
	const [banner1, setBanner1] = useState();
	const [banner2, setBanner2] = useState();
	const [banner3, setBanner3] = useState();
	const [banner4, setBanner4] = useState();
	const [message, setMessage] = useState(false);
	const [warning, setWarning] = useState(false);
	const [info, setInfo] = useState(false);
	const [color, setColor] = useState();
	const [layout, setLayout] = useState();

	const api = base.api;

	const id = jwtService.getUserId();

	const canvas = document.getElementById('canvas');

	useEffect(() => {
		// eslint-disable-next-line
		fetch(api + 'booth/get?id=' + id).then(res => res.json()).then(results => { results.map(row => {
			setLayout(row.layout);
			setColor(row.color);

			if (layout === '0') {
				setWarning(true);
			}
		})});

		// eslint-disable-next-line
		fetch(api + 'booth/graphics/get?id=' + id).then(res => res.json()).then(results => { results.map(row => {
			setTV('' + row.tvlnk);
			setBanner1('' + row.banner1);
			setBanner2('' + row.banner2);
			setBanner3('' + row.banner3);

			if (layout === '3') {
				setBanner4('' + row.banner4);
				setLogo('' + row.logo);
				if (tv === '0' || logo === '0' || banner1 === '0' || banner2 === '0' || banner3 === '0' || banner4 === '0') {
					setWarning(true);
				}
			} else if (layout === '4') {
				setLogo('' + row.logo);
				if (tv === '0' || logo === '0' || banner1 === '0' || banner2 === '0' || banner3 === '0') {
					setWarning(true);
				}
			} else if (layout === '1' || layout === '2') {
				if (tv === '0' || banner1 === '0' || banner2 === '0' || banner3 === '0') {
					setWarning(true);
				}
			}
		})});
	});

	const src = 'assets/images/fair/booths/' + layout + '/' + color  + '.png';

	function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
	}

	const classes = useStyles();

	function handleSubmit() {
		setInfo(true);
		html2canvas(canvas, { backgroundColor: null }).then(result => {
			var dataURL = result.toDataURL('image/png');
			var file = dataURItoBlob(dataURL);

			if (!file) { return; }
			const reader = new FileReader();

			reader.readAsText(file);

			reader.onload = () => {
				const formData = new FormData();
				formData.append("file", file);
				formData.append("id", id);
				fetch(api + 'booth/publish/set', { method: 'PUT', body: formData }).then(res => res.text());
				setInfo(false);
				setMessage(true);
				window.location.reload();
			};

			reader.onerror = function () {};
		});
	}

	const hideMessage = () => {
		setMessage(false);
	};

	const hideWarning = () => {
		setWarning(false);
	};

	const hideInfo = () => {
		setInfo(false);
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
                <Typography color="textSecondary">Review / Publish</Typography>
              </div>
              <Typography variant="h3">Booth Overview</Typography>
            </div>
          </div>
					{message &&
						<Snackbar	open={true}	onClose={hideMessage}	ContentProps={{	variant: 'body2',	headlineMapping: { body1: 'div', body2: 'div' }	}}>
							<SnackbarContent
								className={classes.message}
								message={
									<div className="flex items-center">
										<Typography className="mx-8">You booth is ready and it will soon be placed in the Fair Hall!</Typography>
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
					{info &&
						<Snackbar	open={true}	onClose={hideMessage}	ContentProps={{	variant: 'body2',	headlineMapping: { body1: 'div', body2: 'div' }	}}>
							<SnackbarContent
								className={classes.message}
								message={
									<div className="flex items-center">
										<Typography className="mx-8">We are preparing your booth, please hold for a few seconds...</Typography>
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
								className={classes.message}
								message={
									<div className="flex items-center">
										<Typography className="mx-8">Somethings wrong with you setup, please go back and save everything.</Typography>
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
				</Fragment>
			}
			content={
				<div className={classes.contigent}>
					<div id="canvas" className={classes.booth}>
						{layout === '1' &&
							<React.Fragment>
								<img className={classes.booth_image} src={src} alt="Booth" />
								{(tv !== '0') && <img className={clsx(classes.booth_banner10, classes.booth_banner)} src={tv} alt="TV video" /> }
								{(banner1 !== '0') && <img className={clsx(classes.booth_banner11, classes.booth_banner, classes.booth_banner_standing01)} src={banner1} alt="Banner" /> }
								{(banner2 !== '0') && <img className={clsx(classes.booth_banner12, classes.booth_banner, classes.booth_banner_standing01)} src={banner2} alt="Banner" /> }
								{(banner3 !== '0') && <img className={clsx(classes.booth_banner13, classes.booth_banner, classes.booth_banner_standing01)} src={banner3} alt="Banner" /> }
							</React.Fragment>
						}
						{layout === '2' &&
							<React.Fragment>
								<img className={classes.booth_image} src={src} alt="Booth" />
								{(tv !== '0') && <img className={clsx(classes.booth_banner20, classes.booth_banner)} src={tv} alt="TV video" /> }
								{(banner1 !== '0') && <img className={clsx(classes.booth_banner21, classes.booth_banner, classes.booth_banner_standing02)} src={banner1} alt="Banner" /> }
								{(banner2 !== '0') && <img className={clsx(classes.booth_banner22, classes.booth_banner, classes.booth_banner_standing02)} src={banner2} alt="Banner" /> }
								{(banner3 !== '0') && <img className={clsx(classes.booth_banner23, classes.booth_banner, classes.booth_banner_standing02)} src={banner3} alt="Banner" /> }
							</React.Fragment>
						}
						{layout === '3' &&
							<React.Fragment>
								<img className={classes.booth_image} src={src} alt="Booth" />
								{(logo !== '0') && <img className={clsx(classes.logo3, classes.booth_banner)} src={logo} alt="Logo" /> }
								{(tv !== '0') && <img className={clsx(classes.booth_banner30, classes.booth_banner)} src={tv} alt="TV video" /> }
								{(banner1 !== '0') && <img className={clsx(classes.booth_banner31, classes.booth_banner, classes.booth_banner_standing03)} src={banner1} alt="Banner" /> }
								{(banner2 !== '0') && <img className={clsx(classes.booth_banner32, classes.booth_banner, classes.booth_banner_standing03)} src={banner2} alt="Banner" /> }
								{(banner3 !== '0') && <img className={clsx(classes.booth_banner33, classes.booth_banner, classes.booth_banner_standing03)} src={banner3} alt="Banner" /> }
								{(banner4 !== '0') && <img className={clsx(classes.booth_banner34, classes.booth_banner, classes.booth_banner_standing03)} src={banner4} alt="Banner" /> }
							</React.Fragment>
						}
						{layout === '4' &&
							<React.Fragment>
								<img className={classes.booth_image} src={src} alt="Booth" />
								{(logo !== '0') && <img className={clsx(classes.logo4, classes.booth_banner)} src={logo} alt="Logo" /> }
								{(tv !== '0') && <img className={clsx(classes.booth_banner40, classes.booth_banner)} src={tv} alt="TV video" /> }
								{(banner1 !== '0') && <img className={clsx(classes.booth_banner41, classes.booth_banner, classes.booth_banner_standing04)} src={banner1} alt="Banner" /> }
								{(banner2 !== '0') && <img className={clsx(classes.booth_banner42, classes.booth_banner, classes.booth_banner_standing04)} src={banner2} alt="Banner" /> }
								{(banner3 !== '0') && <img className={clsx(classes.booth_banner43, classes.booth_banner, classes.booth_banner_standing04)} src={banner3} alt="Banner" /> }
							</React.Fragment>
						}`
					</div>
					<div className="mt-24">
						<Button type="submit" variant="contained" className={clsx(classes.button, 'normal-case')} onClick={handleSubmit}>
							Publish
						</Button>
					</div>
				</div>
			}
			innerScroll
		/>
	);
}
