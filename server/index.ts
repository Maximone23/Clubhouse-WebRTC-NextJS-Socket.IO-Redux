import dotenv from 'dotenv';
import express from 'express';

dotenv.config({
  path: './server/.env'
});
import './core/db';

import { passport } from './core/passport';

const app = express();

app.use(passport.initialize());


app.get('/upload', passport.authenticate('github'));

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.send(`<script>window.opener.postMessage('${JSON.stringify(req.user)}', '*');window.close();</script>`);
  });


app.listen(4000, () => {
    console.log('Server runned!');
})