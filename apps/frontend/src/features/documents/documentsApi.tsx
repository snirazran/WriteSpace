import { useEffect, useState } from 'react';
import SWRMutate from 'swr/mutation';
import SWR from 'swr';
import {
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

export const useGetAllProjectDocuments = (id: string) => {
  const { documentsControllerGetAllProjectDocuments } = useDocumentsApi();
  const { data, error, isLoading, mutate } = SWR(
    id,
    documentsControllerGetAllProjectDocuments
  );
  return { data, error, isLoading, mutate };
};

export const useGetDocumentById = (documentId: string) => {
  const { documentsControllerGetDocumentById } = useDocumentsApi();
  const { data, error, isLoading, mutate } = SWR(
    documentId,
    documentsControllerGetDocumentById
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
