require('dotenv').config();
console.log(process.env.MONGO_URI);
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const express = require('express');
const app = express();
const path = require('path'); 
const cors = require('cors');
const userModel = require('./models/user');
const bmiModel = require('./models/bmi');
const activityModel = require('./models/activity');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.VITE_FRONTEND_URL,
    credentials: true
}))
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/profile', async (req, res) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Please log in first",
                success: false
            });
        }

        let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        let user = await userModel.findById(verifiedToken.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        }

        let bmi = await bmiModel.find({ user: user._id }).sort({
            calculatedAt: -1,
            _id: -1
        });
        let activitySorted = await activityModel.find({ user: user._id }).sort({
            calculatedAt: -1,
            _id: -1
        });

        res.json({
            message: "you're successfully in profile",
            success: true,
            user,
            bmi,
            activitySorted
        });
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Invalid or expired session",
            success: false
        });
    }
});

app.put('/profile', async (req, res) => {
    let token = req.cookies.token;
    let {activityId, activityStatus} = req.body;
    console.log(req.body)
    console.log(activityId);
    console.log(activityStatus);
    if(!token) return res.status(401).json({
        message: "something went wrong",
        status: false
    });

    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token);
    let user = await userModel.findById(verifiedToken.id);
    let activity = await activityModel.findByIdAndUpdate({_id: activityId}, {
        activityStatus: !activityStatus
    });

    console.log(activity.activityStatus)


    res.json({
        message:"activityStatusUpdated!!!",
        success:true,
        activity
    })
    
});

app.post('/profile', async (req, res) => {
    let token = req.cookies.token;
    let {activityId} = req.body
    console.log(req.body)
    console.log(activityId);
    if(!token) return res.status(401).json({
        message: "something went wrong",
        status: false
    });

    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token);
    let user = await userModel.findById(verifiedToken.id);
    let activity = await activityModel.findByIdAndDelete({_id: activityId});

    console.log(activity);


    res.json({
        message:"activityDeleted!!!",
        success:true,
        activity
    })
    
});

app.post('/logout', (req, res) => {
    console.log("Logout route hit")
    let token = req.cookies.token
    console.log(token)
    res.clearCookie("token").json({
        success:true,
        message:"logged out successfully"
    });
})


app.post('/addActivity', async (req, res) => {
    let {Activity} = req.body;
    let token = req.cookies.token;
    if(!token) return res.status(401).json({
        message: "something went wrong",
        status: false
    })
    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token);
    let user = await userModel.findById(verifiedToken.id);
    if(!user) return res.status(401).json({
        message: "something went wrong",
        status: false
    });

    let activityUser = await activityModel.create({
        user: user._id,
        activity: Activity
    });

    console.log(activityUser);
    res.json({
        message:"successfully made activity",
        status:true,
        activityUser
    })
})

app.post('/', async (req, res) => {
    let {Height, Weight, Category} = req.body;
    let token = req.cookies.token;
    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token);
    let user = await userModel.findById(verifiedToken.id);
    // console.log(Height);
    // console.log(Weight);

    let editedHeight = Height * 0.3048
    let squareHeight = editedHeight ** 2

    let BMI = (Weight/squareHeight).toFixed(1)
    console.log(BMI)

     if(BMI < 18.5){
        Category = "UnderWeight 🩻"
    } else if(BMI > 18.5 && BMI < 24.9){
        Category = "Healthy Weight 👍"
    } else if(BMI > 25.0 && BMI < 29.9){
        Category = "OverWeight 🥱"
    } else if(BMI >= 30.0){
        Category = "Obese/Heavy Weight 😰"
    }

    let bmi = await bmiModel.create({
        bmi: BMI,
        category: Category,
        user: user._id
    });

    let activity = await activityModel.find({ user: user._id });

    console.log(activity);

    user.bmiHistory.push(bmi._id);
    await user.save();

    user.activityHistory.push(activity._id);
    await user.save();

    res.json({
        success: true,
        bmi
    })

    console.log("bmi is: ", bmi);
});

app.post('/signup', async (req, res) => {
    let {Username, Email, Password} = req.body;
    // console.log(Username);
    console.log(Email);
    console.log(Password);
    let user;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(Password, salt, async(err, hash) => {
        user = await userModel.create({
        username: Username,
        email: Email,
        password: hash
    });
    console.log(user)
        let token = jwt.sign({email: Email, id: user._id}, process.env.JWT_SECRET);
        res.cookie("token", token).json({
            message:"successfully signed In!",
            success: true,
            user
        }); 
        // console.log(user);
    });
    }); 
    // console.log(token);
});

app.post('/login', async (req, res) => {
    let {Email, Password} = req.body;
    let user = await userModel.findOne({email: Email});
    console.log(Email);
    console.log(Password);
    console.log(user);

    bcrypt.compare(Password, user.password, (err, result) => {
        if(!result){
            return res.status(401)
        }

        
    let newLoginToken = jwt.sign({email: Email, id: user._id}, process.env.JWT_SECRET);
    res.cookie("token", newLoginToken).json({
        message: "successfully logged In!",
        success: true,
        user
    });
});
   

});

app.listen(3000, () => {
    console.log("Listening on the port 3000...");
});