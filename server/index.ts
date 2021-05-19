import dotenv from 'dotenv';
import express from 'express';

dotenv.config({
  path: './server/.env'
});

import './core/db';

import { passport } from './core/passport';

const app = express();


app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.send()
  });


app.listen(4000, () => {
    console.log('Server runned!');
})