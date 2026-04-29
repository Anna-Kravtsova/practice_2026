const express = require('express');
const router = express.Router();
router.post('/register', (req,res) => {
    const { fio, email, password } = req.body;   
    if (!fio || !email || !password)  {
       return res.send('Заполните все поля'); 
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if(!passwordRegex.test(password)) {
        return res.send('Пароль не подходит требованиям');
    }
    res.send('Регистрация завершена')
});
module.exports = router;