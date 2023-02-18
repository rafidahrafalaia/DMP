/**
 * Created by WebStorm.
 */
// code,
// 	status,
// 	messages: msg,
// 	data,

const errorFormat = (internalCode: any, message: string, data: any) => ({
    code: internalCode.code,
    status: internalCode.status,
    message,
    data,
});

export default errorFormat;
