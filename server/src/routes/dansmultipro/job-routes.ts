import { Router } from 'express';
import { clientDashboardMiddleware } from '../../middlewares';
import { DMPController } from '../../controllers';

export default (routes: Router) => {
    routes.get('/job/:id', 
        clientDashboardMiddleware.closedAuth,
        DMPController.getJobByIdController,
    );
    routes.get('/jobs',
        clientDashboardMiddleware.closedAuth,
        DMPController.getJobListController,
    );
};
