/*************************** GET methods ***************************/
// Render Dashboard
exports.renderTables = (req, res) => {
    res.render("tables/views/tables", { active: { Tables: true }, page: "Tables" });
};

