import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextEditor from '../components/TextEditor';
import placeHolder from '../media/placeholder.png';
import './CreateScribble.css';

function CreateScribble() {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    description: '',
    content: '',
  });

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { name, genre, description, content } = formData;
  return (
    <>
      <section className="CreateProject">
        <div className="pick-photo">
          <img src={placeHolder} alt="" />
          <div className="pick-photo-text">
            <p>Upload a photo or</p>
            <p>
              <span>Generate</span> a{' '}
              <select name="sort" className="sort">
                <option value="new">Random</option>

                <option value="old">Colorful</option>

                <option value="most-liked">Minimal</option>
              </select>
              one
            </p>
          </div>
        </div>
      </section>

      <section className="project-form">
        <form>
          <div className="name-genre">
            <div className="project-form-group">
              <input
                type="text"
                className="name"
                id="project-name"
                name="name"
                value={name}
                placeholder="Project Name"
                onChange={onChange}
              />
            </div>
            <div className="project-form-group">
              <input
                type="text"
                className="genre"
                id="genre"
                name="genre"
                value={genre}
                placeholder="Genre: Diary, Book, Poem, Script, eg..."
                onChange={onChange}
              />
            </div>
          </div>
          <div className="project-form-group">
            <textarea
              id="scribble-description"
              name="description"
              className="description"
              rows="2"
              cols="10"
              minLength="10"
              maxLength="150"
              value={description}
              placeholder="Description"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="text-editor">
            {/* Text editor trying */}
            <TextEditor />
            {/* Text editor trying */}
          </div>
          <div className="project-form-group">
            <button
              type="submit"
              onClick={(e) => {
                console.log('hi');
              }}
              className="btn btn-block"
            >
              Create your project
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateScribble;
