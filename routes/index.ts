import user from './user.routes'
import packages from './package.route'
import express from 'express'

const router = express()

router.use('/users', user)
router.use('/packages', packages)
export default router
