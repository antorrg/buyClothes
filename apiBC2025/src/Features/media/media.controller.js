import multer from 'multer'
import FirebaseServices from '../../ExternalServices/FirebaseServices.js'
import eh from '../../Configs/errorHandlers.js'

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

export const uploadMiddleware = upload.single('image')
export const imageController = eh.catchController(async(req,res)=>{
    const file = req.file
    if(!file){eh.throwError('Not found', 404)}
    const img = await FirebaseServices.uploadImage(file)
    const response = {
        success: true,
        message: `Image ${img.fileName} upload successfully`,
        data: {url: img.downloadURL}
    }
    res.status(200).json(response)
})

export const imageDelete = eh.catchController(async(req, res)=>{
    const {url} = req.body
    const img = await FirebaseServices.deleteImageByUrl(url)
    const response = {
        success: true,
        message: img,
        data: null
    }
    res.status(200).json(response)
})