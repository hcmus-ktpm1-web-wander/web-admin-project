const userModel = require("../../user-manage/user_manageModel");

module.exports.getInfo = async (userID) => {
    const user = await userModel.findById(userID);
    console.log("user: ", user);

    return user;
}
