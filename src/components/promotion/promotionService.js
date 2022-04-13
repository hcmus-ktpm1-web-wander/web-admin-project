const promotionModel = require('../promotion/promotionModel')

exports.getAllPromotion = () => {
    try {
        return promotionModel.find({}).lean();
    }catch (e) {
        throw e;
    }
}