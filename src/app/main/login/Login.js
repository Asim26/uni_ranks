import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import JWTLogin from './JWTLogin';

export default function Login() {
	return (
		<div className="page_header flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24">
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					<Card className="flex flex-col w-full max-w-sm items-center justify-center"	square elevation={0}>
						<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
							<JWTLogin />
						</CardContent>
						<div className="flex flex-col items-center justify-center pb-32">
							<div>
								<span className="font-medium mr-8">Don't have an account?</span>
								<Link className="font-medium" to="/register">
									Register
								</Link>
							</div>
							{/*<Link className="font-medium mt-8" to="/">
								Back to Uniranks
							</Link>*/}
						</div>
					</Card>
					<div className="page_header_dark w-full">
						<FuseAnimate delay={300}>
							<img className="block m-auto w-512 my-48" src="assets/images/logos/uniranks-menu.png" alt="logo" />
						</FuseAnimate>
						<FuseAnimate animation="transition.slideUpIn" delay={400}>
							<Typography variant="h2" color="inherit" className="text-center text-white">
								Welcome to Uniranks!
							</Typography>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideUpIn" delay={500}>
							<Typography variant="p" color="inherit" className="block mt-48 text-white w-3/4 m-auto">
								Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, totam rem aperiam, totam rem aperiam, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem...
							</Typography>
						</FuseAnimate>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}
