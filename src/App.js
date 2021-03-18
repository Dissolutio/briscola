import React from 'react';
import { Switch, Route, useHistory } from 'react-router';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { Debug } from 'boardgame.io/debug';

import { Briscola } from './gameLogic.js';
import Board from './Board.js';
import Lobby from './Lobby.js';
import { HomePage, JoinPage, RematchLobby } from './briscola-ui';

function App() {
  const history = useHistory();
  const BriscolaClient = Client({
    game: Briscola,
    board: Board,
    multiplayer: Local(),
    debug: { impl: Debug },
  });
  const renderBriscolaClient = () => {
    return <BriscolaClient playerID="0" demo="true"></BriscolaClient>;
  };
  return (
    <Switch>
      <Route
        path="/home"
        exact
        render={(props) => <HomePage {...props} history={history} />}
      />
      <Route
        path="/join"
        exact
        render={(props) => <JoinPage {...props} history={history} />}
      />
      <Route path="/demo" exact render={() => renderBriscolaClient()} />
      <Route
        path="/rematch"
        render={(props) => <RematchLobby {...props} key={props.location.key} />}
      />
      <Route path="/lobby/:id" component={Lobby} />
      <Route
        path="/public_lobby/:id"
        render={(props) => <Lobby {...props} isPublic={true} />}
      />
      <Route
        path="*"
        render={(props) => <HomePage {...props} history={history} />}
      />
    </Switch>
  );
}

export default App;
