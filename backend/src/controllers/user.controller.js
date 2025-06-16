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

export { users };
