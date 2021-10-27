import React from 'react';
import { useQuery, gql } from '@apollo/client';


const ALL_USERS = gql`
  query Query{
    allUsers {
      id,
      name
    }
  }
`
interface User {
  id: string,
  name: string
}
function Users() {
  const {data, loading, error} = useQuery(ALL_USERS)
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>

  return (
      <div>
        {
            data.allUsers.map((user: User) => {
                return <p>{user.name}</p>
            })
        }
        </div>
  );
}

export default Users;
