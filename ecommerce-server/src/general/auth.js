const admin = require('../firebase/firebase-connection');

const middleware = async (req, res, next) => {
	try {
		const db = admin.firestore();
		const userDoc = await db.collection('users').doc(req.headers.userid).get();
		if (userDoc.exists) {
			const user = userDoc.data();
			req.payload = {
				userId: user.uId,
				isAdmin: user.isAdmin,
			};
		} else {
			throw Error('User not found');
		}
		next();
	} catch (err) {
		res.status(500).send(err.message);
	}
};

module.exports = middleware;
