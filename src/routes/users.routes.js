import { Router } from "express";
import { passportCall } from "../helpers/helpersPassportCall.js";
import usersController from "../controllers/users.controller.js";
import configMulter from "../helpers/helpersConfigMulter.js";


const router = Router();
const documents = configMulter('documents/documents')
const documentsProfile = configMulter('documents/profiles')
const documentsProduct = configMulter('documents/products')

router.post('/premium/:uid',[passportCall("jwt")], usersController.rolUsersPremium)

router.post('/:uid/documents/identificacion', documents.single('identificacion'), usersController.documentsUsers)

router.post('/:uid/documents/domicilio', documents.single('domicilio'), usersController.documentsUsers)

router.post('/:uid/documents/cuenta', documents.single('cuenta'), usersController.documentsUsers)

router.post('/:uid/documents/profiles', documentsProfile.single('profile'), usersController.documentsUsers)

router.post('/:uid/documents/products', documentsProduct.single('product'), usersController.documentsUsers)

export default router;