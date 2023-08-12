// Imports
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid, Pagination } from 'swiper';

// Local imports
import QuickProjectBtn from '../Buttons/QuickProjectBtn';
import { useAuth } from '../../context/AuthContext';
import widthMove from '../../utils/widthOfBtn';
import { toCapital } from '../../utils/toCapital';
import './DocumentSlider.css';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

// Types
import {
  DocumentResponseDTO,
  GetAllProjectDocumentsDTO,
} from 'api-client/documents';
import DocumentItem from './DocumentItem';
import { docType } from '../../utils/DocTypeCheck';
import { useCreateDocument } from '../../features/documents/documentsApi';
import { AxiosResponse } from 'axios';
import { ProjectResponseDTO } from 'api-client/projects';
import { KeyedMutator } from 'swr';
import Spinner from './../Spinner';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

type DocumentSliderProps = {
  content?: GetAllProjectDocumentsDTO;
  project: AxiosResponse<ProjectResponseDTO, any> | undefined;
  documents: AxiosResponse<GetAllProjectDocumentsDTO, any> | undefined;
  mutateDocuments: KeyedMutator<AxiosResponse<GetAllProjectDocumentsDTO, any>>;
};

const DocumentSlider: React.FC<DocumentSliderProps> = ({
  content,
  project,
  documents,
  mutateDocuments,
}) => {
  // Hooks
  const navigate = useNavigate();
  const { user } = useAuth();

  const onClick = (id: string) => {
    navigate(`/document/${id}`);
    window.scrollTo(0, 0);
  };

  const {
    data: createdDocument,
    error: documentError,
    isLoading: isLoadingDocument,
    reset: resetDocument,
    trigger: triggerDocument,
  } = useCreateDocument();

  useEffect(() => {
    if (documentError) {
      toast.error('Failed to create document');
    }
  }, [documentError]);

  useEffect(() => {
    mutateDocuments();
  }, []);

  useEffect(() => {
    mutateDocuments();
  }, [createdDocument]);

  if (isLoadingDocument) {
    return <Spinner />;
  }

  // Main render
  if (content) {
    let items: Array<DocumentResponseDTO> = content.documents;

    // Functions
    const isUserProfile = () => user?._id === project?.data.userInfo.userId;
    const slider = document.getElementById('profileProjectBtn');
    if (slider) {
      slider.style.maxWidth = `${widthMove(items)}px`;
    }
    const onCreateBtn = () => {
      const documentData = {
        userId: project!.data.userInfo.userId,
        projectId: project!.data._id,
        type: docType(project!.data.genre),
      };
      triggerDocument(documentData);
      toast.success(`${docType(project?.data.genre!)} created successfully`);
    };

    if (!isUserProfile()) {
      items = items.filter((item) => item.shared);
    }

    return (
      <>
        {items.length > 0 ? (
          <div className="document-slider">
            <div className="document-slider-title">
              <h1>{`${toCapital(items?.[0].type)}s`}</h1>
              {isUserProfile() && (
                <QuickProjectBtn
                  btnText={`+ New ${items?.[0].type}`}
                  onClick={onCreateBtn}
                />
              )}
            </div>
            <Swiper
              slidesPerView={3}
              grid={{
                rows: 2,
              }}
              pagination={{
                clickable: true,
              }}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation, Grid, Pagination]}
              className="mySwiper"
            >
              {items.map((content) => (
                <SwiperSlide
                  key={content._id}
                  onClick={() => onClick(content._id)}
                >
                  <DocumentItem document={content} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="no-documents">
            {isUserProfile() ? (
              <h3>You have not created any posts yet</h3>
            ) : (
              <h3>
                {project?.data.userInfo.username} has not created any posts in{' '}
                {project?.data.name} yet
              </h3>
            )}
            {isUserProfile() && (
              <QuickProjectBtn
                btnText={`Create A New ${docType(project?.data.genre!)}`}
                onClick={onCreateBtn}
              />
            )}
          </div>
        )}
      </>
    );
  } else {
    return null;
  }
};

export default DocumentSlider;
