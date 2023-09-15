import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/*' element={<NavBar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;