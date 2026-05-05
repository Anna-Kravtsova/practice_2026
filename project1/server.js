const db = require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const authRoutes = require('./routes/auth');
app.use('/auth' , authRoutes);
app.get('/', (req, res)=>{
    res.send('Registration server is running');
});
app.get('/register', (req, res) => {
    res.redirect('/register.html');
});
app.get('/login', (req, res) => {
    res.redirect('/login.html');
});
app.get('/verify', (req, res) => {
    const email = req.query.email;
    if(!email) {
        return res.send('Нет email для подтверждения');
    }
    db.run(
        "UPDATE users SET isVerified = 1 WHERE email = ?",
        [email],
        function(err) {
            if (err) {
                console.log(err);
                return res.send('Ошибка');
        }
        if (this.changes === 0) {
            return res.send('Пользователь не найден');
        }
    res.send(`Пользователь ${email} успешно подтвержден`);
        }
    );
});
app.listen(3000, () => {
   console.log('Server started on port 3000');    
});
