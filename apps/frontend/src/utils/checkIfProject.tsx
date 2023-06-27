export const checkIfProject = () => {
  let project: boolean = false;
  if (window.location.href.includes('projects/')) {
    project = true;
  }
  if (window.location.href.includes('posts/')) {
    project = false;
  }
  return project;
};
