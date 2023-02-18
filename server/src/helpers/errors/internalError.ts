/**
 * Created by WebStorm.
 */

import format from './format';
import * as messages from './message';
import { internalCode } from '../response';

interface DomainError {
    data: any;
    status: number;
    originalError?: Error;
}

class DomainError extends Error implements DomainError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ResourceNotFoundError extends DomainError {
    constructor(key: string, data?: any, error?: Error) {
        super(messages.notFoundResource(key));
        this.data = format(
            internalCode.CLIENT_ERROR.NOT_FOUND,
            messages.notFoundResource(key),
            data,
        );
        this.status = 404;
        this.originalError = error;
    }
}

class ValueMissMatch extends DomainError {
    constructor(key: string, data: any, error: Error) {
        super(messages.somethingWentWrong);
        this.data = format(
            internalCode.SERVER_ERROR.VALUE_MISSMATCH,
            messages.somethingWentWrong,
            data,
        );
        this.status = 500;
        this.originalError = error;
    }
}

class InvalidBodyError extends DomainError {
    constructor(key: string, data: any) {
        super(messages.invalidBody(key));
        this.data = format(
            internalCode.CLIENT_ERROR.BAD_REQUEST,
            messages.invalidBody(key),
            data,
        );
        this.status = 400;
    }
}

class InCompleteKeyError extends DomainError {
    constructor(key: string, data?: any, placement = '') {
        super(messages.incompleteKey(key, placement));
        this.data = format(
            internalCode.CLIENT_ERROR.BAD_REQUEST_KEY,
            messages.incompleteKey(key, placement),
            data,
        );
        this.status = 400;
    }
}

class InCompleteValueError extends DomainError {
    constructor(key: string, data: any, placement = 'body') {
        super(messages.incompleteValue(key, placement));
        this.data = format(
            internalCode.CLIENT_ERROR.BAD_REQUEST_VALUE,
            messages.incompleteValue(key, placement),
            data,
        );
    }
}

class InvalidEmailOrPasswordError extends DomainError {
    constructor(data: any) {
        super(messages.invalidEmailOrPassword());
        this.data = format(
            internalCode.CLIENT_ERROR.INVALID_AUTH,
            messages.invalidEmailOrPassword(),
            data,
        );
        this.status = 400;
    }
}

class InvalidTypeError extends DomainError {
    constructor(key: string, data?: any) {
        super(messages.invalidType(key));
        this.data = format(
            internalCode.CLIENT_ERROR.BAD_REQUEST_TYPE,
            messages.invalidType(key),
            data,
        );
    }
}

class InvalidFileTypeError extends DomainError {
    constructor(key: string, message: string, data?: any) {
        super(messages.invalidType(key));
        this.data = format(
            internalCode.CLIENT_ERROR.BAD_REQUEST_TYPE,
            messages.invalidFileType(key, message),
            data,
        );
    }
}

class FindResourceError extends DomainError {
    constructor(key: string, data: any, error?: Error) {
        super(messages.errorFindResource(key));
        this.data = format(
            internalCode.SERVER_ERROR.FAILED_FIND_RESOURCE,
            messages.errorFindResource(key),
            data || undefined,
        );
        this.originalError = error;
    }
}

class CreateResourceError extends DomainError {
    constructor(key: string, data: any, error?: Error) {
        super(messages.errorCreateResource(key));
        this.data = format(
            internalCode.SERVER_ERROR.FAILED_CREATE_RESOURCE,
            messages.errorCreateResource(key),
            data || undefined,
        );
        this.originalError = error;
    }
}

class UpdateResourceError extends DomainError {
    constructor(key: string, data: any, error?: Error) {
        super(messages.errorUpdateResource(key));
        this.data = format(
            internalCode.SERVER_ERROR.FAILED_UPDATE_RESOURCE,
            messages.errorUpdateResource(key),
            data || undefined,
        );
        this.originalError = error;
    }
}

class DeleteResourceError extends DomainError {
    constructor(key: string, data: any, error?: Error) {
        super(messages.errorDeleteResource(key));
        this.data = format(
            internalCode.SERVER_ERROR.FAILED_DELETE_RESOURCE,
            messages.errorDeleteResource(key),
            data,
        );
        this.originalError = error;
    }
}

class InvalidFormatError extends DomainError {
    constructor(key: string, data: any) {
        super(messages.invalidFormat(key));
        this.data = format(
            internalCode.CLIENT_ERROR.BAD_REQUEST_FORMAT,
            messages.invalidFormat(key),
            data,
        );
    }
}

class AlreadyUsedError extends DomainError {
    constructor(key: string, data?: any) {
        super(messages.alreadyUsed(key));
        this.data = format(
            internalCode.CLIENT_ERROR.DUPLICATE_VALUE,
            messages.alreadyUsed(key),
            data,
        );
        this.status = 400;
    }
}

class DuplicateError extends DomainError {
    constructor(key: string, data?: any) {
        super(messages.duplicate(key));
        this.data = format(
            internalCode.CLIENT_ERROR.DUPLICATE_VALUE,
            messages.duplicate(key),
            data,
        );
        this.status = 400;
    }
}


class InvalidOptionError extends DomainError {
    constructor(key: string, data: any) {
        super(messages.invalidOption(key));
        this.data = format(
            internalCode.CLIENT_ERROR.OUTSIDE_OPTION,
            messages.invalidOption(key),
            data || undefined,
        );
    }
}

class LoginError extends DomainError {
    constructor(data: any) {
        super(messages.loginError());
        this.data = format(
            internalCode.CLIENT_ERROR.INVALID_AUTH,
            messages.loginError(),
            data,
        );
    }
}

class UnauthorizedError extends DomainError {
    constructor(data?: any) {
        super(messages.unauthorized());
        this.data = format(
            internalCode.CLIENT_ERROR.UNAUTHORIZED,
            messages.unauthorized(),
            data,
        );
        this.status = 401;
    }
}


class Forbidden extends DomainError {
    constructor(key?: string, data?: any) {
        super(messages.forbidden());
        this.data = format(
            internalCode.CLIENT_ERROR.FORBIDDEN,
            messages.forbidden(),
            data,
        );
        this.status = 403;
    }
}

class GeneralError extends DomainError {
    constructor(key: string, data: any) {
        super(messages.generalRequestErrors(key));
        this.data = format(
            internalCode.CLIENT_ERROR.GENERAL_ERRORS,
            messages.generalRequestErrors(key),
            data,
        );
        this.status = 400;
    }
}

class UnknownError extends DomainError {
    constructor(key?: string, data?: any, error?: Error) {
        super(messages.errorFindResource(key));
        this.data = format(
            internalCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
            messages.somethingWentWrong,
            data || undefined,
        );
        this.originalError = error;
    }
}

class InsufficientBalance extends DomainError {
    constructor(key?: string, data?: any) {
        super(messages.somethingWentWrong);
        this.data = format(internalCode.CLIENT_ERROR.INSUFFICIENT_BALANCE, messages.somethingWentWrong, data);
    }
}

export {
    ResourceNotFoundError,
    InvalidBodyError,
    InCompleteKeyError,
    InCompleteValueError,
    InvalidEmailOrPasswordError,
    InvalidTypeError,
    InvalidFileTypeError,
    FindResourceError,
    CreateResourceError,
    UpdateResourceError,
    DeleteResourceError,
    InvalidFormatError,
    AlreadyUsedError,
    InvalidOptionError,
    LoginError,
    UnauthorizedError,
    Forbidden,
    GeneralError,
    ValueMissMatch,
    UnknownError,
    InsufficientBalance,
    DuplicateError,
};
