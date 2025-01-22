import './App.css';

import AddTodo from './Components/AddTodo';
import Tasks from './Components/Tasks';
import { BrowserRouter, Routes, Route } from "react-router";
import About from './Components/About';
import IndividualTask from './Components/IndividualTask';
import { useSelector } from 'react-redux';
import Home from './Components/Home';
import SignUpPage from './Components/SIgnUpPage';
import Login from './Components/Login';
import Alert from './Components/Alert';
import { useEffect } from 'react';
import AlertPage from './Components/AlertPage';


function App() {
  const isLogin=useSelector((state)=>{return state.auth.isLogin})

  useEffect(() => {
    console.log(isLogin)
  }, [isLogin])
  
  const myCurrentTask = useSelector((state) => { return state.todo.initialTask })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>
          <div className=" min-h-screen bg-black/100  overflow-hidden">
            <Home />
          </div>
        </>} />
        <Route path="/tasks" element={<>
          <div className=" min-h-screen bg-black/100  overflow-hidden">
            <Alert />
            {isLogin ? <Tasks/>:<AlertPage/>}
          </div>
        </>} />
        <Route path="/addtask" element={<>
          <div className="App min-h-screen bg-black p-4">
          <Alert />
            {isLogin?<AddTodo />:<AlertPage/>}
          </div>
        </>} />
        <Route path="/about" element={<>
          <div className="App min-h-screen bg-black p-4">
            <About />
          </div>
        </>} />
        <Route path="/currentTask" element={<>
          <Alert />
          <div className={`${myCurrentTask.color ? myCurrentTask.color : "bg-black"}  min-h-screen`}>
            {isLogin?<IndividualTask />:<AlertPage/>}
          </div>
        </>} />
        <Route path="/signup" element={<>
          <div className="App min-h-screen bg-black overflow-hidden">
            <Alert />
            <SignUpPage />
          </div>
        </>} />
        <Route path="/login" element={<>
          <div className="App min-h-screen bg-black ">
            <Alert />
            <Login />
          </div>
        </>} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
