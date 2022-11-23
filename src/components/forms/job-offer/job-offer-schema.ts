import * as yup from 'yup';
import mandarotyField from '../../../helpers/yup/messages';

const jobOfferSchema = yup.object({
  startingDate: yup.date().required(mandarotyField),
  endDate: yup.date().required(mandarotyField),
  jobType: yup.string().required(mandarotyField).min(3),
  title: yup.string().required(mandarotyField).min(50),
  description: yup.string().required(mandarotyField).min(50),
  salary: yup.number().required(mandarotyField).min(0),
  needDrivingLicense: yup.boolean().required(mandarotyField),
  hasCompanyCar: yup.boolean().required(mandarotyField),
}).test(
  'superior than starting date',
  'starting date is superior than end date',
  function testFunction(value) {
    const { startingDate, endDate } = value;
    if (!startingDate || !endDate || endDate.getTime() > startingDate.getTime()) {
      // setDateErrorMessage('');
      return true;
    }
    // setDateErrorMessage('starting date is superior than end date');
    return this.createError({
      path: 'dateOrder',
      message: 'One field must be set',
    });
  },
);

export default jobOfferSchema;
