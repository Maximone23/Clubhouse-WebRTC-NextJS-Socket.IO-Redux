import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { nanoid } from 'nanoid';
import sharp from 'sharp';
import fs from 'fs';

dotenv.config({
  path: './server/.env'
});
import './core/db';

import { passport } from './core/passport';
import { UserData } from '../pages';
import { Code } from '../models';
import { Axios } from '../core/axios';


declare global {
  namespace Express {
    interface User extends UserData {}
  }
}

const app = express();
const uploader = multer({ 
  storage: multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, './public/avatars/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + nanoid(6) + '.' + file.mimetype.split('/').pop()); 
    }
  })
});

const randomCode = (max: number = 9999, min: number = 1000) => Math.floor(Math.random() * (max - min + 1)) + min;

app.use(passport.initialize());
app.use(express.json())
app.use(cors());


app.post('/upload', uploader.single('photo'), (req, res) => {
  const filePath = req.file.path
  sharp(filePath)
    .resize(150, 150)
    .toFormat('jpeg')
    .toFile(filePath.replace('.png', '.jpeg'), (err) => {
      if (err) {
        throw err
      }
      fs.unlinkSync(filePath);
      res.json({
        url: `/avatars/${req.file.filename.replace('.png', '.jpeg')}`,
      });
    })
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.send(`<script>window.opener.postMessage('${JSON.stringify(req.user)}', '*');window.close();</script>`);
});


app.get('/auth/phone', passport.authenticate('jwt'), async (req, res) => {
  res.json(req.user);
});
app.get('/auth/sms/activate', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userId = req.user.id;
  const smsCode = req.query.code;
  const whereQuery = {code: smsCode, user_id: userId}

  if(!smsCode) {
    return res.status(400).send()
  }

  try {
    const findCode = await Code.findOne({
      where: whereQuery
    });

    if(findCode) {
      await Code.destroy({
        where: whereQuery
      });
      return res.send()
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(500).json({
      message: 'Account activation error',
    })
    
  }
  
});
app.get('/auth/sms', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const phone = req.body.phone;
  const userId = req.user.id;
  const smsCode = randomCode();
  if (!phone) {
    return res.status(400).send();
  }

  try {
    // await Axios.get(`https://sms.ru/sms/send?api_id=${process.env.SMS_API_KEY}&to=79995498512&msg=${smsCode}`);

    await Code.create({
      code: randomCode(),
      user_id: userId,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error when sending SMS',
    })
    
  }
  
});

app.listen(4000, () => {
    console.log('Server runned!');
})