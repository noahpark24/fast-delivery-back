import express from 'express'
import { getUser, hola, login, logout, signup, update_info } from '../controllers/user.controller'
import validateUser from '../middlewares/auth'

const router = express()

router.post('/signup', signup)
router.post('/login', login)
router.get('/hola', validateUser, hola)
router.post('/logout', validateUser, logout)
router.put('/update/:userId', validateUser, update_info)
router.get('/:userId', validateUser, getUser)
export default router
