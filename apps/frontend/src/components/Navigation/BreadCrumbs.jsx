import './BreadCrumbs.css';
import { Link, useNavigate } from 'react-router-dom';
function BreadCrumbs({ content }) {
  // Determine if project page or post page

  let project;

  if (window.location.href.includes('projects/project/')) {
    project = true;
  }
  if (window.location.href.includes('posts/')) {
    project = false;
  }

  return (
    <section className="bread-crumbs">
      <p>
        <Link to={`/`}>
          <span>Home / </span>
        </Link>

        {project ? (
          <>
            <Link to={`/projects/${content && content.userId}`}>
              <span>{content && content.username} / </span>
            </Link>

            <span className="main-bread">{content && content.name}</span>
          </>
        ) : (
          <>
            <Link to={`/projects/${content && content.userId}`}>
              <span>
                {content && content.username ? (
                  content.username.charAt(0).toUpperCase() +
                  content.username.slice(1)
                ) : (
                  <></>
                )}{' '}
                /{' '}
              </span>
            </Link>
            <Link to={`/projects/project/${content && content.projectId}`}>
              <span>
                {content && content.projectName ? (
                  content.projectName.charAt(0).toUpperCase() +
                  content.projectName.slice(1)
                ) : (
                  <></>
                )}{' '}
                /{' '}
              </span>
            </Link>

            <span className="main-bread">
              {content && content.name ? content.name : <></>}
            </span>
          </>
        )}
      </p>
    </section>
  );
}

export default BreadCrumbs;
