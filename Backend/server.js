import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import passport from "passport";
import session from "express-session";
import userRoutes from "./routes/userRoutes.js";
import expertRoutes from "./routes/expertRoutes.js";
import learnerRoutes from "./routes/learnerRoutes.js";
import purchaseCourseRoutes from "./routes/purchaseCourseRoutes.js";

dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);
app.use(express.json());

// Session Middleware
app.use(
  session({
    secret: "skillshubsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoutes);
app.use("/expert", expertRoutes);
app.use("/learner", learnerRoutes);
app.use("/purchase", purchaseCourseRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/login", (req, res) => {
  res.send("Login Page");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
