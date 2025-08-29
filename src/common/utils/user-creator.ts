import { randomBytes } from 'crypto';
import { Model } from 'mongoose';
import { ConflictException } from '@nestjs/common';
import { UserDocument } from 'src/user/schema/user.schema';

export async function createTeacherUser(
  fullName: string,
  email: string,
  role: string,
  userModel: Model<UserDocument>,
) {
  // 1. Check if email already exists
  const existingUser = await userModel.findOne({ email: email }).exec();
  if (existingUser) {
    throw new ConflictException(`User with email "${email}" already exists`);
  }

  // 2. Generate random password
  const password = randomBytes(4).toString('hex'); // 8-char random password

  // 3. Create user
  const user = new userModel({
    name: fullName,
    email: email,
    password, // ⚠️ hash with bcrypt in production
    role,
  });

  return await user.save();
}
