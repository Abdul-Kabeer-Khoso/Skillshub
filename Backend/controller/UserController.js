import User from "../model/User.js";
import bcrypt from "bcrypt";
import passport from "../config/passportConfig.js";

export const createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  });

  req.login(user, (err) => {
    if (err) return res.status(500).json({ message: "Login failed" });

    res.json({
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};

export const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    // If authentication failed, Passport sends "info.message"
    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    // Role check
    if (req.body.role && req.body.role !== user.role) {
      return res
        .status(400)
        .json({ message: "Role: mismatch wrong account type" });
    }

    // If authentication is successful → create session
    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.json({
        message: "Login Successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
};

export const auth = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.json({ loggedIn: false });
  }
  res.json({ loggedIn: true, user: req.user });
};
