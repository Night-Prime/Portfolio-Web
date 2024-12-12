import axios from "axios";
import { NotificationType, showNotification } from "./notification";

const cloudPreset = process.env.REACT_APP_CLOUD_PRESET;
const cloudName = process.env.REACT_APP_CLOUD_NAME;

export const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${cloudPreset}`); // Replace with your upload preset
    formData.append('cloud_name', `${cloudName}`); // Replace with your cloud name

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        // Return the secure URL of the uploaded image
        return {
            success: 1,
            file: {
                url: response.data.secure_url
            }
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        showNotification("Image Upload Failed", NotificationType.ERROR);

        return {
            success: 0,
            error: 'Upload failed'
        };
    }
}