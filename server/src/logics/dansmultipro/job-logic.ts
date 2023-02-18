import { errors } from '../../helpers';
import { dansmultipro } from '../../modules';

const getListJob = async function (queries: any) {
    try {
        let response = await dansmultipro.job.getListJobs(queries);
        response = response.filter((elements: string | null | undefined) => {
            return (elements != null && elements !== undefined && elements !== "");
           });
        return response;
    } catch (err: any) {
        console.log(err)
        throw errors.httpError.serviceRequestError(err.response);
    }
};

const getJobById = async function (id:number) {
    try {
        const response = await dansmultipro.job.getJobById(id);
        return response;
    } catch (err: any) {
        throw errors.httpError.serviceRequestError(err.response);
    }
};


export {
    getListJob,
    getJobById,
};
