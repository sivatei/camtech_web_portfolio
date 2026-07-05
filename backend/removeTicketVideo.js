const mongoose = require('mongoose');
const Project = require('./models/Project');

async function run() {
  await mongoose.connect('mongodb+srv://sivateyyim_portfolio:7AGuAwmEt49Q9IdP@cluster0.eihr7qg.mongodb.net/portfolio?appName=Cluster0&compressors=zlib');
  await Project.updateOne(
    { title: 'Bus Ticket Booking App Design' },
    { $unset: { videoUrl: "" } }
  );
  console.log('Video removed from Bus Ticket project');
  process.exit(0);
}
run();
