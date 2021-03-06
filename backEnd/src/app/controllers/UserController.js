import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';

class UserController {
    async store(req, res) {
        try {
            console.log(req.body);
            
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().required().min(3)
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'Validations fails' });
            }

            const userExists = await User.findOne({ where: { email: req.body.email } });
            if (userExists) {
                res.status(400).json({ error: 'usuario já existe' });
            }

            const { id, name, email, provider } = await User.create(req.body);
            
            return res.json({
                id,
                name,
                email,
                provider,
            });
        } catch (error) {
            console.log(error);
            return;
        }
    }
    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email().required(),
            oldPassword: Yup.string().min(3),
            password: Yup.string().min(3).when('oldPassword', 
                (oldPassword, field) => oldPassword ? field.required(): field),
            ConfirmPassword: Yup.string().when('password', 
                (password, field) => password ? field.required().oneOf([Yup.ref('password')]): field)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validations fails' });
        }
        const { email, oldPassword} = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email ) {
            const userExists = await User.findOne({ where: { email } });

            if (userExists) {
                return req.status(400).json({ error: 'Is email exist' });
            }
        }
        
        if (oldPassword && !(await user.checkPassword(oldPassword)) ) {
            return res.status(401).json({ error: 'Password does not match' });
        }


        await user.update(req.body);

        const { id, name, provider, avatar_id } = await User.findByPk(req.userId, {
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes:['id', 'path', 'url' ],
                }
            ]
        }); 

        return res.json({
            id,
            name,
            email,
            provider,
            avatar_id
        });
    }
}

export default new UserController();