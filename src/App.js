import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddUser from "./Pages/AddUser";
import Header from "./Pages/Header"
import User from "./Pages/User";
import UserPdf from "./Pages/UserPdf";


export default function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/userPdf' element={<UserPdf></UserPdf>}></Route>
        <Route path='/user' element={<User></User>}></Route>
        <Route path="/addUser" element={<AddUser></AddUser>}></Route>
        <Route path="*"></Route>
      </Routes>
    </div>
  );
}
