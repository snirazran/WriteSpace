import e from 'express';

export class UserNotFoundError extends Error {
  constructor() {
    super('Users not found');
  }
}

export class ProjectNotFoundError extends Error {
  constructor() {
    super('Project not found');
  }
}

export class DocumentsNotFound extends Error {
  constructor() {
    super('Documents not found');
  }
}

export class CommentNotFound extends Error {
  constructor() {
    super('Comment not found');
  }
}

export class DocumentNotFound extends Error {
  constructor() {
    super('Document not found');
  }
}

export class InvalidDetails extends Error {
  constructor() {
    super('Invalid details');
  }
}

export class UserNotAuthorized extends Error {
  constructor() {
    super('User not authorized');
  }
}
