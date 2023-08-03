import React, { useCallback, useEffect, useRef, useState } from 'react';
import './TextEditor.css';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { toast } from 'react-toastify';
import { countWords } from '../../utils/countWords';

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
  updateFunc: (data: any) => void;
};

const TextEditor: React.FC<TextEditorProps> = ({ content, updateFunc }) => {
  const quillRef = useRef<Quill>();

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
      const range = quillRef.current.getSelection(true);
      quillRef.current.clipboard.dangerouslyPasteHTML(content);
      setTimeout(() => quillRef.current?.setSelection(range), 0);
    }
  }, [content]);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.on('selection-change', function (range) {
        if (range == null) {
          let justHtml = quillRef.current?.root.innerHTML;
          updateFunc({ content: justHtml });
          updateFunc({ wordCount: countWords(justHtml) });
          toast.success('Post updated');
        }
      });
    }
  }, []);

  return <div id="container" ref={wrapperRef}></div>;
};

export default TextEditor;
