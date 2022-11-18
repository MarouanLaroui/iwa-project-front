import * as yup from 'yup';

const mandarotyField: string = 'Ce champ est obligatoire.';

const jobOfferSchema = yup.object({
  startingDate: yup.date().required(mandarotyField),
  endingDate: yup.date().required(mandarotyField),
  jobType: yup.string().required(mandarotyField).min(3),
  description: yup.string().required(mandarotyField).min(50),
  salary: yup.number().required(mandarotyField).min(0),
  needDrivingLicence: yup.boolean().required(mandarotyField),
  hasCompanyCar: yup.boolean().required(mandarotyField),
}).test(
  'superior than starting date',
  'starting date is superior than end date',
  function testFunction(value) {
    const { startingDate, endingDate } = value;
    if (!startingDate || !endingDate || endingDate.getTime() > startingDate.getTime()) {
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
