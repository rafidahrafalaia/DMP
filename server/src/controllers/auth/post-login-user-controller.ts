import { Request, Response } from 'express';
import {
    utilities, responses, validators, errors,
} from '../../helpers';
import { authLogic } from '../../logics/auth';

const postLoginUserController = async (req: Request, res: Response) => {
    const { headers } = req;

    const errorValidator = [];
    const errs: any = [];

    errorValidator.push(
        validators.required(headers, 'authorization', 'header'),
    );
    errorValidator.push(validators.string(headers, 'authorization', 'header'));

    errorValidator.forEach((each) => {
        if (each.error) errs.push(each.error);
    });

    if (errs.length > 0) throw errors.httpError.badRequest(errs);

    const response = await authLogic.loginAccount(headers);

    responses.httpResponse.ok(res, 'Successfully login account', response);
};

export default utilities.controllerWrapper(postLoginUserController);
