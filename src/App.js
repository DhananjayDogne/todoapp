import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TodoApp from './components/Todoform';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TodoApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
