import React, { useCallback, useEffect, useRef, useState } from 'react';
import './TextEditor.css';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { toast } from 'react-toastify';
import { countWords } from '../../utils/countWords';
import { UpdateDocumentRequestDTO } from 'api-client/documents';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote'],
  [{ list: 'bullet' }],
  [{ direction: 'rtl' }], // text direction
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

type TextEditorProps = {
  content: string | undefined;
  updateFunc: (data: UpdateDocumentRequestDTO) => void;
  setIsWriting: (data: boolean) => void;
  isWriting: boolean;
};

const TextEditor: React.FC<TextEditorProps> = ({
  content,
  updateFunc,
  setIsWriting,
  isWriting,
}) => {
  const quillRef = useRef<Quill | null>(null);
  const lastSelectionRef = useRef<any>(null);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'bubble',
      modules: {
        toolbar: toolbarOptions,
      },
    });
    quillRef.current = q;
  }, []);

  useEffect(() => {
    if (quillRef.current && content) {
      quillRef.current.root.innerHTML = content;
    }
  }, [content]);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.on('selection-change', function (range) {
        if (range == null && lastSelectionRef.current != null) {
          let justHtml = quillRef.current?.root.innerHTML;
          updateFunc({ content: justHtml, wordCount: countWords(justHtml) });
          toast.success('Post updated');
          setIsWriting(false);
        } else if (range != null) {
          setIsWriting(true);
        }
        lastSelectionRef.current = range;
      });

      quillRef.current.on('text-change', function () {
        setIsWriting(true);
      });
    }
  }, []);

  return (
    <div
      id="container"
      className={isWriting ? 'writing' : ''}
      ref={wrapperRef}
    ></div>
  );
};

export default TextEditor;
