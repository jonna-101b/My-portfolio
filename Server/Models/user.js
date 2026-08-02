import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

userSchema.static("login", async function(email, password) {
  // Check if email and password are provided
  if (!email || !password) {
    throw new Error("Please fill all the required fields!");
  }

  // Check if user exists
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("No user with such email!")
  }

  // Compare the provided password with the stored hashed password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password!");
  }

  return user;
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;