import jwt from "jsonwebtoken";
import { headers } from "../../next.config";

const AuthUser = async (req) => {
  console.log(req.headers.get("Authorization"));
  const token = req.headers.get("Authorization")?.split(" ")[1];
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
