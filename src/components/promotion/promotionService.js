const promotionModel = require('../promotion/promotionModel')

exports.getAllPromotion = () => {
    try {
        return promotionModel.find({}).lean();
    }catch (e) {
        throw e;
    }
}

exports.createPromotion = async (code, level, slot, start_date, end_date) => {
    try {
        await new promotionModel({code: code, level: level, slot: slot, start_date:start_date, end_date: end_date}).save();
    } catch (err) {
        throw err;
    }
}

exports.getPromotionByCode = async (code) => {
    try {
         return await promotionModel.find({code: code}).lean();
    } catch (err) {
        throw err;
    }
}