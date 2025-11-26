import { MemberProvider } from '@/integrations';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Navigate, 
  Outlet 
} from 'react-router-dom';

import { ScrollToTop } from '@/lib/scroll-to-top';

// Pages
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ProjectsPage from '@/components/pages/ProjectsPage';
import ProjectDetailPage from '@/components/pages/ProjectDetailPage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import MoodboardPage from '@/components/pages/MoodboardPage';

/* ---------------------- LAYOUT ---------------------- */

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

/* ---------------------- ROUTER CONFIG ---------------------- */

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "projects", element: <ProjectsPage /> },
        { path: "project/:id", element: <ProjectDetailPage /> },
        { path: "about", element: <AboutPage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "moodboard", element: <MoodboardPage /> },

        // Catch-all redirect
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_NAME,
  }
);

/* ---------------------- WRAPPER ---------------------- */

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
