
import express from 'express'
import {createLuponMember, getAllLuponMembers, getLuponMemberById, updateLuponMember, deleteLuponMember} from '../controllers/luponMember.controller.js';
const router = express.Router();


router.post('/createLuponMember', createLuponMember);
router.get('/getAllLuponMembers', getAllLuponMembers);
router.get('/getLuponMemberById/:id', getLuponMemberById);
router.put('/updateLuponMember/:id', updateLuponMember);
router.delete('/deleteLuponMember/:id', deleteLuponMember);

export default router;
