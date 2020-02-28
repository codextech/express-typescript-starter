import { IRequest, IResponse, INext } from "../interfaces/index";
import { ErrorResponse } from "../utils/ErrorResponse";


class HomeController {
	public static index (req: IRequest, res: IResponse, next: INext) {
        try {
            
        
            // call from db
            let obj  = {foo : 'foo'} || null;

            if (!obj) {
                return next(
                  new ErrorResponse(`Not found`, 404)
                );
              }

            return res.status(200).json({
                success: true,
                data: obj
            });
            
        } catch (error) {
            return next(
                new ErrorResponse()
              );
        }
	}
}

export default HomeController;
