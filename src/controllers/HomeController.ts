
import { Request, Response } from 'express';

class HomeController {
	public static index (req: Request, res: Response) {
		return res.status(200).json({o : 'ok'});
	}
}

export default HomeController;
