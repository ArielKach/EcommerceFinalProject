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
		const db = firebase.firestore();
		await db
			.collection('users')
			.doc(data.user.uid)
			.set({
				isAdmin: false,
				displayName: name,
				email: data.user.email,
				uId: data.user.uid,
			});
		return { ...data.user, isAdmin: false, displayName: name };
	} catch (error) {
		console.log(error);
		throw new Error(parseErorr(error));
	}
};

export const login = async (email, password) => {
	try {
		const data = await firebase.auth().signInWithEmailAndPassword(email, password);
		const db = firebase.firestore();
		const doc = await db.collection('users').doc(data.user.uid).get();
		if (doc.exists) {
			return doc.data();
		}
		throw new Error({ code: 'auth/user-not-found' });
	} catch (error) {
		throw new Error(parseErorr(error));
	}
};

export const resetPasswordWithEmail = async (email) => {
	try {
		await firebase.auth().sendPasswordResetEmail(email);
	} catch (error) {
		throw new Error(parseErorr(error));
	}
};

export const getUser = () => {
	return firebase.auth().currentUser;
};
