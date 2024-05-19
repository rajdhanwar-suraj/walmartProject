import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Signin from "./Pages/Auth/Signin"
import Signup from "./Pages/Auth/Signup"
import Wrapper from "./components/Wrapper";
import Home from "./Pages/Auth/Home";
import MainStates from "./ContextApi/MainState";

function App() {
  const [user, setUser] = useState(true);
  let userName = "Profile"
  return (
    <>
      <MainStates>
        <Wrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </Wrapper>
      </MainStates>
    </>
  );
}

export default App;