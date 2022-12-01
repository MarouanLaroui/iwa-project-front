import * as yup from 'yup';
import mandarotyField from '../../../helpers/yup/messages';

const feedbackSchema = yup.object({
  title: yup.string().required(mandarotyField),
  message: yup.string().required(mandarotyField).min(20),
  rate: yup.number().required(mandarotyField).min(1).max(5),
});

export default feedbackSchema;
