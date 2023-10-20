import multer from 'multer';
import multerConfig from '../config/multer';

import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;
        const photo = await Photo.create({
          originalname,
          filename,
          student_id,
        });

        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          erros: ['Student does not exist'],
        });
      }
    });
  }
}

export default new PhotoController();
