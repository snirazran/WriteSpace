export interface IDocument {
  userId: string;
  projectId: string;
  name: string;
  type: string;
  content: string;
  wordCount: number;
  shared: boolean;
}
