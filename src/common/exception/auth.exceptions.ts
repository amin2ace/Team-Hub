import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

// --- Custom Auth Exceptions ---

export class EmailAlreadyInUseException extends BadRequestException {
  constructor() {
    super('Email is already in use');
  }
}

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super('Invalid email or password');
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('User not found');
  }
}

export class InvalidOrExpiredTokenException extends BadRequestException {
  constructor() {
    super('Invalid or expired token');
  }
}

export class ForbiddenOperationException extends ForbiddenException {
  constructor() {
    super('You do not have permission to perform this operation');
  }
}
