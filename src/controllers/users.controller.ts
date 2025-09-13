import User, { IUser } from '../models/user.model';
import NotFoundError from '../errors/NotFoundError';

import UserFactory from '../factories/user.factory';

class UsersController {
  async create(userData: IUser) {
    try {
      const createUser = new UserFactory(
        userData._id,
        userData.email,
        userData.role,
      );
      const user = await User.create(createUser.toObject());
      return {
        user,
        message: 'User created successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async read(userId?: string) {
    try {
      if (userId) {
        const user = await User.findById(userId).exec();
        if (!user) {
          throw new NotFoundError(`User ${userId} Not Found.`);
        }
        return {
          user,
          message: `Successfully fetched one user.`,
        };
      }

      const users = await User.find();
      return {
        users,
        message: `Successfully fetched all users`,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    userId: string,
    {
      name,
      dob,
      gender,
      username,
    }: { name: string; dob?: Date; gender?: string; username?: string },
  ) {
    try {
      if (!userId) {
        throw new Error('UserID is required');
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { name, dob, gender, username },
        { new: true, runValidators: true },
      );

      if (!user) {
        throw new NotFoundError('User not found');
      }

      return { message: 'Profile updated successfully', user };
    } catch (error) {
      throw error;
    }
  }

  async updateLastLogin(userId: string) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { lastLogin: new Date() },
        { new: true, runValidators: true },
      );

      if (!user) {
        throw new NotFoundError('User not found');
      }

      return { message: 'Last login updated successfully', user };
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: string) {
    try {
      const user = await User.deleteOne({ _id: userId });
      if (user.deletedCount === 0) {
        throw new NotFoundError(`User ${userId} Not Found.`);
      }
      return {
        user,
        message: `Successfully deleted user ${userId}`,
      };
    } catch (error) {
      throw error;
    }
  }

  async exists(email: string) {
    console.log(email);
    try {
      const find = await User.findOne({
        email,
      });
      return find || false;
    } catch (error) {
      throw error;
    }
  }
}

export default UsersController;
