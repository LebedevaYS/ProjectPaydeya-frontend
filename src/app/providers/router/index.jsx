import { createBrowserRouter } from "react-router-dom";

import { APP_ROUTES } from "@/shared/config/routes";
import {
  ChoiceRolePage,
  LoginPage,
  PublicHomePage,
  RegistrationPage,
  StudentMainPage,
  TeacherMainPage,
} from "@/pages";

export const router = createBrowserRouter([
  { path: APP_ROUTES.home, element: <PublicHomePage /> },
  { path: APP_ROUTES.teacher, element: <TeacherMainPage /> },
  { path: APP_ROUTES.student, element: <StudentMainPage /> },
  { path: APP_ROUTES.login, element: <LoginPage /> },
  { path: APP_ROUTES.registration, element: <RegistrationPage /> },
  { path: APP_ROUTES.choiceRole, element: <ChoiceRolePage /> },
]);
