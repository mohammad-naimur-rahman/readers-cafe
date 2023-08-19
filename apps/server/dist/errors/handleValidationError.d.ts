import mongoose from 'mongoose'
import { IGenericErrorResponse } from '../interfaces/common'
declare const handleValidationError: (
  error: mongoose.Error.ValidationError,
) => IGenericErrorResponse
export default handleValidationError
//# sourceMappingURL=handleValidationError.d.ts.map
