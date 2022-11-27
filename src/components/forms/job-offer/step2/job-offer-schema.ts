import * as yup from 'yup';
import mandarotyField from '../../../../helpers/yup/messages';

const jobOfferSchema = yup.object({
  title: yup.string().required(mandarotyField).min(8),
  description: yup.string().required(mandarotyField).min(50),
});

export default jobOfferSchema;
