class UsersNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

class UserNotAuthorized extends Error {
  constructor() {
    super('User not authorized');
  }
}
