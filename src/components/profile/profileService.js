const model = require('../user-manage/models/adminModel');

module.exports.getProfile = async (req, res) => {
    const user_cookie = req.cookies.user;
    const id = user_cookie.split("_")[0];

    const user = await model.findOne({ _id: id });
    console.log("user:", user);

    if (!user || user == null) {
        res.redirect('/auth/login');
    } else {
        return user;
    }
}

module.exports.editIntro = async (req, res) => {
    const id = req.cookies.user.split("_")[0];

    console.log("profile:", req.body.intro);

    try {
        await model.findByIdAndUpdate({ _id: id }, { $set: { intro: req.body.intro } })
            .then(() => {
                console.log("> Changed intro");
            });
    } catch (err) {
        throw err;
    }

};

