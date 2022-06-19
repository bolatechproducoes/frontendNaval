// Importa o react
import React from 'react';
// Importa os metódos BrowserRouter, Route e Switch do react-router-dom
import { Switch } from 'react-router-dom';

// Importa o componente MyRoute
import MyRoute from './MyRoute';

// Importa o componente Login
import Login from '../pages/Login';
// Importa o componente Boat
import Boat from '../pages/Boat';
// Importa o componente Boats
import Boats from '../pages/Boats';
// Importa o componente Fotos
import Fotos from '../pages/Fotos';
// Importa o componente Register
import Register from '../pages/Register';
// Importa o componente Page404
import Page404 from '../pages/Page404';
// Importa o componente Shipyards
import Shipyards from '../pages/Shipyards';
// Importa o componente Shipyard
import Shipyard from '../pages/Shipyard';
// Importa o componente Clubs
import Clubs from '../pages/Clubs';
// Importa o componente Club
import Club from '../pages/Club';
// Importa o componente Sailors
import Sailors from '../pages/Sailors';
// Importa o componente Sailor
import Sailor from '../pages/Sailor';
// Importa o componente ModelsTB
import ModelsTB from '../pages/ModelsTB';
// Importa o componente ModelTB
import ModelTB from '../pages/ModelTB';
// Importa o componente Owners
import Owners from '../pages/Owners';
// Importa o componente Owner
import Owner from '../pages/Owner';
// Importa o componente Home
import Home from '../pages/Home';

// Exporta o componente Switch que define as rotas da aplicação utilizando o componente MyRoute
export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Home} isClosed />
      <MyRoute exact path="/boats/" component={Boats} isClosed />
      <MyRoute exact path="/boat/:id/edit/" component={Boat} isClosed />
      <MyRoute exact path="/boat/" component={Boat} isClosed />
      <MyRoute exact path="/fotos/:id" component={Fotos} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute exact path="/shipyards/" component={Shipyards} isClosed />
      <MyRoute exact path="/shipyard/:id/edit/" component={Shipyard} isClosed />
      <MyRoute exact path="/shipyard/" component={Shipyard} isClosed />
      <MyRoute exact path="/clubs/" component={Clubs} isClosed />
      <MyRoute exact path="/club/:id/edit/" component={Club} isClosed />
      <MyRoute exact path="/club/" component={Club} isClosed />
      <MyRoute exact path="/sailors/" component={Sailors} isClosed />
      <MyRoute exact path="/sailor/:id/edit/" component={Sailor} isClosed />
      <MyRoute exact path="/sailor/" component={Sailor} isClosed />
      <MyRoute exact path="/model/:id/edit/" component={ModelTB} isClosed />
      <MyRoute exact path="/model/" component={ModelTB} isClosed />
      <MyRoute exact path="/models/" component={ModelsTB} isClosed />
      <MyRoute exact path="/owners/" component={Owners} isClosed />
      <MyRoute exact path="/owner/:id/edit/" component={Owner} isClosed />
      <MyRoute exact path="/owner/" component={Owner} isClosed />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
