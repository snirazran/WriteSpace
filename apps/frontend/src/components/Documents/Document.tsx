import { FaHeart, FaComment } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import './Document.css';
import { DocumentResponseDTO } from 'api-client/documents';
import LikeComment from './LikeComment';
import { User } from '../../utils/user';

type DocumentProps = {
  content: DocumentResponseDTO | undefined;
  postMutate: () => void;
  user: User | null;
};

const Document: React.FC<DocumentProps> = ({ content, user, postMutate }) => {
  const navigate = useNavigate();
  let options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const date = new Date(content?.createdAt!);

  const id = content?._id;
  const onClick = (id: string) => {
    navigate(`/document/${id}`);
    window.scrollTo(0, 0);
  };
  const shortContent = content?.content.slice(0, 300);

  return (
    <div className="post">
      <div className="post-user">
        <div className="post-user-img">
          <Link to={`/profile/${content?.userInfo.userId}`}>
            <img src={content?.userInfo.img} alt="" />
          </Link>
        </div>
        <div className="post-user-text">
          <Link to={`/profile/${content?.userInfo.userId}`}>
            <h1>{content?.userInfo.username}</h1>
          </Link>
          <p>{date.toLocaleDateString('en-us', options)}</p>
        </div>
      </div>
      <div className="post-content">
        <div className="post-content-title">
          <Link to={`/document/${content?._id}`}>
            <h1>{content?.name}</h1>
          </Link>
          <Link to={`/projects/project/${content?.projectInfo.projectId}`}>
            <div className="post-content-subtitle">
              <h2>
                {' '}
                <span className="post-content-subtitle-type">
                  {content?.type} of{' '}
                </span>
                <span className="post-content-subtitle-project">
                  "{content?.projectInfo.name}"{', '}
                </span>
                <span className="post-content-subtitle-project-type">
                  {content?.projectInfo.genre}
                </span>
              </h2>
              <div className="post-content-subtitle-img">
                <img src={content?.projectInfo.img} alt="" />
              </div>
            </div>
          </Link>
        </div>

        <div className="post-content-text">
          <div
            dangerouslySetInnerHTML={{ __html: shortContent! }}
            className="ql-editor"
          ></div>
          <button
            onClick={() => {
              onClick(id!);
            }}
            className="post-content-btn"
          >
            Read More
          </button>
        </div>
        <LikeComment document={content} user={user} postMutate={postMutate} />
      </div>
    </div>
  );
};

export default Document;
