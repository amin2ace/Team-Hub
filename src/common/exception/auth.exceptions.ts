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

export class HashGenerationException extends UnauthorizedException {
  constructor() {
    super('Bcrypt hash generation failed');
  }
}

export class HashComparisonException extends UnauthorizedException {
  constructor() {
    super('Bcrypt hash comparison failed');
  }
}

export class AuthorizationNotFoundException extends UnauthorizedException {
  constructor() {
    super('Authorization header missed');
  }
}

export class BearerNotFoundException extends UnauthorizedException {
  constructor() {
    super('Authorization bearer misformatted');
  }
}

export class TokenNotFoundException extends UnauthorizedException {
  constructor() {
    super('Authorization token not found');
  }
}

export class TokenInvalidException extends UnauthorizedException {
  constructor() {
    super('Authorization token not valid');
  }
}

export class TokenVerificationException extends UnauthorizedException {
  constructor(private readonly error: any) {
    super('Authorization token verification failed', { description: error });
  }
}
