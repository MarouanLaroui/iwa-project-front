import * as yup from 'yup';
import mandarotyField from '../../../../helpers/yup/messages';

const jobOfferSchema = yup.object({
  location: yup.string().required(mandarotyField).min(3),
  startingDate: yup.date().required(mandarotyField),
  endDate: yup.date().required(mandarotyField),

  jobType: yup.string().required(mandarotyField).min(3),
  contractType: yup.string().required(mandarotyField).min(3),
  salary: yup.number().required(mandarotyField).min(0),
  needDrivingLicence: yup.boolean().required(mandarotyField),
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
