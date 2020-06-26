const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  createUser: async args => {
    //console.log(args);
    try {
      const existingUser = await User.findOne({ email: args.email });
      //console.log(args);
      if (existingUser) {
        throw new Error('User exists already.');
      }
      //console.log(args);
      const hashedPassword = await bcrypt.hash(args.password, 12);
      //console.log(args);

      const user = new User({
          _id:Math.random().toString(),
        email: args.email,
        password: hashedPassword
      });
      console.log(user);

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'somesupersecretkey',
      {
        expiresIn: '1h'
      }

    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },

  resetPassword: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    //console.log(args);
    //console.log(req);
    try {
        const user = await User.findOne({ _id: req.userId });
        //console.log(args.resetPasswordInput.password);
        const isEqual = await bcrypt.compare(args.resetPasswordInput.password, user.password);
        //console.log(isEqual);
        if(isEqual){
            if(args.resetPasswordInput.password1===args.resetPasswordInput.password2){
              //console.log(isEqual);
                const hashedPassword = await bcrypt.hash(args.resetPasswordInput.password2, 12);
                user.password=hashedPassword;
                const result = await user.save();

                return { ...result._doc, password: null, _id: result.id };
              }
              throw new Error('new password & confirm password doesnot match' ); 
            }
            throw new Error('old password is incorrect');

        }
        catch (err) {
            throw err;
          }
    },
    forgotPassword:async(args)=>{
      const user = await User.findOne({ email: args.email });
      console.log(user);
      if (!user) {
        throw new Error('User does not exist!');
      }
        //const status= 'we have sent you a verification mail in your email id';
        return { email: args.email };
    



      },




    fileUpload: async (args, req) => {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }







    },
}
;