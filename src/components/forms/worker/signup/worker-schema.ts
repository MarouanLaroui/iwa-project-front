import * as yup from 'yup';
import mandarotyField from '../../../../helpers/yup/messages';

const workerSchema = yup.object({
  firstname: yup.string().min(2).required(mandarotyField),
  lastname: yup.string().min(2).required(mandarotyField),
  email: yup.string().required(mandarotyField).email(),
  birthDate: yup.date().required(mandarotyField),
  hasDrivingLicense: yup.boolean().required(mandarotyField),
});
export default workerSchema;
