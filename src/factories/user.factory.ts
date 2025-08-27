import { ObjectId } from 'mongoose';

type UserRole = 'ORGANIZER' | 'MEMBER';

class User {
  _id: string;
  email: string;
  gender: 'M' | 'F' | null;
  name: {
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
  };
  dob: Date | null;
  username: string | null;
  role: UserRole;

  constructor(id: string, email: string, role: UserRole) {
    ((this._id = id),
      ((this.email = email),
      (this.gender = null),
      (this.name = {
        firstName: null,
        middleName: null,
        lastName: null,
      }),
      (this.dob = null),
      (this.username = null),
      (this.role = role)));
  }

  toObject() {
    return {
      ...this,
    };
  }
}

export default User;
