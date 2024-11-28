const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
    cloud_name: 'dmbk5eqo7',
    api_key: '574481742149864', 
    api_secret: 'd0XoGGgX6nAmmtvNvdhGTzLNO4E',

});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file){
    const result = await cloudinary.uploader.upload(file,{
        resource_type : 'auto',
    })

    return result;
}

const upload = multer({ storage });

module.exports = {upload, imageUploadUtil} ;