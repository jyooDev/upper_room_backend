import User from "../models/user.model"

class UsersController {
  async create() {
    console.log("CREATE USER")
    const user = new User({ email: 'test@test.test' })
    await user.save()
    console.log('user =', user)
    return user
  }

  read() {
    return "SHOULD LIST USERS"
  }

  update() {
    return "SHOULD UPDATE USER"
  }

  delete() {
    return "SHOUDL DELETE USER"
  }
}

export default UsersController