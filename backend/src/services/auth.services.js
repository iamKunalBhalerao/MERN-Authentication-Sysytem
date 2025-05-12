import User from "../models/user.model.js";

const findUserByEmailOrUsername = async (email, username) => {
  return await User.findOne({
    $or: [{ username }, { email }],
  });
};

export { findUserByEmailOrUsername };
