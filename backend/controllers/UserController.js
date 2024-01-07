const loginUser = async (req, res) => {
  const { email, password } = req.body;
  res.json({ message: "Logging IN" });
};
const registerUser = async () => {
  res.json({ message: "REGISTERNG" });
};

const logout = async () => {
  res.json({ message: "LoggedOut" });
};

export { loginUser, registerUser, logout };
