import { useCallback, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './TextEditor.css';

const toolbarOptions = [
  ['bold', 'italic', 'underline'], // toggled buttons
  ['blockquote'],

  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

function TextEditor() {
  const [quill, setQuill] = useState();

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      },
    });
    setQuill(q);
  }, []);
  if (quill) {
    quill.on('text-change', function () {
      let justHtml = quill.root.innerHTML;
      console.log(justHtml);
    });
  }

  return <div id="container" ref={wrapperRef}></div>;
}

export default TextEditor;
