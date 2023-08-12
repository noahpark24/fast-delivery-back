import { Request, Response, NextFunction } from 'express'
import { validateToken } from '../config/tokens'
import { Responses } from '../services/responses'
import { UserInterface } from '../interfaces/user.interfaces'
const response = new Responses()

declare global {
	namespace Express {
		interface Request {
			user: UserInterface;
		}
	}
}

function validateUser(req: Request, res: Response, next: NextFunction) {
	const token: string = req.cookies.token

	if (!token) return res.sendStatus(401)

	const { user }: string | any = validateToken(token)

	if (!user) return res.sendStatus(401)

	req.user = user

	next()
}

export default validateUser
