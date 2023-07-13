export const checkIfProject = () => {
  let project: boolean = false;
  if (window.location.href.includes('profile/')) {
    project = true;
  }
  if (window.location.href.includes('project/')) {
    project = true;
  }
  if (window.location.href.includes('documents/')) {
    project = false;
  }
  return project;
};
