import { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../firebase';
import { v4 } from 'uuid';
import placeHolder from '../media/placeholder.png';
import './CreateProject.css';
import { getPost, updatePost, resetPosts } from '../features/posts/postSlice';
import TextEditor from '../components/TextEditor';
import './CreatePost.css';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import '../components/TextEditor.css';
import Spinner from '../components/Spinner';

function EditPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  let { id } = useParams();
  const { posts, postIsLoading, postIsError, postMessage } = useSelector(
    (state) => state.posts
  );

  //Getting the post from the data base
  useEffect(() => {
    if (postIsError) {
      console.log(postMessage);
    }

    dispatch(getPost(id));

    return () => {
      dispatch(resetPosts());
    };
  }, [postIsError, postMessage, dispatch, id]);

  //Functions to handle image upload
  const [imageFile, setImageFile] = useState(null);
  const [imageLocal, setImageLocal] = useState(null);

  const uploadImage = async () => {
    if (imageLocal === null) {
      return posts.img;
    }
    if (imageLocal.includes('https://images.unsplash.com')) {
      return imageLocal;
    }
    const imageRef = ref(storage, `postImages/${imageFile.name + v4()}`);
    try {
      await uploadBytes(imageRef, imageFile);
      const imageURL = await getDownloadURL(imageRef);
      if (imageURL) {
        return imageURL;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Functions to handle Unsplash image generator
  let unsplashAPI = `https://api.unsplash.com/`;
  let unsplashAPIKEY = `?client_id=` + process.env.REACT_APP_UNSPLASH_KEY;

  const options = [
    { value: 'random', text: 'Random' },
    { value: 'colorful', text: 'Colorful' },
    { value: 'minimal', text: 'Minimal' },
    { value: 'textures', text: 'Textures' },
    { value: 'patterns', text: 'Patterns' },
    { value: 'abstract', text: 'Abstract' },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleClick = async (e) => {
    let randomImg = await getNewImage();
    setImageLocal(randomImg);
  };

  const getNewImage = async () => {
    if (selected === 'random') {
      let unsplashAPISEARCH = `photos/random${unsplashAPIKEY}`;
      try {
        let { data: images } = await axios.get(unsplashAPI + unsplashAPISEARCH);
        if (images) {
          return images.urls.regular;
        }
      } catch (error) {
        console.log(error);
      }
    }
    let randomNum = Math.floor(Math.random() * 10);
    let unsplashAPISEARCH = `search/photos/${unsplashAPIKEY}&query=${selected}&orientation=portrait&page=${randomNum}`;
    try {
      let { data: images } = await axios.get(unsplashAPI + unsplashAPISEARCH);
      if (images) {
        let allImages = images.results[randomNum];
        return allImages.urls.regular;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Functions to handle Text Edtior
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

  const [quill, setQuill] = useState();
  const [quillInnerHtml, setQuillInnerHtml] = useState();

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
    const length = quill.getLength() - 1;
    if (length === 0) {
      quill.root.innerHTML = posts.content;
    }
  }

  if (quill) {
    quill.on('text-change', function () {
      let justHtml = quill.root.innerHTML;
      setQuillInnerHtml(justHtml);
    });
  }

  //Functions to handle from data & post creation

  const [formData, setFormData] = useState({
    name: posts.name,
    type: posts.type,
  });

  const { name, type } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const img = await uploadImage();
      const postData = {
        name,
        type,
        content: quillInnerHtml,
        img,
      };
      dispatch(updatePost({ id: id, postData: postData }));
      navigate(`/posts/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (postIsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="CreateProject">
        <div className="edit-text">
          <h1>Editing the post {posts.name}</h1>
        </div>
        <div className="pick-photo">
          <label htmlFor="file-input">
            {imageLocal ? (
              <img src={imageLocal} alt="profile" />
            ) : (
              <img src={posts.img} alt="profile" />
            )}
          </label>
          <input
            onChange={(e) => {
              setImageLocal(URL.createObjectURL(e.target.files[0]));
              setImageFile(e.target.files[0]);
            }}
            id="file-input"
            type="file"
            key="file"
          />
          <div className="pick-photo-text">
            <p>Upload a photo or</p>
            <p>
              <span onClick={handleClick}>Generate</span> a{' '}
              <select
                value={selected}
                onChange={handleChange}
                name="sort"
                className="sort"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              one
            </p>
          </div>
        </div>
      </section>

      <section className="project-form">
        <form onSubmit={onSubmit}>
          <div className="name-genre">
            <div className="project-form-group">
              <input
                type="text"
                className="name"
                id="project-name"
                name="name"
                value={name}
                placeholder="Post Name"
                onChange={onChange}
                required
              />
            </div>
            <div className="project-form-group">
              <input
                type="text"
                className="genre"
                id="type"
                name="type"
                value={type}
                placeholder="type: Diary Note, Book Page, Poem, Song, eg..."
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="text-editor">
            {/* Text editor trying */}
            <div id="container" ref={wrapperRef}></div>
            {/* Text editor trying */}
          </div>
          <div className="project-form-group">
            <button type="submit" className="btn btn-block">
              Update your post
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditPost;
