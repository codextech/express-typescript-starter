import { IRequest, IResponse, INext } from "../interfaces/index";
import { ErrorResponse } from "../utils/ErrorResponse";
import User from "../models/User";



class HomeController {
	public static async index (req: IRequest, res: IResponse, next: INext) {
        try {
            
          
          
          // let user = await  User.findById({}) ;

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
