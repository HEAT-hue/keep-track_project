// jshint esversion:6
import ProjectsPage from "./projects";
import { ProjectPage } from "./projects";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "./pages";
import { HomePage } from "./pages";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <div className="container">
      <ToastContainer limit={1} autoClose={2000} />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
