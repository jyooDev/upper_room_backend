type UserRole = 'ORGANIZER' | 'MEMBER';

class User {
  email: string;
  gender: 'M' | 'F' | 'O' | null;
  name: {
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
  };
  dob: Date | null;
  username: string | null;
  role: UserRole;

  constructor(email: string, role: UserRole) {
    ((this.email = email),
      (this.gender = null),
      (this.name = {
        firstName: null,
        middleName: null,
        lastName: null,
      }),
      (this.dob = null),
      (this.username = null),
      (this.role = role));
  }

  toObject() {
    return {
      ...this,
    };
  }
}

export default User;
