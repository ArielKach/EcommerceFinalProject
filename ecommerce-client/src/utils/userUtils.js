import jwt_decode from 'jwt-decode';
import firebase from '../firebase';

const parseErorr = (error) => {
	if (error.code === 'auth/email-already-in-use') {
		return 'This email is already in use.';
	}
	if (error.code === 'auth/weak-password') {
		return 'Your password must be 6 characters long or more.';
	}
	if (error.code === 'auth/invalid-email') {
		return 'Your email address is badly formatted.';
	}
	if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
		return 'Invalid credentials. Please try again.';
	}

	return 'Unknown error';
};

export const register = async (email, password, name) => {
	try {
		const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
		await firebase.auth().currentUser.updateProfile({
			displayName: name,
		});
		return data.user;
	} catch (error) {
		throw new Error(parseErorr(error));
	}
};

export const login = async (email, password) => {
	try {
		const data =  await firebase.auth().signInWithEmailAndPassword(email, password);
		return data.user;
	} catch (error) {
		throw new Error(parseErorr(error));
	}
};

export const resetPasswordWithEmail = async (email) => {
	try {
		await firebase.auth().sendPasswordResetEmail(email);
	} catch (error) {
		console.log(error)
		throw new Error(parseErorr(error));
	}
};

export const getUser = () => {
	return firebase.auth().currentUser;
};

export const getIsAdmin = () => {
	return jwt_decode(sessionStorage.getItem('token')).isAdmin;
};
