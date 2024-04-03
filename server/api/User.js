const express = require("express");
require("dotenv").config();
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const path = require("path");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const UserVerification = require("../models/UserVerification");

require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("ready for messages");
  }
});

router.post("/signup", async (req, res) => {
  let { name, email, password, dateOfBirth } = req.body;

  const emailFound = await User.findOne({ email });
  if (emailFound) {
    res.status(403).json({
      status: "failed",
      message: "Email already exists",
    });
    return
  } 
  const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      dateOfBirth: Date(dateOfBirth),
      verified: false,
    });

    const isSuccessful = await sendVerificationEmail(user);

    res.status(201).json({
      status: "success",
      message: "User Registered Successfully",
    });
    return 
});

//send verification email

const sendVerificationEmail = async ({ _id, email }) => {
  const currentUrl = "https://login-server-y81a.onrender.com/";

  const uniqueString = uuidv4() + _id;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify your Email",
    html: `<p>Verify your email address to complete the signup and login into your account</p><p>this link
        <p> Expires in 5 hours</p> <p>Press <a href = ${
          currentUrl + "users/verify/" + _id + "/" + uniqueString
        }>here</a>to proceed.</p>`,
  };

  const salt = await bcrypt.genSalt(10);
  const hashedUniqueString = await bcrypt.hash(uniqueString, salt);

  const newVerification = await UserVerification.create({
    userId: _id,
    uniqueString: hashedUniqueString,
    createdAt: Date.now(),
    expiredAt: Date.now() + 21600000,
  });

  const mailSent = await transporter.sendMail(mailOptions);
  if (mailSent) {
    // res.status(200).json({
    //   status: "success",
    //   message: "Verification Link sent to your email",
    // });
    return true;
  }
  return false;
};

router.get("/verify/:userId/:uniqueStringsss", async (req, res) => {
  let { userId, uniqueStringsss } = req.params;

  const userExists = await UserVerification.find({ userId });
  console.log("userExists", userExists);

  if (!userExists) {
    return res.redirect("user/error");
  }

  const { uniqueString, expiredAt, email } = userExists[0];
  const isUniqueStringCorrect = await bcrypt.compare(
    uniqueStringsss,
    uniqueString
  );

  console.log("isUnique", isUniqueStringCorrect);
  console.log("expiredAt", expiredAt);
  console.log(expiredAt > Date.now());
  console.log(Date.now());

  if (!isUniqueStringCorrect || expiredAt < Date.now()) {
    // Delete verification and user if the unique string is incorrect or expired
    await UserVerification.deleteOne({ userId });
    await User.deleteOne({ _id: userId });
    return res.redirect("/users/error");
  }

  // If verification is successful and not expired, update user verification status
  await UserVerification.deleteOne({ userId });
  await User.updateOne(
    { _id: userId },
    {
      verified: true,
    }
  );

  return res.redirect("/users/success");
});

router.get("/error", async (req, res) => {
  return res.sendFile(path.join(__dirname + "/../ErrorPage/index.html"));
});

router.get("/success", async (req, res) => {
  return res.sendFile(path.join(__dirname + "/../Success/index.html"));
});

router.post("/signin", async (req, res) => {
  var { email, password } = req.body;
  const sentPassword = password;
  const userFound = await User.find({ email });
  console.log(!userFound.length>0)
  if (!userFound.length>0) {
    res.status(403).json({
      status: "failed",
      message: "Email doesn't exists",
    });
    return
  }
  
  var {password} = userFound[0]
  // const hashedPassword = userFound.password;
  const isPasswordCorrect = await bcrypt.compare(sentPassword, password);

  if (!isPasswordCorrect) {
    res.status(403).json({
      status: "failed",
      message: "Password is wrong",
    });
    return
  }

  const { verified } = userFound;
  if (!verified) {
    res.status(403).json({
      status: "failed",
      message: "Email not verified",
    });
    return
  }

  res.status(200).json({
    status: "success",
    message: "Login Successful",
  });
  return
});


module.exports = router;
