import { useForm } from 'react-hook-form';
import { useCreateComment } from '../../features/documents/documentsApi';
import { DocumentResponseDTO } from 'api-client/documents';
import { useEffect } from 'react';

type CommentFormProps = {
  document: DocumentResponseDTO | undefined;
  userId: string | undefined;
  postMutate: () => void;
};

const CommentForm: React.FC<CommentFormProps> = ({
  document,
  userId,
  postMutate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: commentDocument,
    error: commentError,
    isLoading: isCommenting,
    reset: resetComment,
    trigger: commentFunc,
  } = useCreateComment(document?._id!, userId!);

  const onCommentSubmit = (data: any) => {
    commentFunc({
      content: data.commentContent,
    });
  };

  useEffect(() => {
    postMutate();
  }, [commentDocument]);

  return (
    <div className="commentForm">
      <form onSubmit={handleSubmit(onCommentSubmit)}>
        <input
          {...register('commentContent', {
            maxLength: {
              value: 25,
              message: 'Input exceeded 25 characters',
            },
          })}
          placeholder="Write a comment..."
          autoFocus
        />
        {errors.name && <p>{errors.name.message as string}</p>}
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
