import * as yup from 'yup';
import mandarotyField from '../../../helpers/yup/messages';

const loginSchema = yup.object({
  email: yup.string().required(mandarotyField).email(),
  password: yup.string().required(mandarotyField).min(8),
});

export default loginSchema;
