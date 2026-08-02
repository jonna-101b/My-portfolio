import jwt from 'jsonwebtoken';
import UserModel from '../Models/user';

const authenticate = (req, res, next) => {
  // Extract token from Authorization header ("Bearer <TOKEN>")
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded._id).select("_id");
    next(); // Proceed to the actual route handler
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

export default authenticate;