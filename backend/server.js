const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

let lostPhones = []; // simple database (step 3-এ real DB হবে)

app.post("/report", (req, res) => {
  const { imei, brand, email } = req.body;

  if (!imei || imei.length !== 15) {
    return res.status(400).json({ error: "Invalid IMEI" });
  }

  const record = {
    imei,
    brand,
    email,
    date: new Date().toISOString()
  };

  lostPhones.push(record);

  sendEmail(email, imei, brand);

  res.json({ success: true, message: "Lost phone report saved" });
});

function sendEmail(userEmail, imei, brand) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  transporter.sendMail({
    from: `"Find My Phone" <${process.env.EMAIL}>`,
    to: userEmail,
    subject: "Lost Phone Record Saved",
    text: `Your phone (${brand}) with IMEI ${imei} has been recorded. Follow legal recovery steps.`
  });
}

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
