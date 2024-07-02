import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import './index.css';
import Chat from './components/Chat.js';

const App = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('question', question);
    if (file) {
      formData.append('file', file);
    }

    try {
      // Send a POST request to the backend with the form data
      const res = await axios.post('http://localhost:8000/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data.answer);  // Set the response state with the answer from the backend
      setError(null);  // Clear any previous errors
    } catch (err) {
      console.error(err);  // Log any errors
      setError('Error fetching response');  // Set the error message
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="chat-container container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center my-4">Chat Clone</h1>
          <p className="text-center">Ask me anything!</p>
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="form-group space-between input-group">
              <div className="input-group-prepend">
                <label htmlFor="fileInput" className="btn btn-outline-secondary">
                  <i className="fas fa-paperclip"></i>
                  <input
                    type="file"
                    className="custom-file-input"
                    id="fileInput"
                    name="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your query"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-arrow-up"></i>
                </button>
              </div>
            </div>
            {fileName && <div className="mt-2">Attached file: {fileName}</div>}
          </form>
          {error && <div className="alert alert-danger">{error}</div>}
          <div>
            <Chat />
            <h2>Response:</h2>
            <p>{response}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
