import {createBrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Upload from "./components/Upload";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import EditUser from "./components/EditUser";
import GetAllUsers from "./components/GetAllUsers";
import GetSingleUser from "./components/GetSingleUser";
import BlockUser from "./components/BlockUser";
import AddQuestion from "./components/AddQuestion";
import GetAllQuestions from "./components/GetAllQuestions";
import EditQuestion from "./components/EditQuestion";
import LikeQuestion from "./components/LikeQuestion";
import UndolikeQuestion from "./components/UndolikeQuestion";
import AddAnswer from "./components/AddAnswer";
import GetAllAnswersToQuestion from "./components/GetAllAnswersToQuestion";
import EditAnswer from "./components/EditAnswer";
import DeleteAnswer from "./components/DeleteAnswer";
import LikeAnswer from "./components/LikeAnswer";
import UndolikeAnswer from "./components/UndolikeAnswer";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <Home/>
            </div>
        )
    },
    {
        path: "/register",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <Register/>
            </div>
        )
    },
    {
        path: "/profile",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <Profile/>
            </div>
        )
    },
    {
        path: "/login",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <Login/>
            </div>
        )
    },
    {
        path: "/logout",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <Logout/>
            </div>
        )
    },
    {
        path: "/upload",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <Upload/>
            </div>
        )
    },
    {
        path: "/forgotpassword",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <ForgotPassword/>
            </div>
        )
    },
    {
        path: "/resetpassword",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <ResetPassword/>
            </div>
        )
    },
    {
        path: "/edituser/:id",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <EditUser/>
            </div>
        )
    },
    {
        path: "/getallusers",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <GetAllUsers/>
            </div>
        )
    },
    {
        path: "/getsingleuser/:id",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <GetSingleUser/>
            </div>
        )
    },
    {
        path: "/blockuser/:id",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <BlockUser/>
            </div>
        )
    },
    {
        path: "/addquestion",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <AddQuestion/>
            </div>
        )
    },
    {
        path: "/getallquestions",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <GetAllQuestions/>
            </div>
        )
    },
    {
        path: "/editquestion/:id",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <EditQuestion/>
            </div>
        )
    },
    {
        path: "/likequestion/:id",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <LikeQuestion/>
            </div>
        )
    },
    {
        path: "/undolikequestion/:id",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <UndolikeQuestion/>
            </div>
        )
    },
    {
        path: "/:id/addanswer",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <AddAnswer/>
            </div>
        )
    },
    {
        path: "/:id/getallanswers/",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <GetAllAnswersToQuestion/>
            </div>
        )
    },
    {
        path: "/:questionId/editanswer/:id",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <EditAnswer/>
            </div>
        )
    },
    {
        path: "/deleteanswer",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <DeleteAnswer/>
            </div>
        )
    },
    {
        path: "/:questionId/likeanswer/:id",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <LikeAnswer/>
            </div>
        )
    },
    {
        path: "/:questionId/undolikeanswer/:id",
        element: (
            <div>
                <Navbar title={"UserApp"}/>
                <UndolikeAnswer/>
            </div>
        )
    },

    


])

