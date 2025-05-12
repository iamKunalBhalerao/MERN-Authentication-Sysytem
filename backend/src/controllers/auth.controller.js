import zod from "zod";

const signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const requireBody = zod.object({
      username: zod.string().min(6).max(50),
      email: zod.string().min(5).max(150).email(),
      password: zod.string().min(6).max(200),
    });

    const parseRequireBody = requireBody.safeParse(req.body);

    if (!parseRequireBody.success) {
      res.status(400).json({
        message: "Invalid Credentials !!!",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong While singing In User !!!",
    });
  }
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
