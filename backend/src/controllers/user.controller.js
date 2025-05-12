const signin = async (req, res) => {
  res.status(200).json({
    message: "This is Sign In Route",
  });
};

const signup = async (req, res) => {
  res.status(200).json({
    message: "This is Sign Up Route",
  });
};

const logout = async (req, res) => {
  res.status(200).json({
    message: "This is Log Out Route",
  });
};

const users = async (req, res) => {
  res.status(200).json({
    message: "This is Users Route",
  });
};

export { signin, signup, logout, users };
