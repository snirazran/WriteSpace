export class UserAlreadyExists extends Error {
  constructor() {
    super('User already exists');
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('Users not found');
  }
}

export class UserFriendsNotFoundError extends Error {
  constructor() {
    super('User friends not found');
  }
}

export class UserNotAuthorized extends Error {
  constructor() {
    super('User not authorized');
  }
}
