import { createBrowserRouter } from "react-router-dom";

import { PublicHomePage } from "../../../pages/public/home";
import { TeacherMainPage } from "../../../pages/teacher/main";
import { StudentMainPage } from "../../../pages/student/main";

import { LoginPage } from "../../../pages/auth/login";
import { RegistrationPage } from "../../../pages/auth/registration";
import { ChoiceRolePage } from "../../../pages/auth/choice-role";

export const router = createBrowserRouter([
  { path: "/", element: <PublicHomePage /> },
  { path: "/teacher", element: <TeacherMainPage /> },
  { path: "/student", element: <StudentMainPage /> },

  { path: "/login", element: <LoginPage /> },
  { path: "/registration", element: <RegistrationPage /> },
  { path: "/choice-role", element: <ChoiceRolePage /> },
]);