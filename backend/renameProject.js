const mongoose = require('mongoose');
const Project = require('./models/Project');

async function run() {
  await mongoose.connect('mongodb+srv://sivateyyim_portfolio:7AGuAwmEt49Q9IdP@cluster0.eihr7qg.mongodb.net/portfolio?appName=Cluster0&compressors=zlib');
  await Project.updateOne(
    { title: 'Anywhere Beauty App Design' },
    { $set: { title: 'Supermarket App' } }
  );
  console.log('Project renamed to Supermarket App');
  process.exit(0);
}
run();
