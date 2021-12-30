const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg'];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-coderhouse-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: 'images',
      filename: `${Date.now()}-coderhouse-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage, limits: { fieldSize: 10 * 1024 * 1024 } });
