import bcrypt from 'bcrypt';
const SALT_ROUND = 10;

const signup = async (req, res) => {
    const { files, fields } = req.fileAttrb;
  
    let hashPassword = fields[1].value;
    hashPassword = await bcrypt.hash(hashPassword, SALT_ROUND);
    try {
      const result = await req.context.models.users.create({
        user_name: fields[0].value,
        user_password: hashPassword,
        user_personal_name: fields[2].value,
        user_email: fields[3].value,
        user_handphone: fields[4].value,
        user_role_id: fields[5].value,
        user_address: fields[6].value,
        user_photo: files[0].file.originalFilename,
      });
      return res.status(200).json({
        message: "Sign Up",
        data: result
    });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  

// use sigin with token in authJWT
const signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await req.context.models.users.findOne({
            where: { user_name: username }
        });
        const { user_id, user_name, user_email, user_password } = result.dataValues;
        const compare = await bcrypt.compare(password, user_password);
        if (compare) {
            return res.send({ user_id, user_name, user_email });
        } else {
            return res.sendStatus(404);
        }

    } catch (error) {
        return res.sendStatus(404);
    }
}
 
export default {
    signup,
    signin
}