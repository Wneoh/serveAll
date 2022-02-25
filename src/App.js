import './App.css';
import TicketPage from './pages/ticket/TicketPage';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import { AddTicketPage } from './pages/ticket/AddTicketPage';
import TicketDetailPage from './pages/ticket/TicketDetailPage';
import { DefaultLayout } from './components/layout/DefaultLayout';
import NotePage from './pages/note/NotePage';
import { AddNotePage } from './pages/note/AddNotePage';
import NotFoundPage from './pages/NotFoundPage';
import ContactPage from './pages/contact/ContactPage';
import { AddContactPage } from './pages/contact/AddContactPage';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<DefaultLayout><DashboardPage/></DefaultLayout>} />
            <Route exact path="/note" element={<DefaultLayout><NotePage/></DefaultLayout>} />
            <Route exact path="/ticket" element={<DefaultLayout><TicketPage/></DefaultLayout>} />
            <Route exact path="/contact" element={<DefaultLayout><ContactPage/></DefaultLayout>} />
            <Route exact path="/newNote" element={<DefaultLayout><AddNotePage/></DefaultLayout>} />
            <Route exact path="/newTicket" element={<DefaultLayout><AddTicketPage/></DefaultLayout>} />
            <Route exact path="/newContact" element={<DefaultLayout><AddContactPage/></DefaultLayout>} />
            <Route exact path="/noteDetail/:id" element={<DefaultLayout><AddNotePage/></DefaultLayout>} />
            <Route exact path="/contactDetail/:id" element={<DefaultLayout><AddContactPage/></DefaultLayout>} />
            <Route exact path="/ticketDetail" element={<DefaultLayout><TicketDetailPage/></DefaultLayout>} />
            <Route exact path="/login" element={<LoginPage/>} />
            <Route exact path="/error/:message" element={<NotFoundPage/>} />
            <Route exact path="*" element={<NotFoundPage/>} />
          </Routes>       
      </BrowserRouter>
    </div>
  );
}

export default App;
