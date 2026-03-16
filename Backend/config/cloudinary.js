import {v2 as cloudinary} from 'cloudinary'


const configureCloudinary = () => {
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET

})
    return cloudinary;
};
export default configureCloudinary;
