import React, { useState, useEffect } from 'react';

const NewAlbum = () => {
  const [visibleRecords, setVisibleRecords] = useState([]);

  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const recordsPerPage = 50;

  const loadAlbum = async (startIndex) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_start=${startIndex}&_limit=${recordsPerPage}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const loadMoreRecord = async () => {
    const data = await loadAlbum(visibleRecords.length);
    setIsButtonDisable(data.length ? false : true);
    setVisibleRecords((prevRecords) => [...prevRecords, ...data]);
  };

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await loadAlbum(0);
      setIsButtonDisable(data.length ? false : true);
      setVisibleRecords(data);
    };
    fetchRecords();
  }, []);

  return (
    <div>
      <span>
        Second level interview where load more or lazy loading functionality
        need to implement{' '}
      </span>
      <ul>
        {visibleRecords &&
          visibleRecords.map((record) => (
            <li key={record.id}>
              <h3>{record.title}</h3>
              <p>ID: {record.id}</p>
              {record.thumbnailUrl && (
                <img
                  src={record.thumbnailUrl}
                  alt={record.title}
                  loading="lazy"
                />
              )}
            </li>
          ))}
      </ul>
      <div>
        <button onClick={loadMoreRecord} disabled={isButtonDisable}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default NewAlbum;
