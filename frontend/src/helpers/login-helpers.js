import axiosInstance from '../axios'
import jwt_decode from 'jwt-decode'


export function isLoggedIn() {
	return axiosInstance.defaults.headers['Authorization']
}

export function currentUser() {
	const token = localStorage.getItem('access_token');
	
	if (!token) {
		return {}
	} 

	const decoded_jwt_token = jwt_decode(token);

	return {id:String(decoded_jwt_token.user_id), userName:decoded_jwt_token.name}
}