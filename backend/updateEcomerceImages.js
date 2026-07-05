const mongoose = require('mongoose');
const Project = require('./models/Project');

async function run() {
  await mongoose.connect('mongodb+srv://sivateyyim_portfolio:7AGuAwmEt49Q9IdP@cluster0.eihr7qg.mongodb.net/portfolio?appName=Cluster0&compressors=zlib');
  const res = await Project.updateOne(
    { title: 'Skincare E-Commerce' },
    { 
      $set: { 
        videoUrl: '',
        imageUrls: [
          '/Elisting.png',
          '/Edetail (1).png',
          '/Edetail (2).png',
          '/Echeckout.png',
          '/Echeckout2.png'
        ]
      } 
    }
  );
  console.log('Updated:', res);
  process.exit(0);
}
run();
