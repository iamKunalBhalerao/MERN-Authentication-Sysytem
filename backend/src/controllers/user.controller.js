import User from "../models/user.model.js";

// See All Users
const users = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: "All Users Fetched Successfully.",
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error While Fteching Users.",
    });
  }
};

const getUserData = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      userData: {
        userName: user.username,
        email: user.email,
        IsemailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error While Fteching Users.",
    });
  }
};

export { users, getUserData };
