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

export { signin, signup };
