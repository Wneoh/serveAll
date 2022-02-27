import './App.css';
import TicketPage from './pages/ticket/TicketPage';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import { DefaultLayout } from './components/layout/DefaultLayout';
import NotePage from './pages/note/NotePage';
import NotFoundPage from './pages/NotFoundPage';
import ContactPage from './pages/contact/ContactPage';
import PrivateRoute from './components/route/PrivateRoute';
import { Router } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginPage/>}/>
        <Route exact path="/" element={
          <PrivateRoute>
            <DashboardPage/>
          </PrivateRoute>
        }/>
        <Route exact path="/note" element={
          <PrivateRoute>
            <NotePage/>
          </PrivateRoute>
        }/>
        <Route exact path="/ticket" element={
          <PrivateRoute>
            <TicketPage/>
          </PrivateRoute>
        }/>
        <Route exact path="/contact" element={
          <PrivateRoute>
            <ContactPage/>
          </PrivateRoute>
        }/>
        <Route path="*" element={
          <NotFoundPage/>
        }/>
      </Routes>
      </BrowserRouter>
);
}


export default App;
