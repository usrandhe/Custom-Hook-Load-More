import React, { useState, useEffect, useRef, useCallback } from 'react';

const Album = () => {
  const [records, setRecords] = useState([]);
  const [visibleRecords, setVisibleRecords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const loader = useRef(null);
  const recordsPerPage = 3;

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/photos'
        );
        const data = await response.json();
        setRecords(data);
        setVisibleRecords(data.slice(0, recordsPerPage));
        setCurrentIndex(recordsPerPage);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, []);

  const loadMore = useCallback(() => {
    const newRecords = records.slice(
      currentIndex,
      currentIndex + recordsPerPage
    );
    setVisibleRecords((prevRecords) => [...prevRecords, ...newRecords]);
    setCurrentIndex((prevIndex) => prevIndex + recordsPerPage);
  }, [currentIndex, records]);

  // on scroll with refrence to div
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loadMore]);

  return (
    <div>
      <span>
        Second level interview where load more or lazy loading functionality
        need to implement{' '}
      </span>
      <ul>
        {visibleRecords.map((record) => (
          <li key={record.id}>
            <h3>{record.title}</h3>
            <p>ID: {record.id}</p>
            <img src={record.thumbnailUrl} alt={record.title} />
          </li>
        ))}
      </ul>
      {/* <div ref={loader} /> */}
      <div>
        <button
          onClick={loadMore}
          disabled={currentIndex >= records.length - recordsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Album;
