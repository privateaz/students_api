import Student from '../models/Student';
import Photo from '../models/Photo';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [
        ['id', 'DESC'],
        [Photo, 'id', 'DESC'],
      ],
      include: {
        model: Photo,
        attributes: ['url', 'filename'],
      },
    });
    res.json({ students });
  }

  async store(req, res) {
    try {
      const student = await Student.create(req.body);
      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.messages),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Invalid ID'],
        });
      }

      const student = await Student.findByPk(id, {
        attributes: [
          'id',
          'name',
          'surname',
          'email',
          'age',
          'weight',
          'height',
        ],
        order: [
          ['id', 'DESC'],
          [Photo, 'id', 'DESC'],
        ],
        include: {
          model: Photo,
          attributes: ['url', 'filename'],
        },
      });

      if (!student) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }

      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.messages),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Invalid ID'],
        });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }

      await student.destroy();
      return res.json({
        deleted: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.messages),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Invalid ID'],
        });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }

      const updatedStudent = await student.update(req.body);
      return res.json(updatedStudent);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.messages),
      });
    }
  }
}

export default new StudentController();
