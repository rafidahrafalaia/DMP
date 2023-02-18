import { Response } from 'express';
import {
    utilities, responses, validators, errors,
} from '../../helpers';
import { jobLogic } from '../../logics/dansmultipro';

const getJobById = async (req: Request, res: Response) => {
    const { params } = <{ body: any; headers: Headers; params: any }><unknown>req;

    const errorValidator = [];
    const errs: any = [];

    errorValidator.push(validators.required(params, 'id', 'params'));
    errorValidator.push(validators.string(params, 'id', 'params'));

    errorValidator.forEach((each) => {
        if (each.error) errs.push(each.error);
    });
    if (errs.length > 0) throw errors.httpError.badRequest(errs);

    const result = await jobLogic.getJobById(params.id);

    return responses.httpResponse.ok(
        res,
        'Successfully get job by id',
        result,
    );
};

export default utilities.controllerWrapper(getJobById);
