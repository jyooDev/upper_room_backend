import User, { IUser } from "../models/user.model"
import NotFoundError from "../errors/NotFoundError";
class UsersController {
  async create(userData: IUser) {
    try{
      const user = await User.create(userData);
      return user;
    }catch(error){
      throw error;
    }
  }

  async read() {
    try{
      const users = await User.find()
      return users
    }catch(error){
      throw error;
    }
  }

  update() {
    return "SHOULD UPDATE USER"
  }

  async delete(userId: String) {
    try{
      const user = await User.deleteOne({_id: userId});
      if(user.deletedCount === 0){
        throw new NotFoundError(`User ${userId} Not Found.`);
      }
      return user;
    }catch(error){
      throw error;
    }
  }
}

export default UsersController