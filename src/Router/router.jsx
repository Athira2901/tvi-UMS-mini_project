import {createBrowserRouter} from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Passwordrecovery from "../Pages/Passwordrecovery";
import Otpgenerator from "../Pages/Otpgenerator";
import Confirmpassword from "../Pages/Confirmpassword";
import Dasboard from "../Pages/Dasboard";
import App from "../App";
import Edit from "../modal/Edit";
import Userregister from "../Pages/Userregister";
import Userdetails from "../Pages/Userdetails";
import Supervisor from "../Pages/Supervisor";

const router=createBrowserRouter([
  {path:"",element:<App/>},
  {path:"register",element:<Register/>},
  {path:"passwordrecovery",element:<Passwordrecovery/>},
  {path:"otpgenerator",element:<Otpgenerator/>},
  {path:"confirmpassword",element:<Confirmpassword/>},
  {path:"dashboard",element:<Dasboard/>},
  {path:"/edit/:id",element:<Edit/>},
  {path:"userregister",element:<Userregister/>},
  
  {path:"supervisor",element:<Supervisor/>},
  {path:"Userdetails",element:<Userdetails/>}
  
  

]);
export default router;