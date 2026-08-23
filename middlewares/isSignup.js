const crypto = require("crypto");
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30 روز
};
const COOKIE_NAME = "sessionId";

const generateSessionId = () => {
  return crypto.randomBytes(32).toString("hex");
};
const isSignup = (req, res, next) => {
  let sessionId = req.cookies?.[COOKIE_NAME];

  // console.log('sessionId', sessionId)
  if (!sessionId) {
    sessionId = generateSessionId();

    res.cookie(COOKIE_NAME, sessionId, COOKIE_OPTIONS);

    return next();
  } else {
    res.status(401).json({ message: "تو قبلا ثبت نام کردی" });
  }
};
module.exports = isSignup;
