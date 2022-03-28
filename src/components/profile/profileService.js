const userModel = require('../user-manage/user_manageModel');
const cloudinary = require('../../config/cloudinary.config');
const url = require('url');


module.exports.getProfile = async (req, res) => {
    // const user_cookie = req.cookies.user;
    // const id = user_cookie.split("_")[0];

    const user = await userModel.findById("6242061e0ec82a3231048ca4" );
    if (!user) {
        res.redirect('/auth/login');
    } else {
        return user;
    }
}

module.exports.editDetailInfo = async (req, res, profile) => {
    // const id = req.cookies.user.split("_")[0];

    try {
        await userModel.findByIdAndUpdate({ _id: "6242061e0ec82a3231048ca4" },
            {
                $set: {
                    intro: req.body.intro,
                    fullname: req.body.edit_fullname,
                    username: req.body.edit_username,
                    phone: req.body.edit_phone,
                    email: req.body.edit_email,
                    address: req.body.edit_addr
                }
            });
    } catch (err) {
        throw err;
    }
};

module.exports.changePassword = async (req, res) => {
    // const id = req.cookies.user.split("_")[0];

    const find_account = await userModel.findById("6242061e0ec82a3231048ca4" ).lean();

    if (req.body.old_passwd !== find_account.password) {
        await res.redirect(url.format({
            pathname: "/profile",
            query: {
                "error": "wrong-pass",
            }
        }));
        return;
    }

    await userModel.findOneAndUpdate({ account_id: "6242061e0ec82a3231048ca4" }, { $set: { password: req.body.new_passwd } });
    await res.redirect(url.format({
        pathname: "/profile",
        query: {
            "change_pass": "success",
        }
    }));
};

module.exports.changeAvatar = async (req, res, file) => {
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
            const profile = this.getProfile(req, res);
            // default avatar
            url = profile.avatar_url;
        }

        //const id = req.cookies.user.split("_")[0];

        await userModel.findByIdAndUpdate("6242061e0ec82a3231048ca4", { avatar_url: url });
    } catch (err) {
        throw err;
    }
};
