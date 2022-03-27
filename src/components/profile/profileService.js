const model = require('../user-manage/user_manageModel');
const cloudinary = require('../../config/cloudinary.config');


module.exports.getProfile = async (req, res) => {
    const user_cookie = req.cookies.user;
    const id = user_cookie.split("_")[0];

    const user = await model.findOne({ _id: id });

    if (!user) {
        res.redirect('/auth/login');
    } else {
        return user;
    }
}

module.exports.editDetailInfo = async (req, res, profile) => {
    const id = req.cookies.user.split("_")[0];

    console.log("profile:", req.body);

    try {
        await model.findByIdAndUpdate({ _id: id },
            {
                $set: {
                    intro: req.body.intro,
                    fullname: req.body.edit_fullname,
                    username: req.body.edit_username,
                    phone: req.body.edit_phone,
                    email: req.body.edit_email,
                    address: req.body.edit_addr
                }
            })
            .then(() => {
                console.log("> Changed detail information");
            });
    } catch (err) {
        throw err;
    }
};


module.exports.changePassword = async (req, res) => {
    await service.changePassword(req, res);
    res.redirect('back');
};

module.exports.changeAvatar = async (req, file) => {
    try {
        // upload image
        let result;
        if (file) {
            result = await cloudinary.v2.uploader.upload(file.path, {
                folder: "admin_avatar",
                use_filename: true,
            });
        }

        // get image url
        let { url } = result ?? "";
        if (url === undefined) {
            // default avatar
            url = 'https://res.cloudinary.com/web-hcmus/image/upload/v1648341181/Default_avatar/default-avtar_wmf6yf.jpg';
        }

        const id = req.cookies.user.split("_")[0];

        await model.findByIdAndUpdate(id,{avatar_url: url});

        // res.redirect('back');
    } catch (err) {
        throw err;
    }
};
