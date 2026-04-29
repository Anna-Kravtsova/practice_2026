const express = require('express');
const router = express.Router();
router.post('/register', (req,res) => {
    const { fio, email, password } = req.body;   
    if (!fio || !email || !password)  {
       return res.send('Заполните все поля'); 
    }
    res.send('Регистрация завершена')
});
module.exports = router;