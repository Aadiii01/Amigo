import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { Route, RouterProvider, createBrowserRouter,createRoutesFromElements,} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import App from "./App.jsx";
import "./index.css";
import Landing from "./Components/Landing/Landing.jsx";
import CreateAccount from "./Components/Auth/CreateAccount.jsx";
import SignInPage from "./Components/Auth/SignInPage.jsx";
import ForgotPassword from "./Components/Auth/ForgotPassword.jsx";
import VerifyEmail from "./Components/Auth/VerifyEmail.jsx";
import ResetPassword from "./Components/Auth/ResetPassword.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import { HomePage } from "./Components/Home/HomePage.jsx";
import Seetings from "./Components/Settings/Seetings.jsx";
import ChangePassword from "./Components/Settings/ChangePassword.jsx";
import UpateProfile from "./Components/Settings/UpateProfile.jsx";
import DeleteAccount from "./Components/Settings/DeleteAccount.jsx";
import GeneralSetting from "./Components/Settings/GeneralSetting.jsx";
import EmailVerified from "./Utils/EmailVerified.jsx";
import FeedUser from "./Components/Home/FeedUser.jsx";
import NotFound from "./Utils/NotFound.jsx";
import TimeExpire from "./Utils/TimeExpire.jsx";
import MyProfilePage from "./Components/Home/MyProfilePage.jsx";
import UserProfile from "./Components/Home/UserProfile.jsx";
import MyConnectionPage from "./Components/Home/MyConnectionPage.jsx";
import MyRequestPage from "./Components/Home/MyRequestPage.jsx";
import PublicRoute from "./Components/PublicRoute.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import ProfileRoute from "./Components/ProfileRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      <Route path="" element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path="auth" element={<PublicRoute><CreateAccount /></PublicRoute>} />
      <Route path="signin" element={<PublicRoute><SignInPage /></PublicRoute>} />
      <Route path="forgotpassword" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="reset-password/:id/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />
      <Route path="setprofile" element={<ProfileRoute><Profile /></ProfileRoute>} />

      <Route path="verifyemail" element={<VerifyEmail />} />
      <Route path="emailverified" element={<EmailVerified />} />
      <Route path="tokenexpire" element={<TimeExpire />} />

      <Route path="*" element={<NotFound />} />


      <Route path="home" element={<ProtectedRoute><HomePage /></ProtectedRoute>}>
        <Route index element={<FeedUser/>}/>
        <Route path="userProfile/:id" element={<UserProfile/>}/>
        <Route path="myconnection" element={<MyConnectionPage/>}/>
        <Route path="pendingconnection" element={<MyRequestPage/>}/>
        <Route path="profile" element={<MyProfilePage/>}/>
        <Route path="settings" element={<Seetings/>}>
          <Route index element={<GeneralSetting/>}/>
          <Route path="updatedetails" element={<UpateProfile/>}/>
          <Route path="changepassword" element={<ChangePassword/>}/>
          <Route path="delete-account" element={<DeleteAccount/>}/>
        </Route>
      </Route>

    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <LanguageProvider>
      <NextUIProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </NextUIProvider>
    </LanguageProvider>
    </Provider>
  </StrictMode>
);
