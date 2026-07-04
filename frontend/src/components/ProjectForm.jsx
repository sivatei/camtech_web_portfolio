import { useState, useEffect } from "react";

const emptyForm = {
  title: "",
  description: "",
  techStack: "",
  role: "",
  githubUrl: "",
  liveUrl: "",
};

export default function ProjectForm({ initialProject, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialProject) {
      setForm({
        title: initialProject.title || "",
        description: initialProject.description || "",
        techStack: (initialProject.techStack || []).join(", "),
        role: initialProject.role || "",
        githubUrl: initialProject.githubUrl || "",
        liveUrl: initialProject.liveUrl || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialProject]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      techStack: form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 rounded-lg border border-crimson/25 bg-surface/80 p-5"
    >
      <p className="font-mono text-xs uppercase tracking-wide text-ember">
        {initialProject ? "edit project" : "new project"}
      </p>

      <div>
        <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="input-field resize-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">Tech stack (comma separated)</label>
          <input
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            placeholder="React, Tailwind CSS"
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">Role / context</label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Solo project, Team project..."
            className="input-field"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">GitHub URL</label>
          <input
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">Live URL</label>
          <input
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
            className="input-field"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-glow text-xs px-4 py-2"
        >
          <span>{submitting ? "saving..." : initialProject ? "save changes" : "create project"}</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-outline text-xs px-4 py-2"
        >
          cancel
        </button>
      </div>
    </form>
  );
}
