import { User } from "../models/user.model";

class AuthService {
  async findUserByEmail(email: string, done: any) {
    const existingUser = await User.findOne({
      where: { email: email },
    });
    if (!existingUser) {
      return done(null, false, { message: "Usuario no encontrado" });
    }
    return existingUser;
  }
  async findOrCreateGoogleUser(profile: any) {
    const existingUser = await User.findOne({
      where: { googleId: profile.id },
    });

    if (existingUser) {
      return existingUser;
    }

    const newUser = new User({
      googleId: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value,
      photo:
        profile.photos && profile.photos.length > 0
          ? profile.photos[0].value
          : "https://via.placeholder.com/150",
    });

    await newUser.save();
    return newUser;
  }
  
  async findUserById(id: string) {
    return await User.findByPk(id);
  }
}

export const authService = new AuthService();
