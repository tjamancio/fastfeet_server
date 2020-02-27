import * as Yup from 'yup';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  avatar_id: Yup.number().required(),
});

class DeliveryManController {
  async index(req, res) {
    const deliverymen = await DeliveryMan.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    res.json(deliverymen);
  }

  async show(req, res) {
    const deliveryman = await DeliveryMan.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(deliveryman);
  }

  async store(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await DeliveryMan.create(req.body);
    return res.json(deliveryman);
  }

  async update(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await DeliveryMan.findByPk(req.params.id);

    await deliveryman.update(req.body);
    return res.json(deliveryman);
  }

  async destroy(req) {
    const deliveryman = await DeliveryMan.findByPk(req.params.id);
    await deliveryman.destroy();
  }
}

export default new DeliveryManController();
