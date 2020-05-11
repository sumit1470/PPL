const router = require('express').Router();
const api = require('./api');
const multer = require('multer');
const userdb = require('./RegisterSchema');
const postdb = require('./PostSchema');
const categorydb = require('./CategorySchema');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
const keys = require('./config/keys/auth-key');

//set sgMail api key
sgMail.setApiKey(keys.sendgrid.key);

const DIR = './Uploads/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname + "-" + new Date().toLocaleTimeString();
        cb(null, fileName);
    }
});

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == 'image/gif') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

router.post('/checkUsername', async (req, res) => {
    try {
        console.log("Request body in checkUsername: " + JSON.stringify(req.body));
        const findUsername = await api.findUsername(req.body);
        if (!findUsername) {
            console.log("Username is not find");
            res.send('0');
        }
        else {
            console.log('Username is: ' + findUsername);
            res.send('1');
        }
    } catch (err) {
        console.log('Error in 1st catch: ' + err);
    }
})

router.post('/signup', async (req, res) => {

    try {
        console.log('Request body: ' + JSON.stringify(req.body));
        const findEmail = await api.findEmail(req.body);
        if (!findEmail) {
            const registerUser = await api.registerUser(req.body);
            const findEmail1 = await api.findEmail(req.body);
            const contentHtml = `<p>Click this verification link to get verified-<a href="http://192.168.43.23:3002/verify?id=${findEmail1._id}">Click Here.</a></p><strong>This email is only for verfication purpose so don't reply on this mail.</strong>`
            const msg = {
                to: findEmail1.email,
                from: "sumit.gupta@daffodilsw.com",
                subject: "Verification Email from PPL 🙂",
                text: "Thankyou for choosing us. Best Regards",
                html: contentHtml
            };
            sgMail.send(msg).then(resp => {
                console.log("Response from sending email: " + JSON.stringify(resp));
            }).catch(err => { console.log("Error in sending email /signup: " + JSON.stringify(err)) });
            console.log('Data saved: ' + registerUser);
            res.send('0');
        }
        else {
            console.log("Email is already registered");
            res.send('1');
        }
    }
    catch (err) {
        console.log("error in 2nd catch: ", err);
    }
})

router.get('/verify', (req, res) => {
    // res.send("Query in /verify: "+req.query.id);
    userdb.findOne({ _id: req.query.id }, (err, result) => {
        if (err) {
            console.log("Error in finding email: " + err);
        }
        else if (!result) {
            res.send("<center><strong>This account is not yet registered. Thankyou</strong></center>");
        }
        else {
            userdb.updateOne({ _id: req.query.id }, { $set: { verified: true } }, (err, response) => {
                if (err) {
                    console.log("Error in update verified /verify: " + err);
                }
                else {
                    res.send("<center><strong>Verified Successfully. Now you can go to the login page. Thankyou</strong></center>");
                }
            })
        }
    })
})

router.post("/user", async (req, res) => {
    console.log("Reqest body of /user: " + JSON.stringify(req.body));
    try {
        const findEmail = await api.findEmail(req.body);
        if (!findEmail) {
            res.send('0');
        } else {
            console.log("Respone from api findEmail: " + findEmail);
            res.send(findEmail);
        }
    } catch (err) {
        console.log("Err in /user catch: " + err);
    }
})

router.post('/login', async (req, res) => {
    try {
        const findEmail = await api.findEmail(req.body);
        if (!findEmail) {
            res.send('0');
        }
        else if (findEmail.verified === false) {
            res.send("3");
        }
        else {
            const findPassword = await api.findPassword(req.body);
            if (!findPassword) {
                res.send('2');
            }
            else {
                res.send(findEmail);
            }
        }
    } catch (err) {
        console.log('err in 3rd catch: ' + err);
    }
})

router.post("/forgotpassword", async (req, res) => {
    const findEmail = await api.findEmail(req.body);
    if (!findEmail) {
        res.send("0");
    }
    else if (!findEmail.verified) {
        res.send("3");
    }
    else {
        const contentHtml = `<p>Reset your password by clicking this given link: <a href="http://192.168.43.23:3002/resetpassword?id=${findEmail._id}">Click Here </a><strong>Thankyou.</strong></p>`
        const msg = {
            to: findEmail.email,
            from: "sumit.gupta@daffodilsw.com",
            subject: "Reset Your PPL password",
            text: "Reset your password.",
            html: contentHtml
        };

        sgMail.send(msg).then(resp => {
            console.log("Response from forgot-password email: " + JSON.stringify(resp));
            res.send("1");
        }).catch(err => { console.log("Error in sending email /forgotpassword: " + JSON.stringify(err)) });
    }
})

router.get('/resetPassword', (req, res) => {
    console.log("Reques id: " + req.query.id);
    res.render("Reset_Password", { id: req.query.id });
})

router.post('/resetpass', (req, res) => {
    // console.log("Request id in /resetpass: "+JSON.stringify(req.query));
    // console.log("Request body in /resetpass: "+JSON.stringify(req.body));
    if (req.body.newpass != req.body.confirmpass) {
        res.send("<center><strong>Your password didn't match. Please try again</strong></center>")
    }
    else {
        userdb.updateOne({ _id: req.query.id }, { $set: { password: req.body.newpass } },(err,result)=>{
            if(err){
                console.log("Error in updating password /resetpass: "+err);
            }else{ 
                res.send("<center><strong style={color: 'green'}>* Your password has successfully changed </strong></center>")
            }
        })
    }
})

router.post('/uploadpost', upload.single('image'), async (req, res) => {
    // console.log('Request Body for upload post: '+JSON.stringify(req.body));
    console.log('Request File for upload post: ' + JSON.stringify(req.file));
    req.body.image = req.file.filename;
    // console.log('Request Body for upload post: '+JSON.stringify(req.body));
    req.body.date = new Date().toDateString();
    console.log('Request Body for upload post: ' + JSON.stringify(req.body));
    req.body.time = new Date().toLocaleTimeString();
    req.body.likes = [];
    req.body.comments = [];
    console.log("Request body in Upload post: " + JSON.stringify(req.body));
    console.log('Request Body for upload post: ' + JSON.stringify(req.body));
    try {
        const postUpload = await api.uploadPost(req.body);
        console.log("Response from server: " + postUpload);
        res.send(postUpload);
    } catch (err) {
        res.send('0');
        console.log("Err in 4th catch: " + err);
    }
})

router.get("/showpost", (req, res) => {
    postdb.find({}, (err, result) => {
        if (err) {
            console.log("Err in showing posts: " + err);
            res.send('0');
        } else {
            console.log("All Posts: " + result);
            res.send(result);
        }
    })
})

router.post('/uploadcategory', upload.single('categoryImage'), async (req, res) => {
    console.log("Request body in upload category: " + JSON.stringify(req.body));
    console.log('Request file in category upload: ' + JSON.stringify(req.file));
    req.body.categoryImage = req.file.filename;

    try {
        const categoryUpload = await api.uploadCategory(req.body);
        console.log("Response sent from Backend: " + JSON.stringify(categoryUpload));
        res.send(categoryUpload);
    } catch (err) {
        res.send('0');
        console.log("Error in 5th catch: " + err);
    }
})


router.get('/showcategory', (req, res) => {
    categorydb.find({}, (err, result) => {
        if (err) {
            console.log("Err in show categories: " + err);
            res.send('0');
        }
        else {
            console.log("Result sent by Backend: " + result);
            res.send(result);
        }
    })
})

router.post('/singlepost', (req, res) => {
    console.log("RequestBody in singlepost: " + JSON.stringify(req.body));
    postdb.findOne({ _id: req.body.id }, (err, result) => {
        if (err) {
            conssole.log("Err in single post call: " + err);
            res.send("0");
        }
        else {
            console.log("Result in single post call: " + result);
            res.send(result);
        }
    })
})

router.post('/likes', async (req, res) => {
    // console.log("Request body in /likes: "+JSON.stringify(req.body));
    try {
        const findPost = await api.findPost(req.body);
        res.send(findPost);
    } catch (err) {
        console.log("Error in 6th catch: " + err);
        res.send('0');
    }


})

router.post('/comment', async (req, res) => {
    req.body.replies = [];
    console.log("Request body of /comment: " + JSON.stringify(req.body));
    try {
        const commentUpload = await api.uploadComment(req.body);
        console.log("Response from promise: " + commentUpload);
        res.send(commentUpload);
    } catch (err) {
        console.log("Err in 7th catch: " + err);
    }
})

router.post('/replycomment', async (req, res) => {
    console.log("Request body of /replycomment: " + JSON.stringify(req.body));
    try {
        const replyUpload = await api.uploadReply(req.body);
        console.log("Response by api uploadReply: " + replyUpload);
        res.send(replyUpload);
    } catch (err) {
        console.log("Error in 8th catch: " + err);
        res.send('0');
    }
})

router.post('/changepassword', (req, res) => {
    userdb.updateOne({ email: req.body.email }, { $set: { password: req.body.password } }, (err, result) => {
        // console.log("Result in /changepassword in routes.js: "+JSON.stringify(result));
        if (err) {
            console.log("Error in /changepassword: " + err);
            res.send("0");
        }
        else if (result['nModified'] === 0) {
            res.send('2');
        }
        else {
            res.send("1");
        }
    })
})

// router.post('/deletecomment',async (req,res)=>{
//     // console.log("Request body in /deletecomment: "+JSON.stringify(req.body));
//     try{
//         const commentDelete = await api.deleteComment(req.body);
//         console.log("Response from api deletecomment: "+JSON.stringify(commentDelete));
//         res.send(commentDelete);
//     }catch(err){
//         console.log("Error in 9th catch: "+err);
//         res.send("0");
//     }
// })

module.exports = router;