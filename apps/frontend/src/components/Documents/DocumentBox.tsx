import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaTrash, FaLock, FaUnlock } from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext';
import './DocumentBox.css';
import 'quill/dist/quill.snow.css';
import { DocumentResponseDTO } from 'api-client/documents';
import { useEffect, useState } from 'react';
import { useUpdateDocument } from '../../features/documents/documentsApi';
import { toast } from 'react-toastify';
import { KeyedMutator, mutate } from 'swr';
import { AxiosResponse } from 'axios';
import TextEditor from './TextEditor';
import LikeComment from './LikeComment';
import CommentForm from './CommentForm';

type DocumentBoxProps = {
  content: DocumentResponseDTO | undefined;
  deleteFunc: () => void;
  postMutate: KeyedMutator<AxiosResponse<DocumentResponseDTO, any>>;
};

const DocumentBox: React.FC<DocumentBoxProps> = ({
  content,
  deleteFunc,
  postMutate,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isUserPost = () => user!._id === content?.userInfo.userId;
  const [editNameMode, setEditNameMode] = useState(false);
  const [documentName, setDocumentName] = useState(content?.name);
  const [isWriting, setIsWriting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: updatedDocument,
    error: updateError,
    isLoading: isUpdating,
    reset: resetUpdate,
    trigger: updateFunc,
  } = useUpdateDocument(content?._id!);

  const onNameSubmit = (data: any) => {
    setEditNameMode(false);
    updateFunc({ name: data.name });
    setDocumentName(data.name);
    toast.success('Post updated');
  };

  const onShareUpdate = () => {
    updateFunc({ shared: !content?.shared });
    if (content?.shared) {
      toast.success('Post set to private');
    } else {
      toast.success('Post set to public');
    }
  };

  useEffect(() => {
    postMutate();
  }, [updatedDocument]);

  let options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const date = new Date(content?.createdAt!);

  const deletePost = () => {
    deleteFunc();
    navigate(`/projects/project/${content?.projectInfo.projectId}`);
  };

  return (
    <div className="scribble-box">
      <div className="document-top-buttons">
        {isUserPost() && (
          <>
            <div className="trash-btn" onClick={() => deletePost()}>
              <FaTrash />
            </div>
            <div className="share-btn-cover">
              <div onClick={onShareUpdate} className="share-btn">
                {content?.shared ? <FaUnlock /> : <FaLock />}
                {content?.shared ? <h1>Public</h1> : <h1>Private</h1>}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="date">{date.toLocaleDateString('en-us', options)}</div>
      <div className="title">
        {isUserPost() &&
          (editNameMode ? (
            <form onSubmit={handleSubmit(onNameSubmit)}>
              <input
                {...register('name', {
                  maxLength: {
                    value: 25,
                    message: 'Input exceeded 25 characters',
                  },
                })}
                placeholder="Add a title..."
                defaultValue={documentName}
                autoFocus
                onBlur={handleSubmit(onNameSubmit)}
              />
              {errors.name && <p>{errors.name.message as string}</p>}
            </form>
          ) : (
            <h1 onClick={() => setEditNameMode(true)}>
              {documentName?.trim() === '' ? 'Add a title...' : documentName}
            </h1>
          ))}
        {!isUserPost() && (
          <h1>
            {documentName?.trim() === '' ? 'Add a title...' : documentName}
          </h1>
        )}
      </div>
      <div className="author">
        <Link to={`/profile/${content?.userInfo.userId}`}>
          <h1>By {content?.userInfo.username}</h1>
          <div className="post-user-img">
            <img src={content?.userInfo.img} alt="" />
          </div>
        </Link>
      </div>

      <div className="project-details">
        {isUserPost() && (
          <div className="word-count">
            <h1>{`${content?.wordCount} words`}</h1>
          </div>
        )}

        <Link to={`/projects/project/${content?.projectInfo.projectId}`}>
          <h1>
            {`${content?.type} of `}
            {
              <span className="project-title">
                "{content?.projectInfo.name}",
              </span>
            }
            <span> {content?.projectInfo.genre}</span>
          </h1>
          <div className="post-project-img">
            <img src={content?.projectInfo.img} alt="img"></img>
          </div>
        </Link>
      </div>
      {isUserPost() ? (
        <TextEditor
          content={content?.content}
          updateFunc={updateFunc}
          isWriting={isWriting}
          setIsWriting={setIsWriting}
        />
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: content?.content! }}
          className="ql-editor"
          id="post-content"
        ></div>
      )}

      <LikeComment
        document={content}
        user={user}
        isWriting={isWriting}
        postMutate={postMutate}
      />
    </div>
  );
};

export default DocumentBox;
