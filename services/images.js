const { cloudinary } = require("../lib/cloudinary");

class ImageService {
  constructor(folder) {
    this.client = cloudinary;
    this.folder = folder;
  }

  upload(photo, folder = this.folder) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        photo.tempFilePath,
        { folder },
        function (err, image) {
          if (err) {
            reject(err);
          }

          resolve(image.url);
        }
      );
    });
  }
}

module.exports = { ImageService };
