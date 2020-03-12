import React, { useState } from 'react';
import { UserContext } from './UserContext';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import New from './components/New';
import Edit from './components/Edit';
import ShowEntry from './components/ShowEntry';
import SignIn from './components/Signin';
import SignUp from './components/Signup';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <header>
          <Header />
        </header>
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
            <Route
              exact
              path="/entries/:id/"
              render={props => {
                if (user) {
                  return <ShowEntry {...props} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <Route path="/new" component={New} />
            <Route
              exact
              path="/entries/:id/edit/"
              render={props => {
                if (user) {
                  return <Edit {...props} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
          </Switch>
        </main>
        <footer>
          <p>
            Made by Asha Misra and <br></br>Chris Wargo 2020{' '}
            <span role="img" aria-label="sun emoji">
              &#9728;&#65039;
            </span>
          </p>
          <div>
            <a
              href="https://github.com/aafmisra/what-cheer-frontend"
              target="_blank"
              rel="noopener noreferrer"
            >
              frontend repo on GitHub
            </a>
            <br></br>
            <a
              href="https://github.com/chrisrw/What-Cheer-Back-End"
              target="_blank"
              rel="noopener noreferrer"
            >
              backend repo on GitHub
            </a>
          </div>
        </footer>
      </UserContext.Provider>
    </div>
  );
}

export default App;
