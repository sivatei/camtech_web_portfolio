const mongoose = require('mongoose');
const Project = require('./models/Project');

async function run() {
  await mongoose.connect('mongodb+srv://sivateyyim_portfolio:7AGuAwmEt49Q9IdP@cluster0.eihr7qg.mongodb.net/portfolio?appName=Cluster0&compressors=zlib');
  const p1 = await Project.findOne({ title: 'Internship Team Project' });
  const p2 = await Project.findOne({ title: 'Anywhere Beauty App Design' });
  console.log('Internship:', p1.imageUrl, p1.imageUrls);
  console.log('Anywhere Beauty:', p2.imageUrl, p2.imageUrls);
  process.exit(0);
}
run();
