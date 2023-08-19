import mongoose, { Model } from 'mongoose'
import { IUser } from 'interfaces'
export type UserModel = Model<IUser, Record<string, unknown>>
export declare const User: mongoose.Model<any, {}, {}, {}, any, any>
export declare const userRoutes: import('express-serve-static-core').Router
//# sourceMappingURL=user.d.ts.map
