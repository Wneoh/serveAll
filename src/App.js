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

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<DefaultLayout><DashboardPage/></DefaultLayout>} />
            <Route exact path="/ticket" element={<DefaultLayout><TicketPage/></DefaultLayout>} />
            <Route exact path="/newTicket" element={<DefaultLayout><AddTicketPage/></DefaultLayout>} />
            <Route exact path="/ticketDetail" element={<DefaultLayout><TicketDetailPage/></DefaultLayout>} />
            <Route exact path="/login" element={<LoginPage/>} />
          </Routes>       
      </BrowserRouter>
    </div>
  );
}

export default App;
