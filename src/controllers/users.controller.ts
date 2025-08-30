import User, { IUser } from '../models/user.model';
import NotFoundError from '../errors/NotFoundError';

import UserFactory from '../factories/user.factory';

class UsersController {
  async create(userData: IUser) {
    try {
      console.log('userData', userData);
      const createUser = new UserFactory(
        userData._id,
        userData.email,
        userData.role,
      );
      const user = await User.create(createUser.toObject());
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async read(userId?: string) {
    try {
      if (userId) {
        const user = await User.findById(userId).exec();
        if (!user) throw NotFoundError;
        return user;
      }

      const users = await User.find();
      return users;
    } catch (error) {
      if (error === NotFoundError) return null;
      throw error;
    }
  }

  async update(req, res, next) {
    try {
      const userId = req.params.userId;
      const { name, dob, gender, username } = req.body.userProfile;
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, dob, gender, username },
        { new: true, runValidators: true },
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res
        .status(200)
        .json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      next(error);
    }
  }

  async delete(userId: string) {
    try {
      const user = await User.deleteOne({ _id: userId });
      if (user.deletedCount === 0) {
        throw new NotFoundError(`User ${userId} Not Found.`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async exists(email: string) {
    const find = await User.findOne({
      email,
    });
    return find;
  }
}

export default UsersController;
