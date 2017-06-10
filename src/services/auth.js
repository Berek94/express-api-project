import passport from 'passport';
import LocalStrategy from 'passport-local';

import User from '../modules/User/model';

const localOpts = {
	usernameField: 'email',
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
	try {
		const user = await User.findOne({email});

		if (!user) {
			return done(null, false);
		}
		if (!user.authenticateUser(password)) {
			return done(null, false);
		}

		return done(null, user);
	} catch (error) {
		return done(error, false);
	}
});

passport.use(localStrategy);

export const authLocal = passport.authenticate('local', {session: false});