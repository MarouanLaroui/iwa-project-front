export const HOME_ROUTE: '/' = '/';

export const WORKER_LOGIN_ROUTE: 'worker/login' = 'worker/login';
export const WORKER_SIGNUP_ROUTE: 'worker/signup' = 'worker/signup';
export const COMPANY_LOGIN_ROUTE: 'company/login' = 'company/login';
export const COMPANY_SIGNUP_ROUTE: 'company/signup' = 'company/signup';

export const COMPANY_SEARCH_ROUTE: 'company/search' = 'company/search';
export const COMPANY_DETAILS_ROUTE: 'company/details/:companyId' = 'company/details/:companyId';

export const OFFER_SEARCH_ROUTE: 'offer/search' = 'offer/search';
export const OFFER_CREATE_ROUTE: 'offer/create' = 'offer/create';
export const OFFER_APPLY_ROUTE: 'offer/apply/:offerId' = 'offer/apply/:offerId';
export const OFFER_DETAILS_ROUTE: 'offer/details/:offerId' = 'offer/details/:offerId';
export const MY_OFFERS_ROUTE: 'offer/myoffers' = 'offer/myoffers';

export const WORKER_PROFILE_BASE_ROUTE: '/worker/profile' = '/worker/profile';
export const WORKER_PROFILE_ROUTE: `/${typeof WORKER_PROFILE_BASE_ROUTE}/:workerId` = `/${WORKER_PROFILE_BASE_ROUTE}/:workerId`;

export const COMPANY_PROFILE_BASE_ROUTE: '/company/profile' = '/company/profile';
export const COMPANY_PROFILE_ROUTE: `/${typeof COMPANY_PROFILE_BASE_ROUTE}` = `/${COMPANY_PROFILE_BASE_ROUTE}`;
