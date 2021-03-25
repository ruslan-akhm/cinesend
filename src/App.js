import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to="pages/1" />
      </Route>
      <Route path="/pages/:page" component={Page} />
      <Route path="/:id" component={Person} />
    </BrowserRouter>
  );
}

export default App;
