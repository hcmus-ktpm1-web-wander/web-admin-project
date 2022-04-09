const profileService = require('../../../components/profile/profileService');
const profileApiService = require("./profileApiService")


module.exports.getInfo = async (req, res) => {
    console.log("-- api profile - get info --");

    const user = await profileApiService.getInfo(req.user._id);
    console.log("user: ", user);
    res.send(user);
}

module.exports.editInfo = async (req, res) => {
    console.log("-- api profile - edit info --");
    console.log("req.body: ", req.body);

    await profileService.editDetailInfo(req.user._id, req.body);
    res.status(200);
}
