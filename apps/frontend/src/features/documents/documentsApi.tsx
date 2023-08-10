import { useEffect, useState } from 'react';
import SWRMutate from 'swr/mutation';
import SWR from 'swr';
import {
  CreateCommentRequestDTO,
  CreateDocumentRequestDTO,
  DocumentsApiFactory,
  UpdateDocumentRequestDTO,
} from 'api-client/documents';
import { useAxios } from '../../context/AxiosContext';

export const useDocumentsApi = () => {
  const axios = useAxios();
  const [apiBaseUrl, setApiBaseUrl] = useState('http://localhost:3003');
  const [api, setApi] = useState(
    DocumentsApiFactory(
      {
        isJsonMime: (mime) => mime === 'application/json',
      },
      apiBaseUrl,
      axios
    )
  );

  useEffect(() => {
    setApi(
      DocumentsApiFactory(
        {
          isJsonMime: (mime) => mime === 'application/json',
        },
        apiBaseUrl,
        axios
      )
    );
  }, [axios]);

  return api;
};

export const useCreateDocument = () => {
  const { documentsControllerCreateDocument } = useDocumentsApi();
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'createDocument',
    (_url: string, { arg }: { arg: CreateDocumentRequestDTO }) =>
      documentsControllerCreateDocument(arg)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};

export const useGetFeedPosts = () => {
  const { documentsControllerGetFeedDocuments } = useDocumentsApi();
  const {
    data,
    error,
    isLoading,
    isValidating: isInitiallyLoading,
    mutate,
  } = SWR('/feedPosts', documentsControllerGetFeedDocuments);
  return { data, error, isLoading, isInitiallyLoading, mutate };
};

export const useGetAllProjectDocuments = (id: string) => {
  const { documentsControllerGetAllProjectDocuments } = useDocumentsApi();

  const fetcher = (_key: string) =>
    documentsControllerGetAllProjectDocuments(id);

  const { data, error, isLoading, mutate } = SWR(`allDocuments-${id}`, fetcher);

  return { data, error, isLoading, mutate };
};

export const useGetDocumentById = (documentId: string) => {
  const { documentsControllerGetDocumentById } = useDocumentsApi();

  const fetcher = (_key: string) =>
    documentsControllerGetDocumentById(documentId);

  const { data, error, isLoading, mutate } = SWR(
    `Document-${documentId}`,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export const useUpdateDocument = (id: string) => {
  const { documentsControllerUpdateDocument } = useDocumentsApi();
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'updateDocument',
    (_url: string, { arg }: { arg: UpdateDocumentRequestDTO }) =>
      documentsControllerUpdateDocument(id, arg)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};

export const useDeleteDocument = (id: string) => {
  const { documentsControllerDeleteDocument } = useDocumentsApi();
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'deleteDocument',
    (_url: string) => documentsControllerDeleteDocument(id)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};

export const useAddRemoveLike = () => {
  const { documentsControllerAddRemoveLike } = useDocumentsApi();
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'addRemoveLike',
    (_url: string, { arg }: { arg: { documentId: string; userId: string } }) =>
      documentsControllerAddRemoveLike(arg.userId, arg.documentId)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};

export const useCreateComment = (id: string) => {
  const { documentsControllerAddComment } = useDocumentsApi();
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'addComment',
    (_url: string, { arg }: { arg: CreateCommentRequestDTO }) =>
      documentsControllerAddComment(id, arg)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};

export const useDeleteComment = (
  userId: string,
  documentId: string,
  commentId: string
) => {
  const { documentsControllerDeleteComment } = useDocumentsApi();
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'deleteComment',
    (_url: string) =>
      documentsControllerDeleteComment(commentId, documentId, userId)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};
