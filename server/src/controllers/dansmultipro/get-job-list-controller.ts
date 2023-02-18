import { Request, Response } from 'express';
import {
    utilities, responses
} from '../../helpers';
import { jobLogic } from '../../logics/dansmultipro';


const getListJobs = async (req : Request, res : Response) => {
    const { query } = req;

    const queries: any = {
        page: Number(query.page) || 1,
        description: (query.description?.toString())?.toLowerCase() || '',
        location: (query.location?.toString())?.toLowerCase() || '',
    };


    const result = await jobLogic.getListJob(queries);
    return responses.httpResponse.ok(res, 'Successfully get list job',result);
};


export default utilities.controllerWrapper(getListJobs);
