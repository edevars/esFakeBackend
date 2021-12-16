const { cloudinary } = require("../lib/cloudinary");

class ImageService {
  constructor(folder) {
    this.client = cloudinary;
    this.folder = folder;
  }

  upload(photo, folder = this.folder) {
    return new Promise((resolve, reject) => {

      const cloudinaryImageOptions = {
          folder,
          gravity: "face:auto",
          crop: "thumb",
          width: 200,
          height: 200,
      }

      cloudinary.uploader.upload(photo.tempFilePath, cloudinaryImageOptions,
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