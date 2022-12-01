import * as yup from 'yup';
import mandarotyField from '../../../../helpers/yup/messages';

const jobOfferSchema = yup.object({
  title: yup.string().required(mandarotyField).min(3),
  description: yup.string().required(mandarotyField).min(40),
});

export default jobOfferSchema;
