import Feedback from '../../types/feedback/Feedback';
import FeedbackCreateDTO from '../../types/feedback/FeedbackCreateDTO';
import useFetchMany from '../generic/useFetchMany';
import usePost from '../generic/usePost';

const useGetFeedbacksBySenderId = (senderId: string) => useFetchMany<Feedback>(`/feedbacks/bySenderId/${senderId}`);

const useGetFeedbacksByReceiverId = (receiverId: string) => useFetchMany<Feedback>(`/feedbacks/byReceiverId/${receiverId}`);

const useCreate = (feedbackCreateDTO: FeedbackCreateDTO, workId: string) => usePost<FeedbackCreateDTO, Feedback>(`/feedbacks/${workId}`, feedbackCreateDTO);

export { useGetFeedbacksBySenderId, useGetFeedbacksByReceiverId, useCreate };
