export const HOME_ROUTE: '/' = '/';

export const WORKER_LOGIN_ROUTE: 'worker/login' = 'worker/login';
export const WORKER_SIGNUP_ROUTE: 'worker/signup' = 'worker/signup';
export const COMPANY_LOGIN_ROUTE: 'company/login' = 'company/login';
export const COMPANY_SIGNUP_ROUTE: 'company/signup' = 'company/signup';

export const COMPANY_SEARCH_ROUTE: 'company/search' = 'company/search';
export const COMPANY_DETAILS_ROUTE: 'company/details/:companyId' = 'company/details/:companyId';
export const COMPANY_EMPLOYEES_ROUTE: 'company/employees' = 'company/employees';

export const OFFER_SEARCH_ROUTE: 'offer/search' = 'offer/search';
export const OFFER_CREATE_ROUTE: 'offer/create' = 'offer/create';
export const OFFER_APPLY_ROUTE: 'offer/apply/:offerId' = 'offer/apply/:offerId';
export const OFFER_DETAILS_ROUTE: 'offer/details/:offerId' = 'offer/details/:offerId';
export const MY_OFFER_DETAILS_BASE_ROUTE: '/my-offer/details' = '/my-offer/details';
export const MY_OFFER_DETAILS_ROUTE: `${typeof MY_OFFER_DETAILS_BASE_ROUTE}/:offerId` = `${MY_OFFER_DETAILS_BASE_ROUTE}/:offerId`;

export const MY_OFFERS_ROUTE: 'offer/myoffers' = 'offer/myoffers';

export const WORKER_PROFILE_BASE_ROUTE: '/worker/profile' = '/worker/profile';
export const WORKER_APPLICATIONS_ROUTE: '/worker/applications' = '/worker/applications';

export const COMPANY_PROFILE_BASE_ROUTE: '/company/profile' = '/company/profile';
