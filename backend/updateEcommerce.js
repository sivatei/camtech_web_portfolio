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
          '/glowstore-home.png',
          '/glowstore-products.png',
          '/glowstore-cart.png',
          '/glowstore-checkout.png'
        ]
      } 
    }
  );
  console.log('Updated:', res);
  process.exit(0);
}
run();
