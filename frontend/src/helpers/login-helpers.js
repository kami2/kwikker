import axiosInstance from '../axios'

export function isLoggedIn() {
	return axiosInstance.defaults.headers['Authorization']
}

