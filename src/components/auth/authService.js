
const userModel = require('../user-manage/user_manageModel');

module.exports.Verify = async (req, res) => {
    try {
        const credential = await userModel.findOne({ username: req.body.usrname });

        if (!credential) {
            new Error("This user does not exist");
        }

        if (credential.password !== req.body.passwd) {
            new Error("Wrong password");
        }

        if (credential.role !== "Admin") {
            new Error("This account is not admin");
        }

        // auth success
        res.cookie('user', credential._id + '_login_success');

        // temp
        res.redirect('/dashboard');
    } catch (error) {
        res.render("auth/views/login", { layout: '/auth/views/login-layout', error });
    }
}
