import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = process.env.NODE_ENV === 'production' || process.env.VERCEL ? "/tmp" : "./public/temp";
      cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})