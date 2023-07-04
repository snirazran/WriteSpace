import { FaHeart, FaComment } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import './Document.css';
import friend from '../../media/friend.png';
import { DocumentResponseDTO } from 'api-client/documents';

type DocumentProps = {
  content: DocumentResponseDTO | undefined;
};

const Document: React.FC<DocumentProps> = ({ content }) => {
  const navigate = useNavigate();
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const date = new Date(content?.createdAt);
  const id = content?._id;
  const onClick = (id: string) => {
    navigate(`/document/${id}`);
    window.scrollTo(0, 0);
  };
  const shortContent = content?.content.slice(0, 300) + '...';

  return (
    <div className="post">
      <div className="post-user">
        <img src={friend} alt="" />
        <div className="post-user-text">
          <h1>{content?.userInfo.username}</h1>
          {/* <p>{date.toLocaleDateString('en-us', options)}</p> */}
        </div>
      </div>
      <div className="post-content">
        <div className="post-content-title">
          <h1>
            {content?.name}, <span>{content?.type}</span>
          </h1>
        </div>
        <div className="post-content-text">
          <div
            dangerouslySetInnerHTML={{ __html: shortContent }}
            className="ql-editor"
          ></div>
        </div>

        <div className="post-content-like">
          <FaHeart className="like" />

          <FaComment className="comment" />
        </div>
        <div className="post-content-comment border ">
          <h1>Liked by Johnny sins and 100 more</h1>
          <p>View all 20 comments</p>
        </div>
      </div>
      <button
        onClick={() => {
          onClick(id!);
        }}
        className="post-content-btn"
      >
        Read More
      </button>
    </div>
  );
};

export default Document;
