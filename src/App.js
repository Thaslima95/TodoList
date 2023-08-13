import TodoForm from './TodoForm.jsx'
import './App.css';
import TodoTask from './TodoTask.jsx';

function App() {
  return (
    <div className="App">
     <div className="form">
      <h1 className="title" >Todo App</h1>
      <TodoForm/>
      
     </div>
    </div>
  );
}

export default App;
