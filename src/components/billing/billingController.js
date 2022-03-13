/*************************** GET methods ***************************/
// Render Billing
exports.renderBilling = (req, res) => {
    res.render("billing/views/billing", { active: { Billing: true }, page: "Billing" });
};

