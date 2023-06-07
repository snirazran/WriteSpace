export class UserNotFoundError extends Error {
  constructor() {
    super('Users not found');
  }
}

export class ProjectsNotFound extends Error {
  constructor() {
    super('Projects not found');
  }
}

export class ProjectNotFound extends Error {
  constructor() {
    super('Project not found');
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
