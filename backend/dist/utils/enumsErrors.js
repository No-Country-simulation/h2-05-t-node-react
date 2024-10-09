"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpResponse = exports.httpStatus = void 0;
var httpStatus;
(function (httpStatus) {
    httpStatus[httpStatus["OK"] = 200] = "OK";
    httpStatus[httpStatus["BAD_REQUEST_ERROR"] = 400] = "BAD_REQUEST_ERROR";
    httpStatus[httpStatus["INVALID_TYPE_ERROR"] = 400] = "INVALID_TYPE_ERROR";
    httpStatus[httpStatus["DATA_BASE_ERROR"] = 500] = "DATA_BASE_ERROR";
    httpStatus[httpStatus["ROUTING_ERROR"] = 500] = "ROUTING_ERROR";
    httpStatus[httpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    httpStatus[httpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    httpStatus[httpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    httpStatus[httpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    httpStatus[httpStatus["CONFLICT_ERROR"] = 409] = "CONFLICT_ERROR";
    httpStatus[httpStatus["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
})(httpStatus || (exports.httpStatus = httpStatus = {}));
class httpResponse {
    OK(res, data) {
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            statusMsg: 'Success',
            data: data
        });
    }
    ;
    BAD_REQUEST_ERROR(res, data) {
        return res.status(httpStatus.BAD_REQUEST_ERROR).json({
            status: httpStatus.BAD_REQUEST_ERROR,
            statusMsg: 'Bad Request',
            error: data,
        });
    }
    INVALID_TYPE_ERROR(res, data) {
        return res.status(httpStatus.INVALID_TYPE_ERROR).json({
            status: httpStatus.INVALID_TYPE_ERROR,
            statusMsg: 'INVALID_TYPE_ERROR',
            error: data,
        });
    }
    NotFound(res, data) {
        return res.status(httpStatus.NOT_FOUND).json({
            status: httpStatus.NOT_FOUND,
            statusMsg: 'Not Found',
            error: data
        });
    }
    ;
    UNAUTHORIZED(res, data) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: httpStatus.UNAUTHORIZED,
            statusMsg: 'Unauthorized',
            error: data
        });
    }
    ;
    DATA_BASE_ERROR(res, data) {
        return res.status(httpStatus.DATA_BASE_ERROR).json({
            status: httpStatus.DATA_BASE_ERROR,
            statusMsg: 'DATA_BASE_ERROR',
            error: data
        });
    }
    ;
    FORBIDDEN(res, data) {
        return res.status(httpStatus.FORBIDDEN).json({
            status: httpStatus.FORBIDDEN,
            statusMsg: 'Forbidden',
            error: data
        });
    }
    ;
    Error(res, data) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            statusMsg: 'Internal server error',
            error: data
        });
    }
    ;
}
exports.httpResponse = httpResponse;
//# sourceMappingURL=enumsErrors.js.map