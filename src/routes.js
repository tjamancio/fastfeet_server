import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import DeliveryManController from './app/controllers/DeliveryManController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymen', DeliveryManController.index);
routes.get('/deliverymen/:id', DeliveryManController.show);
routes.post('/deliverymen', DeliveryManController.store);
// routes.put('/deliverymen/:id', DeliveryManController.update);
// routes.delete('/deliverymen/:id', DeliveryManController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
