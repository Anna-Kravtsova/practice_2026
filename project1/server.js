const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const authRoutes = require('./routes/auth');
app.use('/auth' , authRoutes);
app.get('/', (req, res)=>{
    res.send('Registration server is running');
});
app.listen(3000, () => {
   console.log('Server stared on port 3000');    
});