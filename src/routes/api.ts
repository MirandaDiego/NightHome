import {Router} from 'express';
import { Auth } from '../middlewares/auth';
import multer from 'multer';

import * as PuteiroController from '../controllers/controllers';



const router = Router();

router.get('/home', PuteiroController.home)
router.get('/cadastro', PuteiroController.cadastroUser)
router.get('/page', PuteiroController.page)
router.get('/cadastrook', PuteiroController.ok)


router.post('/registro', PuteiroController.register)
router.post('/login', PuteiroController.login)
router.get('/ADM', PuteiroController.ADM)
router.get('/entrar', PuteiroController.entrar)




router.get('/houseNight', PuteiroController.puteiros)
router.post('/houseNight',Auth.private, PuteiroController.registroPuteiro)
router.put('/houseNight/:id',Auth.private, PuteiroController.editPuteiro)
router.delete('/houseNight/:id',Auth.private, PuteiroController.deletPuteiro)

router.get('/sede', PuteiroController.sedes)
router.post('/sede',Auth.private, PuteiroController.registroSede)
router.delete('/sede/:id',Auth.private, PuteiroController.deletSede)

router.get('/classes', PuteiroController.classes)

router.get('/damas', PuteiroController.putas);
router.get('/puta:id', PuteiroController.puta)

router.post('/cadastro/dama',Auth.private, PuteiroController.registroPuta)
router.delete('/putaq:id',Auth.private, PuteiroController.deletPuta)

//router.get('/list', PuteiroController.list)

/*const button = document.getElementById('bt');
button.addEventListener('click', () => {
  res.render('pages/ADM')
});*/


export default router;
