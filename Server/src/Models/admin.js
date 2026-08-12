import bcrypt from "bcrypt";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Login static method

adminSchema.static("login", async function(email, password) {
  // Check if email and password are provided
  if (!email || !password) {
    throw new Error("Please fill all the required fields!");
  }

  // Check if admin exists
  const admin = await this.findOne({ email });

  if (!admin) {
    throw new Error("No admin with such email!")
  }

  // Compare the provided password with the stored hashed password
  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    throw new Error("Incorrect password!");
  }

  return admin;
});

const AdminModel = mongoose.model("Admin", adminSchema);
export default AdminModel;