// jshint esversion:6
import ProjectsPage from "./projects";
import { ProjectPage } from "./projects";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "./pages";
import { HomePage } from "./pages";

function App() {
  return (
    <div className="container">
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
