import jwt from "jsonwebtoken";

const AuthUser = async (req) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  console.log("token", token);

  if (!token) return false;

  try {
    const extractAuthUserInfo = jwt.verify(token, "default_secret_key");

    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default AuthUser;
