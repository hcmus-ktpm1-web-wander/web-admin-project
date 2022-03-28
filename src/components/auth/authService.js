
const model = require('./authModel');

module.exports.Verify = async (req, res) => {
    try {
        const credential = await model.findOne({ usrname: req.body.usrname })
        if (!credential) {
             new Error("This user does not exist");
        }

        if (credential.passwd !== req.body.passwd) {
             new Error("Wrong password");
        }

        // auth success
        res.cookie('user', credential.account_id + '_login_success');

        // temp
        res.redirect('/profile');
    } catch (error) {
        console.log("error:", error);
        res.render("auth/views/login", { layout: '/auth/views/login-layout', error });
    }
}
