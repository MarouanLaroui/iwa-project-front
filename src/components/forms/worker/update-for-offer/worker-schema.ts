import * as yup from 'yup';
import mandarotyField from '../../../../helpers/yup/messages';

const workerSchema = yup.object({
  email: yup.string().required(mandarotyField).email(),
  hasDrivingLicense: yup.boolean().required(mandarotyField),
});
export default workerSchema;
