const mongoose = require('mongoose');
const Project = require('./models/Project');

async function run() {
  await mongoose.connect('mongodb+srv://sivateyyim_portfolio:7AGuAwmEt49Q9IdP@cluster0.eihr7qg.mongodb.net/portfolio?appName=Cluster0&compressors=zlib');
  const res = await Project.updateOne({ title: 'Anywhere Beauty App Design' }, { $set: { description: 'Designed a comprehensive UX/UI prototype for a modern beauty shopping mobile application. Conducted user research, wireframing, high-fidelity mockups, and interactive prototype flows in Figma to minimize cart abandonment.' } });
  console.log('Updated:', res);
  process.exit(0);
}
run();
