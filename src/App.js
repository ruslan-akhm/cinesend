import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Page from "./components/page/Page";
import Person from "./components/person/Person";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to="pages/1" />
      </Route>
      <Route path="/pages/:page" component={Page} exact />
      <Route path="/person/:id" component={Person} exact />
    </BrowserRouter>
  );
}

export default App;
