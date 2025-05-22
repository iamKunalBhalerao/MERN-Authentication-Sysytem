export const generateOTP = async () => {
  return Math.floor(Math.random() * 900000 + 10000);
};
