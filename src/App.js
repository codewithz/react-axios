import './App.css';
import CustomerList from './components/customer/CustomerList';
import CustomerForm from './components/customer/CustomerForm';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div >
    <ToastContainer />
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
