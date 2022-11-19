import * as yup from 'yup';
import mandarotyField from '../../../helpers/yup/messages';

const applicationSchema = yup.object({
  message: yup.string().required(mandarotyField).min(30),
});

export default applicationSchema;
