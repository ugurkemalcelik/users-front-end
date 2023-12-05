import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";
import {RouterProvider} from "react-router-dom";
import {router} from "./router";

function App() {  

  return (
    
    <RouterProvider router={router}/>

  );
}

export default App;
