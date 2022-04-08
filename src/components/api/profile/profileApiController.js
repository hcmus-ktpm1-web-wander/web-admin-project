const profileService = require('../../../components/profile/profileService');
const userModel = require("../../user-manage/user_manageModel");


module.exports.getInfo = async (req, res) => {
    console.log("-- api profile - get info --");

    // const profile = req.user;
    const user = await userModel.findById(req.user._id).lean();
    console.log("user: ", user);

    res.send(user);
}

module.exports.editInfo = async (req, res) => {
    console.log("-- api profile - edit info --");

    console.log("req.body: ", req.body);

    await profileService.editDetailInfo(req.user._id, req.body);

    res.status(200);
}


module.exports.changeAvatar = async (req, res) => {
    console.log("-- api profile - change avatar --");

    console.log("req.body: ", req.body);
    console.log("req.data:", req.data);
    console.log("req.file: ", req.file);

    await profileService.changeAvatar(req.user._id, req.file);

    res.status(200);
}