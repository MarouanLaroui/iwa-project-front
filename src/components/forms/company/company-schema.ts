import * as yup from 'yup';
import mandarotyField from '../../../helpers/yup/messages';

const companySchema = yup.object({
  name: yup.string().min(2).required(mandarotyField),
  email: yup.string().required(mandarotyField).email(),
  password: yup.string().required(mandarotyField).min(8),
  employeesNumber: yup.number().required(mandarotyField).min(1),
  description: yup.string().min(50).required(mandarotyField),
  sector: yup.string().min(2).required(mandarotyField),
});
export default companySchema;
