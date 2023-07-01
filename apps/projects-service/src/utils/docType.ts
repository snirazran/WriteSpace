export const docType = (genre: string) => {
  if (genre === 'Book' || genre === 'Short Story') {
    return 'Chapter';
  }
  if (genre === 'Songs') {
    return 'Song';
  }
  if (genre === 'Diary') {
    return 'Entry';
  }
  if (genre === 'Poems') {
    return 'Poem';
  }
  if (genre === 'General') {
    return 'Document';
  }
};
