const mongoose = require("mongoose");

  const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    techStack: { type: [String], default: [] },
    imageUrl: { type: String, default: "" },
    imageUrls: { type: [String], default: [] },
    videoUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    role: { type: String, default: "" }, // e.g. "Frontend Developer", "Team Project"
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
