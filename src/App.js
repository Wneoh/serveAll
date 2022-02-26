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

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<DefaultLayout><DashboardPage/></DefaultLayout>} />
            <Route exact path="/note" element={<DefaultLayout><NotePage/></DefaultLayout>} />
            <Route exact path="/ticket" element={<DefaultLayout><TicketPage/></DefaultLayout>} />
            <Route exact path="/contact" element={<DefaultLayout><ContactPage/></DefaultLayout>} />
            <Route exact path="/login" element={<LoginPage/>} />
            <Route exact path="/error/:message" element={<NotFoundPage/>} />
            <Route exact path="*" element={<NotFoundPage/>} />
          </Routes>       
      </BrowserRouter>
    </div>
  );
}

export default App;
