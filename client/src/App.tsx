import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import Users from './components/Users';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './components/Landing';
import IsAuthed from './components/IsAuthed';
import Signup from './pages/Signup';

const httpLink = new HttpLink({ uri: "http://localhost:4000" })

const authLink = setContext(async (req, { headers }) => { // sets context for a request to be used by resolvers for auth
	const token = localStorage.getItem("token")

	return {
		...headers,
		headers: {
			Authorization: token ? `Bearer ${token}` : null
		}
	}
})

const link = authLink.concat(httpLink as any) //sends along authorization header to every http request
const client = new ApolloClient({
	link: link as any, // specifies the URL of our GraphQL server
  cache: new InMemoryCache() // is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.

})


function App() {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
        <Route exact path="/">
            <div>
              <Landing/>
            </div>  
          </Route>
          <Route exact path="/users">
            <IsAuthed>
              <div>
                <Users/>
              </div>  
            </IsAuthed>
          </Route>
          <Route path="/signup">
            <div>
              <Signup/>
            </div>  
          </Route>           
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
