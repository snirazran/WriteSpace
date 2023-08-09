export class UsersNotFoundError extends Error {
  constructor() {
    super('Users not found');
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('Users not found');
  }
}

export class DocumentsNotFound extends Error {
  constructor() {
    super('Documents not found');
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
