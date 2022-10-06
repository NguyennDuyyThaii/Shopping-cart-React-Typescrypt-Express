import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import {Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/not-found" element={<NotFound />}/>
          <Route path="*" element={<Navigate to="/not-found" replace/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
