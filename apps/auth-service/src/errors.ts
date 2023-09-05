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

export class InvalidDetails extends Error {
  constructor() {
    super('Invalid email or password');
  }
}

export class UserNotAuthorized extends Error {
  constructor() {
    super('User not authorized');
  }
}

export class ServiceNotRunning extends Error {
  constructor() {
    super('Service not running');
  }
}
