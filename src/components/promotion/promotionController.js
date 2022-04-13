const promotionService = require("../promotion/promotionService");
const utils = require("../../public/js/paging");
/**
 *  get promo list and pagination data
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.renderPromotionManage = async (req, res) => {
    try {
        if (req.session.errors !== undefined) {
            const errors = req.session.errors;
            req.session.errors = undefined;
            res.render("promotion/views/promotion_manage", { active: { PromotionManage: true }, page: "Promotion manage", errors, checkErrors: true });
        }
        else {
            req.session.errors = undefined
            res.render("promotion/views/promotion_manage", { active: { PromotionManage: true }, page: "Promotion manage"});
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.addPromotion = async (req,res) => {
    try
    {
        const code = req.body.code
        const level = req.body.level
        const slot = req.body.slot
        const start_date = req.body.start_date
        const end_date = req.body.end_date



    }catch (e)
    {
        res.status(500).json({ message: e.message });
    }
}