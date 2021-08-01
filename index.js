const mongoose=require('mongoose')
const express=require('express');
const helmet = require('helmet');
const app=express();
require('dotenv').config()
// const multer= require('multer')
const fileUpload = require('express-fileupload');
//exporting routes
const mailroute=require('./routes/mail')
const userroute=require('./routes/users')
const coursesroute=require('./routes/courses')
const razorpayroute=require('./routes/razorpay')
const reviewroute=require('./routes/reviews')
const promocoderoute=require('./routes/promocodes')

mongoose.connect('mongodb://localhost:27017',{ useUnifiedTopology: true , useNewUrlParser: true , useFindAndModify:true }).then(()=>console.log('db is connected ')).catch((err)=>console.log(`db is failed ${err}`))

// //middleware  
app.use(express.json());
app.use(helmet());
const cors = require('cors');
app.use(cors());
app.use('/mail',mailroute);
app.use('/user',userroute);
app.use('/courses',coursesroute);
app.use('/razorpay',razorpayroute);
app.use('/review',reviewroute);
app.use('/promocode',promocoderoute);
app.use(fileUpload());

app.get('/',(req,res)=>{
    res.send('app is running')

})

const multer = require('multer');


// multer fo single file
var storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

var upload = multer({ storage:storage })


app.post('/image',upload.single("file"),(req,res)=>{
    res.send()

})

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`server running on port number ${PORT}` )
    console.log(`server running on port number http://localhost:${PORT}` )
})

