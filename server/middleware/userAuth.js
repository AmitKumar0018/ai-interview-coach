import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Please Login First",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log(`error from middleware userAuth ${error}`);
    return res.status(500).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default userAuth;
