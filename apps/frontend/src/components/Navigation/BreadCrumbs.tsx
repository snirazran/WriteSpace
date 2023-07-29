import { ProjectResponseDTO } from 'api-client/projects';
import { checkIfProject } from '../../utils/checkIfProject';
import './BreadCrumbs.css';
import { Link } from 'react-router-dom';
import { DocumentResponseDTO } from 'api-client/documents';
import { toCapital } from '../../utils/toCapital';
type BreadCrumbsProps = {
  content: DocumentResponseDTO | ProjectResponseDTO | undefined;
};
function isDocument(content: any): content is DocumentResponseDTO {
  return content?.projectInfo !== undefined;
}

function isProject(content: any): content is ProjectResponseDTO {
  return content?.projectInfo === undefined;
}
const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ content }) => {
  // Determine if project page or post page
  return (
    <section className="bread-crumbs">
      <p>
        <Link to={`/`}>
          <span>Home / </span>
        </Link>

        {checkIfProject() ? (
          <>
            <Link to={`/profile/${content?.userInfo.userId}`}>
              <span>{toCapital(content?.userInfo.username!)} / </span>
            </Link>
            {isProject(content) && (
              <span className="main-bread">{toCapital(content?.name)}</span>
            )}
          </>
        ) : (
          <>
            <Link to={`/profile/${content?.userInfo.userId}`}>
              <span>{toCapital(content?.userInfo.username!)} / </span>
            </Link>
            {isDocument(content) && (
              <>
                <Link
                  to={`/projects/project/${content?.projectInfo.projectId}`}
                >
                  <span>{toCapital(content?.projectInfo.name)} / </span>
                </Link>
                <span className="main-bread">{toCapital(content?.name)}</span>
              </>
            )}
          </>
        )}
      </p>
    </section>
  );
};

export default BreadCrumbs;
