import * as Yup from 'yup';
import Recipient from '../models/Recipient';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  street: Yup.string().required(),
  number: Yup.number(),
  complement: Yup.string(),
  neighborhood: Yup.string().required(),
  state: Yup.string().required(),
  city: Yup.string().required(),
  postalcode: Yup.string()
    .length(8)
    .required(),
});

class RecipientController {
  async store(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    await recipient.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
