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
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>
          <div className="min-h-screen overflow-hidden bg-black/100">
            <Home />
          </div>
        </>} />
        <Route path="/tasks" element={<>
          <div className="min-h-screen overflow-hidden bg-black/100">
            <Alert />
            <Tasks/>
            {/* {isLogin ? <Tasks/>:<AlertPage/>} */}
          </div>
        </>} />
        <Route path="/addtask" element={<>
          <div className="min-h-screen p-4 bg-black App">
          <Alert />
          <AddTodo/>
          </div>
        </>} />
        <Route path="/about" element={<>
          <div className="min-h-screen p-4 bg-black App">
            <About />
          </div>
        </>} />
        <Route path="/currentTask" element={<>
          <Alert />
          {/* <div className={`${myCurrentTask.color ? myCurrentTask.color : "bg-black"}  min-h-screen`}>
            {isLogin?<IndividualTask />:<AlertPage/>}
          </div> */}
          <IndividualTask/>
        </>} />
        <Route path="/signup" element={<>
          <div className="min-h-screen overflow-hidden bg-black App">
            <Alert />
            <SignUpPage />
          </div>
        </>} />
        <Route path="/login" element={<>
          <div className="min-h-screen bg-black App ">
            <Alert />
            <Login />
          </div>
        </>} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
