import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Welcome to Odros!');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');
			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'Authorization failed.'); // Your access_token has expired, please login again.
		}
	};

	signInWithEmailAndPassword = (email, password) => {
		window.activeUsers = [];
		return new Promise((resolve, reject) => {
			axios
				.get('/api/auth', {
					data: {
						email,
						password
					}
				})
				.then(response => {
					if (response.data.user) {
						this.setSession(response.data.access_token, response.data.user.uuid, response.data.user.role, response.data.user.id);
						window.activeUsers.push(response.data.user.id);
						setTimeout(resolve(response.data.user), 3000)
					} else {
						reject(response.data.error);
					}
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.get('/api/auth/access-token', {
					data: {
						access_token: this.getAccessToken()
					}
				})
				.then(response => {
					if (response.data.user) {
						this.setSession(response.data.access_token, response.data.user.uuid, response.data.user.role, response.data.user.id);
						setTimeout(resolve(response.data.user), 3000);
					} else {
						this.logout();
						Promise.reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					Promise.reject(new Error('Failed to login with token.' + error));
					this.logout();
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = (access_token, uuid, role, id) => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			localStorage.setItem('uuid', uuid);
			localStorage.setItem('role', role);
			localStorage.setItem('id', id);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.clear();
			// this.setSession(null);
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		localStorage.clear();
		// this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('Access token expired!');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};

	getUserUuid = () => {
		return window.localStorage.getItem('uuid');
	};

	getUserId = () => {
		return window.localStorage.getItem('id');
	};

	getUserRole = () => {
		return window.localStorage.getItem('role');
	};
}

const instance = new JwtService();

export default instance;
