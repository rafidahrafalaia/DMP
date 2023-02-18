import { Router } from 'express';
import { authController } from '../../controllers';

export default (routes: Router) => {
    routes.post(
        '/login',
        authController.postLoginUserController,
    );
    routes.patch(
        '/refresh-token', authController.patchRefreshTokenController,
    );
};
