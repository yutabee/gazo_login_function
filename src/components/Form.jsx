import React from 'react';

const Form = ({ setWord, getPhotoData }) => {
  return (
    <>
      <form>
        <input
          type="text"
          name="keyword"
          placeholder="word"
          onChange={(e) => setWord(e.target.value)}
          style={{
            width: '250px',
            padding: '0.5rem',
            marginRight: '0.5rem'
          }}
        />
        <button
          type="submit"
          onClick={getPhotoData}
          style={{ padding: '0.5rem' }}
        >
          Search
        </button>
      </form>
    </>
  );
};

export default Form;
