// Run with: npm run seed
// Populates the database with Yim Sivatey's starting project data.
// Safe to re-run: it clears the "projects" collection first, then re-inserts.

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");
const Project = require("../models/Project");

const projects = [
  {
    title: "Food Receipt Front-End",
    description:
      "An interactive frontend-only website for food course receipt generation, covering course choices, pricing calculations, and invoice display.",
    techStack: ["React", "Tailwind CSS"],
    videoUrl: "/food-receipt.mp4",
    imageUrl: "/food-receipt-thumbnail.png",
    githubUrl: "",
    liveUrl: "",
    role: "Solo Project",
    featured: true,
    order: 1,
  },
  {
    title: "Skincare E-Commerce",
    description:
      "A responsive shopping website storefront mockup showcasing catalog listing, product detail views, and a fully client-side checkout experience.",
    techStack: ["React", "Tailwind CSS"],
    videoUrl: "/skincare.mp4",
    imageUrl: "/skincare-thumbnail.png",
    githubUrl: "",
    liveUrl: "",
    role: "Solo Project",
    featured: true,
    order: 2,
  },
  {
    title: "Portfolio Website",
    description:
      "A personal full-stack portfolio site showcasing selected work and skills. Features an Express REST API backend and a React/Tailwind frontend.",
    techStack: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    videoUrl: "/Portfolio.mp4",
    imageUrl: "/portfolio-thumbnail.png",
    githubUrl: "https://github.com/sivateyyim",
    liveUrl: "",
    role: "Solo Project",
    featured: true,
    order: 3,
  },
  {
    title: "Internship Team Project",
    description:
      "Served as the UX/UI designer for the team project. Designed wireframes in Figma and collaborated on building high-fidelity layout components with React and Tailwind CSS.",
    techStack: ["Figma", "React", "Tailwind CSS"],
    imageUrl: "/internship.png",
    githubUrl: "",
    liveUrl: "",
    role: "Team Designer",
    featured: true,
    order: 4,
  },
  {
    title: "Anywhere Beauty App Design",
    description:
      "Designed a comprehensive UX/UI prototype for a modern beauty shopping mobile application. Conducted user research, wireframing, high-fidelity mockups, and interactive prototype flows in Figma to minimize cart abandonment.",
    techStack: ["Figma", "User Research", "Wireframing"],
    imageUrl: "/anywhere-beauty.png",
    githubUrl: "",
    liveUrl: "",
    role: "Lead UX/UI Designer",
    featured: true,
    order: 5,
  },
  {
    title: "Bus Ticket Booking App Design",
    description:
      "Designed an intuitive UX/UI prototype for a bus ticketing mobile application. Created schedule search interfaces, dynamic seat layout maps, and checkout checkout flows in Figma to ensure a friction-free booking journey.",
    techStack: ["Figma", "UX/UI Design", "Prototyping"],
    imageUrl: "/bus-ticket-booking.png",
    githubUrl: "",
    liveUrl: "",
    role: "UX/UI Designer",
    featured: true,
    order: 6,
  },
];

async function seed() {
  await connectDB();
  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log(`Seeded ${projects.length} projects.`);
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
