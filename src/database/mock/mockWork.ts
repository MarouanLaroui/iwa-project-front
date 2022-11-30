import { Work } from '../../types/work/Work';

const mockWork : Work = {
  workId: '1',
  companyId: '2',
  workerId: '3',
  jobLabel: 'Employé polyvalent',
  startingDate: new Date('2022-12-01'),
  endDate: new Date('2023-01-20'),
  isRatedByEmployee: false,
  isRatedByCompany: false,
};

export default mockWork;
