import { IRequest, IResponse, INext } from "../interfaces/index";
import { ErrorResponse } from "../utils/ErrorResponse";
import User from "../models/User";
import { IUserModel, IUser } from "../interfaces/model/user.interface";



class HomeController {
	public static async index (req: IRequest, res: IResponse, next: INext) {
        try {
            
          // call from db
         let  user = await  User.find({}) ;

            if (!user) {
                return next(
                  new ErrorResponse(`Not found`, 404)
                );
              }


            return res.status(200).json({
                success: true,
                data: user
            });
            
        } catch (error) {
            return next(
                new ErrorResponse(error)
              );
        }
	}
}

export default HomeController;
