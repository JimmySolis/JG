import React from 'react';
import './App.css';
import './product.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/home';
import Product from './pages/product';

function App() {

  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product"  component={Product} />
        </Switch> 
    </Router>
  )
 
}

export default App;


