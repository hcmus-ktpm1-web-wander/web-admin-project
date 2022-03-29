
const userModel = require('../user-manage/user_manageModel');

module.exports.Verify = async (req, res) => {
    try {
        console.log("req.body:", req.body);

        const credential = await userModel.findOne({ username: req.body.usrname });

        if (!credential || credential === null) {
            throw new Error("This user does not exist");
        }

        console.log("cre:", credential);

        if (credential.password !== req.body.passwd) {
            throw new Error("Wrong password");
        }

        if (credential.role !== "Admin") {
            throw new Error("This account is not admin");
        }

        // auth success
        res.cookie('user', credential._id + '_login_success');

        // temp
        res.redirect('/dashboard');
    } catch (error) {
        console.log("error:", error);
        res.render("auth/views/login", { layout: '/auth/views/login-layout', error });
    }
}
