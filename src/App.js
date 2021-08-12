import logo from './logo.svg';
import './App.css';
import CustomerList from './components/customer/CustomerList';
import Counter from './components/Counter';
import CustomerForm from './components/customer/CustomerForm';
import {BrowserRouter,Route,Switch} from 'react-router-dom';



function App() {
  return (
    <div >
   
    <BrowserRouter>
    <Switch>
    <Route path="/customers" component={CustomerList} />
    <Route path="/customer/new" component={CustomerForm} />
    <Route path="/customer/:id/edit" component={CustomerForm} />
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
