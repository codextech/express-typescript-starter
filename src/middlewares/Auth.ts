import { NextFunction } from "express";
import { IRequest } from "../interfaces/IRequest";
import { IResponse } from "../interfaces/IResponse";

const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

export class Auth {

    public static async authented(req : IRequest, res: IResponse, next: NextFunction) {
try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Set token from Bearer token in header
      token = req.headers.authorization.split(' ')[1];
      // Set token from cookie
    }
    // else if (req.cookies.token) {
    //   token = req.cookies.token;
    // }
  
    // Make sure token exists
    if (!token) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }

     // Verify token
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
     req.user = await User.findById(decoded.id);
 
     next();
    
} catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
}
      
    }

    public static async authorized(req : IRequest, res: IResponse, next: NextFunction) {
        try {
        
            // ...
            
        } catch (error) {
            return next(new ErrorResponse('not authorized to access this route', 403));
        }
              
            }
   
}

