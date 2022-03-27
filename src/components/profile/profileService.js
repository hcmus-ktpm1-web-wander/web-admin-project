const model = require('../user-manage/user_manageModel');

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


module.exports.changePassword = async (req, res) => {
    await service.changePassword(req, res);
    res.redirect('back');
};

module.exports.changeAvatar = async (req, res) => {
    await service.changeAvatar(req, res);
    res.redirect('back');
};
