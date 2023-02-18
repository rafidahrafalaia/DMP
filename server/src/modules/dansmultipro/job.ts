import axios from 'axios';
import { errors } from '../../helpers';

const getJobById = async (id: number) => {
    try {
        const header = {
            'Content-Type': 'application/json',
        };

        const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`;
        const response = await axios.get(url, {
            timeout: 30000,
            headers: header,
        });

        return response.data;
    } catch (err: any) {
        throw errors.httpError.serviceRequestError(err.response);
    }
};

const getListJobs = async (queries: any) => {
    try {
        // eslint-disable-next-line max-len
        const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=${queries.page}&description=${queries.description}&location=${queries.location}`;
        const response = await axios.get(url, {
            timeout: 30000,
        });
        return response.data;
    } catch (err: any) {
        throw errors.httpError.serviceRequestError(err.response);
    }
};

export {
    getJobById,
    getListJobs,
};
