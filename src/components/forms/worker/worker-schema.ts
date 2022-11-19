import * as yup from 'yup';
import mandarotyField from '../../../helpers/yup/messages';

const workerSchema = yup.object({
  firstName: yup.string().min(2).required(mandarotyField),
  lastName: yup.string().min(2).required(mandarotyField),
  email: yup.string().required(mandarotyField).email(),
  birthDate: yup.date().required(mandarotyField),
  hasCar: yup.boolean().required(mandarotyField),
  hasDrivingLicence: yup.boolean().required(mandarotyField),

});
export default workerSchema;
