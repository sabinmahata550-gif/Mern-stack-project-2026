import { v2 as cloudinary } from 'cloudinary';
import { file } from 'zod';
async function uploadFile(files) {
    const uploadedFiles = [];
    for (const file of files) {
        const reslut = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                folder: "20260320",
                allowed_formats: ["jpg", "png", "webp",],

            }, (erro, data) => {
                if (erro) reject(erro)
                resolve(data)
            }).end(file.buffer);
        })

        uploadedFiles.push(reslut)
    }

    return uploadedFiles;
    
}

export default uploadFile;