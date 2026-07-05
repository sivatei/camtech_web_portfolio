const mongoose = require('mongoose');
const Project = require('./models/Project');

async function run() {
  await mongoose.connect('mongodb+srv://sivateyyim_portfolio:7AGuAwmEt49Q9IdP@cluster0.eihr7qg.mongodb.net/portfolio?appName=Cluster0&compressors=zlib');
  await Project.updateOne(
    { title: 'Portfolio Website' },
    { $set: { githubUrl: 'https://github.com/sivatei/camtech_web_portfolio.git' } }
  );
  console.log('GitHub link added to Portfolio Website project');
  process.exit(0);
}
run();
