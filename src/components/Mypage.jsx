import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig.js';
import { useNavigate, Navigate } from 'react-router-dom';
import Title from './Title';
import Form from './Form';
import Results from './Results';
import axios from 'axios';
const UnsplashApi = process.env.REACT_APP_UNSPLASH_API_KEY;

const Mypage = () => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate('/login/');
  };

  const [word, setWord] = useState('');
  const [photo, setPhoto] = useState([]);

  const getPhotoData = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${word}&client_id=${UnsplashApi}`
      )
      .then((res) => {
        // console.log(res);
        setPhoto(res.data.results);
        // console.log(photo);
      });
  };

  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/login/`} />
          ) : (
            <>
              <h1>マイページ</h1>
              <p>{user && user.email}</p>
              <button onClick={logout}>ログアウト</button>
              <div className="App">
                <Title />
                <Form
                  setWord={setWord}
                  getPhotoData={getPhotoData}
                />
                <Results photo={photo} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Mypage;
