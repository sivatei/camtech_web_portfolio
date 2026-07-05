import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  verifyAdminKey,
} from "../api.js";
import ProjectCard from "./ProjectCard.jsx";
import ProjectForm from "./ProjectForm.jsx";
import ProjectDetailModal from "./ProjectDetailModal.jsx";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMsg, setErrorMsg] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  async function loadProjects() {
    setStatus("loading");
    try {
      const data = await getProjects();
      setProjects(data);
      setStatus("ready");
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleUnlock(e) {
    e.preventDefault();
    if (!keyInput.trim()) {
      alert("Please enter an admin key.");
      return;
    }
    try {
      await verifyAdminKey(keyInput);
      setAdminKey(keyInput);
      setIsAdmin(true);
    } catch (err) {
      alert(err.message || "Invalid admin key.");
    }
  }

  async function handleCreateOrUpdate(formData) {
    setSubmitting(true);
    try {
      if (editingProject) {
        await updateProject(editingProject._id, formData, adminKey);
      } else {
        await createProject(formData, adminKey);
      }
      setShowForm(false);
      setEditingProject(null);
      await loadProjects();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(project) {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    try {
      await deleteProject(project._id, adminKey);
      await loadProjects();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20 relative z-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">03 / projects</p>
          <h2 className="section-title mt-2 text-3xl text-paper">Projects</h2>
          <p className="mt-2 text-fog text-sm">
            Practice projects, built along the way.
          </p>
        </div>

        {!isAdmin ? (
          <form onSubmit={handleUnlock} className="w-full sm:w-auto flex gap-2 mt-4 sm:mt-0">
            <input
              type="password"
              placeholder="admin key"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="flex-1 sm:w-36 rounded-md border border-crimson/20 bg-surface/80 px-3 py-1.5 font-mono text-xs text-paper outline-none focus:border-ember focus:ring-1 focus:ring-crimson/20"
            />
            <button
              type="submit"
              className="rounded-md border border-crimson/30 px-4 py-1.5 font-mono text-xs text-fog hover:text-ember hover:border-ember transition-colors"
            >
              unlock
            </button>
          </form>
        ) : (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingProject(null);
            }}
            className="btn-glow text-xs px-4 py-2 w-full sm:w-auto text-center"
          >
            <span>+ add project</span>
          </button>
        )}
      </div>

      {isAdmin && showForm && (
        <ProjectForm
          initialProject={editingProject}
          submitting={submitting}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      )}

      <div className="mt-10">
        {status === "loading" && (
          <div className="flex items-center gap-3 font-mono text-sm text-fog">
            <span className="inline-block w-2 h-2 rounded-full bg-ember animate-ping" />
            fetching projects...
          </div>
        )}

        {status === "error" && (
          <p className="font-mono text-sm text-rose/80">
            ✗ Could not load projects: {errorMsg}. Is the API running and is
            VITE_API_URL set correctly?
          </p>
        )}

        {status === "ready" && projects.length === 0 && (
          <div className="glass-card p-8 text-center">
            <p className="font-mono text-sm text-fog">
              No projects yet — add one above or run{" "}
              <code className="text-ember">npm run seed</code> in the backend.
            </p>
          </div>
        )}

        {status === "ready" && projects.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={i}
                isAdmin={isAdmin}
                onEdit={(p) => {
                  setEditingProject(p);
                  setShowForm(true);
                }}
                onDelete={handleDelete}
                onClick={setSelectedProject}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
