export const docName = (genre: string) => {
  if (genre === 'Book' || genre === 'Short Story') {
    return 'A New Chapter';
  }
  if (genre === 'Songs') {
    return 'A New Song';
  }
  if (genre === 'Diary') {
    return 'A New Entry';
  }
  if (genre === 'Poems') {
    return 'A New Poem';
  }
  if (genre === 'General') {
    return 'A New Document';
  }

  return 'Document';
};
