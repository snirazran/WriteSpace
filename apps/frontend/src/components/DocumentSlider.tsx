// Imports
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid, Pagination } from 'swiper';

// Local imports
import ProjectItem from './Project/ProjectItem';
import ProjectGenreSelector from './Project/ProjectGenreSelector';
import QuickProjectBtn from './Buttons/QuickProjectBtn';
import { useAuth } from '../context/AuthContext';
import widthMove from '../utils/widthOfBtn';
import { toCapital } from '../utils/toCapital';
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
import MainBtn from './Buttons/MainBtn';
import { docType } from '../utils/DocTypeCheck';
import { useCreateDocument } from '../features/documents/documentsApi';
import { AxiosResponse } from 'axios';
import { ProjectResponseDTO } from 'api-client/projects';
import ProfileBtn from './Buttons/ProfileBtn';

type DocumentSliderProps = {
  content?: GetAllProjectDocumentsDTO;
  project: AxiosResponse<ProjectResponseDTO, any> | undefined;
  documents: AxiosResponse<GetAllProjectDocumentsDTO, any> | undefined;
};

const DocumentSlider: React.FC<DocumentSliderProps> = ({
  content,
  project,
  documents,
}) => {
  // Hooks
  const navigate = useNavigate();
  const { user } = useAuth();

  const onClick = (id: string) => {
    navigate(`/projects/project/${id}`);
    window.scrollTo(0, 0);
  };

  const {
    data: createdDocument,
    error: documentError,
    isLoading: isLoadingDocument,
    reset: resetDocument,
    trigger: triggerDocument,
  } = useCreateDocument();

  // Main render
  if (content) {
    let items: Array<DocumentResponseDTO> = content.documents;
    // Functions
    const isUserProfile = () => user?._id === items?.[0]?.userInfo?.userId;
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
    };

    return (
      <>
        {items.length > 0 ? (
          <div className="document-slider">
            <div className="document-slider-title">
              <h1>{`${toCapital(items?.[0].type)}s`}</h1>
              {isUserProfile() && (
                <ProfileBtn
                  btnText={`Create A New ${items?.[0].type}`}
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
            <h3>You have not created any documents yet</h3>
          </div>
        )}
      </>
    );
  } else {
    return null;
  }
};

export default DocumentSlider;
