const mongoose = require('mongoose');
const Project = require('./models/Project');

async function run() {
  await mongoose.connect('mongodb+srv://sivateyyim_portfolio:7AGuAwmEt49Q9IdP@cluster0.eihr7qg.mongodb.net/portfolio?appName=Cluster0&compressors=zlib');
  const res = await Project.updateOne(
    { title: 'Food Receipt Front-End' },
    { 
      $set: { 
        videoUrl: '',
        imageUrls: [
          '/Foodbanner.png',
          '/Foodcard.png',
          '/FoodCourse.png',
          '/FoodDetail.png',
          '/FoodSearch.png',
          '/FoodSub.png',
          '/FoodLogin.png'
        ]
      } 
    }
  );
  console.log('Updated:', res);
  process.exit(0);
}
run();
