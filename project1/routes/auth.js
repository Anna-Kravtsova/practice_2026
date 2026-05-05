const db = require('../db');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
function createTransporter() {
    return nodemailer.createTransport({
        service: 'gmail' ,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });    
}
router.post('/register', async (req,res) => {
    try {
    const { fio, email, password } = req.body;   
    if (!fio || !email || !password)  {
       return res.send('Заполните все поля'); 
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if(!passwordRegex.test(password)) {
        return res.send('Пароль не подходит требованиям');
    }
    db.get("SELECT * FROM users WHERE email = ?",  [email], async (err, row) => {
        if (err) {
            console.log(err);
            return res.send('Ошибка базы данных');
        }
        if(row) {
            return res.send('Пользователь уже существует');
        }
        const login = email.split('@')[0];
        db.run( 
            "INSERT INTO users (fio, email, login, password) VALUES (?, ?, ?, ?)",
            [fio, email, login, password]
        );
    const verifyLink = 
  `http://localhost:3000/verify?email=${email}`;
    const transporter =  createTransporter();
    const info = await transporter.sendMail({
        from: `"Registration App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject:  "Подтверждение регистрации",
        html: `<p>Перейдите по ссылке для подтверждения</p>
              <a href="${verifyLink}">${verifyLink}</a>`
    });
    return res.send('Письмо отправлено. Проверьте почту');
     });
} catch (err) {
    console.log(err);
    res.send('Ошибка отправки письма');
 }
});
router.post('/login', (req, res) => {
    const{ email, password } = req.body;
    if(!email || !password) {
        return res.send('Заполните все поля');
    }
    db.get(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, user) => {
            if(err) {
                console.log(err);
                return res.send('Ошибка базы данных');
            }
            if(!user) {
                return res.send('Неверный email или пароль');
            }
            if(user.isVerified === 0) {
                return res.send('Подтвердите email');
            }
             return res.send(`Добро пожаловать, ${user.login}`); 
        } 
    );
});                
module.exports = router;