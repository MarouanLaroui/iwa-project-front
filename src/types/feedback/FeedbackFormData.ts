import Feedback from './Feedback';

type FeedbackFormData = Pick<Feedback, 'title' | 'message' | 'rate'>;

export default FeedbackFormData;
