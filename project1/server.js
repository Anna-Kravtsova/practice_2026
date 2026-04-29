const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const authRoutes = require('./routes/auth');
app.use('/auth' , authRoutes);
app.get('/', (req, res)=>{
    res.send('Registration server is running');
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'views', 'register.html'));
});
app.listen(3000, () => {
   console.log('Server started on port 3000');    
});