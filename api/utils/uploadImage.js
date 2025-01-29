const cloudinary = require('./cloudinary.config');

// Upload image to cloudinary
const uploadImage = async (buffer) => {
    try {
        const response = await new Promise((resolve, reject) => {
            // Upload image to cloudinary
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'image' // The type of file to upload
                },
                (error, result) => {
                    if (error) {
                        reject(error) // Return error
                    } else {
                        resolve(result) // Return result    
                    }
                }
            ).end(buffer);
        });
        return response;  
    } catch (err) {
        return err;
    }
}

module.exports = uploadImage;