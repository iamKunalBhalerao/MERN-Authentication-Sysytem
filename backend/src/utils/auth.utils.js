import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async ({ password, hashedPassword }) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
