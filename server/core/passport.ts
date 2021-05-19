import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';

passport.use('github',
    new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/github/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(accessToken, refreshToken, profile, cb);
    const user = {
      fullname: profile.displayName,
      avatar: profile.photos?.[0].value,
    }
  }
));

export { passport };