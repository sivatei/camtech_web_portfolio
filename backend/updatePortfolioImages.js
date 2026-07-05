const mongoose = require('mongoose');
const Project = require('./models/Project');

async function run() {
  await mongoose.connect('mongodb+srv://sivateyyim_portfolio:7AGuAwmEt49Q9IdP@cluster0.eihr7qg.mongodb.net/portfolio?appName=Cluster0&compressors=zlib');
  const res = await Project.updateOne(
    { title: 'Portfolio Website' },
    { 
      $set: { 
        videoUrl: '',
        imageUrls: [
          '/Port1 (1).png',
          '/Port2.png',
          '/Port3.png',
          '/Port4.png',
          '/Port5.png',
          '/Port6.png'
        ]
      } 
    }
  );
  console.log('Updated:', res);
  process.exit(0);
}
run();
