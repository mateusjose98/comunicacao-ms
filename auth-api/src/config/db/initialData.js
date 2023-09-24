import bcrypt from "bcrypt";
import User from "../../modules/user/model/User.js";

export async function createInitialData() {
  try {
    await User.sync({ force: true });

    let pass = await bcrypt.hash("123", 10);
    await User.create({
      name: "José",
      email: "jose@gmail.com",
      password: pass,
    });
  } catch (err) {
    console.error(err);
  }
}
