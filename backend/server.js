require('dotenv').config({ path: './config/.env' });

const express = require('express');

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cookieParser());
// === CORS ===

const allowedOrigins = [
  'http://localhost:5173',
  'https://civiconnect-psi.vercel.app', // production frontenddd
  'https://civiconnect-4jeo2sodr-ramsundhar-88s-projects.vercel.app' // Vercel preview
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked: ' + origin));
    }
  },
  credentials: true
}));


// === Middleware ===
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// === Serve Uploaded Files ===
app.use('/uploads', express.static('uploads')); // Important for image access

// === Routes ===
const issueRoute = require('./controller/issueRoute');
const discussionRoute = require('./controller/discussionRoute');
const improvementRoute = require('./controller/improvementRoutes');
const userRoute = require('./controller/user');
const commentRoute = require("./controller/comment")

app.use('/user', userRoute);
app.use('/issue', issueRoute);
app.use('/discussion', discussionRoute);
app.use('/improvement', improvementRoute);
app.use("/comment", commentRoute);


// === Root Route ===
app.get('/', (req, res) => {
    res.json("You are currently in main page");
});

// === MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch((error) => {
    console.error("❌ MongoDB connection error:", error);
});

// === Start Server ===
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
