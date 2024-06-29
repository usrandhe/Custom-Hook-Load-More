import useFetch from './useFetch';
const List = () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const { data, loading, error } = useFetch(url);
  if (loading) return <p> Loading... </p>;
  if (error) return <p> Error..</p>;
  return (
    <>
      <span>
        First level interview task to create custom hook for useEffect
      </span>
      <ul>
        {data.map((user) => (
          <li key={user.id}> {user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default List;
