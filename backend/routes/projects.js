const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const requireAdmin = require("../config/requireAdmin");

// POST /api/projects/verify-admin - verify if admin key is correct
router.post("/verify-admin", requireAdmin, (req, res) => {
  res.json({ verified: true });
});

// GET /api/projects - list all projects (public)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects.", error: err.message });
  }
});

// GET /api/projects/:id - get one project (public)
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found." });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: "Invalid project id.", error: err.message });
  }
});

// POST /api/projects - create a project (admin only)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to create project.", error: err.message });
  }
});

// PUT /api/projects/:id - update a project (admin only)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Project not found." });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update project.", error: err.message });
  }
});

// DELETE /api/projects/:id - delete a project (admin only)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found." });
    res.json({ message: "Project deleted.", id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete project.", error: err.message });
  }
});

module.exports = router;
