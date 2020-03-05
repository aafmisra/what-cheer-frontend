import React, { useState } from 'react';
import { UserContext } from './UserContext';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import New from './components/New';
import SignIn from './components/Signin';
import SignUp from './components/Signup';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <main>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/new"
              render={props => {
                if (user) {
                  return <New {...props} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            {/* <Route exact path='/books/:id'/> */}
          </Switch>
        </main>
        <footer></footer>
      </UserContext.Provider>
    </div>
  );
}

export default App;
