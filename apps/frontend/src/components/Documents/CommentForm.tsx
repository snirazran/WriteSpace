import { useForm } from 'react-hook-form';
import { useCreateComment } from '../../features/documents/documentsApi';
import { DocumentResponseDTO } from 'api-client/documents';
import { useEffect, useRef } from 'react';
import { User } from '../../utils/user';
import './CommentForm.css';
import CommentBtn from '../Buttons/CommentBtn';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type CommentFormProps = {
  document: DocumentResponseDTO | undefined;
  user: User | null;
  postMutate: () => void;
};

const CommentForm: React.FC<CommentFormProps> = ({
  document,
  user,
  postMutate,
}) => {
  const navigate = useNavigate();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    data: commentDocument,
    error: commentError,
    isLoading: isCommenting,
    reset: resetComment,
    trigger: commentFunc,
  } = useCreateComment(user?._id!);

  const onCommentSubmit = (data: any) => {
    commentFunc({
      content: data.commentContent,
      documentId: document!._id,
    });

    reset();
  };
  const onClickNav = (id: string) => {
    navigate(`/profile/${id}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    postMutate();
  }, [commentDocument]);

  return (
    <div className="comments-container">
      <div
        onClick={() => {
          onClickNav(user!._id);
        }}
        className={'comment-user-img'}
      >
        <img src={user?.img} alt="" />
      </div>
      {errors.commentContent && (
        <p>{errors.commentContent.message as string}</p>
      )}
      <div className="commentForm">
        <form onSubmit={handleSubmit(onCommentSubmit)}>
          <textarea
            {...register('commentContent', {
              maxLength: {
                value: 150,
                message: 'Input exceeded 150 characters',
              },
            })}
            placeholder="Write a comment..."
            maxLength={150}
          />
          <CommentBtn />
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
