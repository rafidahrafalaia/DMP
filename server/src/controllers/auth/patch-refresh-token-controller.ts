import { Request, Response } from 'express';
import {
    utilities, responses, validators, errors,
} from '../../helpers';
import { authLogic } from '../../logics/auth';

const patchRefreshToken = async (req: Request, res: Response) => {
    const { headers } = req;

    const errorValidator = [];
    const errs: any = [];

    errorValidator.push(
        validators.required(headers, 'refresh_token', 'headers'),
    );
    errorValidator.push(validators.string(headers, 'refresh_token', 'header'));

    errorValidator.forEach((each) => {
        if (each.error) errs.push(each.error);
    });

    if (errs.length > 0) throw errors.httpError.badRequest(errs);

    const response = await authLogic.renewRefreshToken(headers);

    responses.httpResponse.ok(res, 'Successfully renew access token', response);
};

export default utilities.controllerWrapper(patchRefreshToken);
