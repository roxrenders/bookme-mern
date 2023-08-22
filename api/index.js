const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const { userInfo } = require('os');
const { resolve } = require('path');
const { rejects } = require('assert');

require('dotenv').config() 
const app = express();


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: POST,GET,OPTIONS,PUT,DELETE');
header('Access-Control-Allow-Origin: Content-Type,X-Auth-Token, Origin, Authentication');

app.use(cors({
    origin: 'https://airbnb-clone-mern-f.vercel.app', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
}));



mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });



function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                console.error("Error verifying token:", err);
                reject(err);
            } else {
                console.log("Token verification successful. User data:", userData);
                resolve(userData);
            }
        });
    });
}
    

app.get('/', (req,res)=>{
    res.json('test ok');
});

app.post('/register', async(req, res) => {
    const { name, email, password } = req.body; 
    
    try{
        const existingUser = await User.findOne({ email });
    if (existingUser) {
    return res.status(409).json({ error: 'Email already registered' });
    }
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt), 
        });
        res.json(userDoc);     
    } catch (e) {
        res.status(422).json(e) 
    }
    
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Finding user with email:", email);
        const userDoc = await User.findOne({ email });
        console.log("Found user:", userDoc);
        if (!userDoc) {
            return res.status(404).json({ error: 'User not found' });
        }
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (!passOk) {
            console.log("Incorrect password.");
            return res.status(401).json({ error: 'Incorrect password' });
        }
        jwt.sign(
            {
                email: userDoc.email,
                id: userDoc._id,
            },
            jwtSecret,
            {},
            (err, token) => {
                if (err) {
                    console.error("Error signing JWT:", err);
                    return res.status(500).json({ error: 'Error occurred during login' });
                }
                console.log("Token generated:", token);
                res.cookie('token', token).json(userDoc);
            }
        );
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: 'Error occurred during login', detailedError: error.message });
    }
    
});


app.get('/profile',(req,res)=>{
    const {token} = req.cookies
    if (token)  {
        jwt.verify(token, jwtSecret,{}, async(err,userData)=>{
            if(err) throw err;
         const {name, email, _id} = await User.findById(userData.id); 
            res.json({name,email,_id}); 
        });
    } else{
        res.json(null);
    }
})

app.post('/logout', (req,res)=>{
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    const outputPath = `${__dirname}/uploads/${newName}`;
    
    await imageDownloader.image({
        url: link,
        dest: outputPath,
    });

    const imageUrl = `https://airbnb-clone-mern-server.vercel.app/uploads/${newName}`;
    res.json({ imageUrl }); 
});

const photoMiddleware = multer({ dest: __dirname + '/uploads/' });

app.post('/upload', photoMiddleware.array('photos', 100), async (req, res) => {
    try {
        const uploadedFiles = [];
        for (let i = 0; i < req.files.length; i++) {
            const { path, originalname } = req.files[i];
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = path + '.' + ext;
            fs.renameSync(path, newPath);

            const sanitizedPath = newPath.replace(/\\/g, '/'); // Replace backslashes with forward slashes
            const filenameOnly = sanitizedPath.split('/').pop(); // Get only the filename
            uploadedFiles.push(filenameOnly);
        }
        console.log(uploadedFiles)
        res.json(uploadedFiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during file upload' });
    }
});

app.post('/places', (req,res)=>{ 
    const {token} = req.cookies
    const {title, address, description,
        addedPhotos, perks, extraInfo,
        checkIn, checkOut, maxGuests, price,} = req.body;

    jwt.verify(token, jwtSecret,{}, async(err,userData)=>{
        if(err) throw err;
       const placeDoc = await Place.create({
            owner:userData.id,
            title, address, description,
            photos:addedPhotos, perks, extraInfo,
            checkIn, checkOut, maxGuests,price,
        });
        res.json(placeDoc);
        })
})

app.get('/user-places',(req,res)=>{
    const {token} = req.cookies;    
    jwt.verify(token, jwtSecret,{}, async(err, userData)=>{
    const {id} = userData;
    res.json( await Place.find({owner:id}));
    })  
});

app.get('/places/:id', async(req,res)=>{
    const {id} = req.params;    
    res.json(await Place.findById(id));  
});

app.put('/places', async (req,res) => {
 
    const {token} = req.cookies;
    const {
      id, title,address,addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);
      if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title,address,photos:addedPhotos,description,
          perks,extraInfo,checkIn,checkOut,maxGuests,price,
        });
        await placeDoc.save();
        res.json('ok');
      }
    });
  });

app.get('/places', async (req,res) => {
   
    res.json( await Place.find() );
  });

app.post('/bookings', async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        
        const { name, phone, checkIn, checkOut, numberOfGuest, place, price } = req.body;
        
        const bookingData = {
            name,
            phone,
            checkIn,
            checkOut,
            numberOfGuest,
            place,
            price,
            user: userData.id 
        };

        const placeDoc = await Booking.create(bookingData);
        console.log("Created booking:", placeDoc);
        res.json(placeDoc);

    } catch (err) {
        console.error("Error in /bookings route:", err);
        res.status(500).json({ error: 'An error occurred during booking' });
    }
});

app.get('/bookings',async (req,res)=>{ 
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({user:userData.id}).populate('place'))
})

app.listen(4000, () => {
    console.log('Express server is running on port 4000');
});

