import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AdminPanel from "./pages/AdminPanel";
import Register from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import InstructorPanel from "./pages/InstructorPanel";
function App() {
  return (
    <>
      <Router>
        <div>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/instructor' element={<InstructorPanel />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
