import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';
import Users from './components/Users';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './components/Landing';
const client = new ApolloClient({
  uri: "http://localhost:4000", // specifies the URL of our GraphQL server
  cache: new InMemoryCache() // is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
})

function App() {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/users">
            <div>
              <Users/>
            </div>  
          </Route>
          <Route path="/">
            <div>
              <Landing/>
            </div>  
          </Route>          
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
