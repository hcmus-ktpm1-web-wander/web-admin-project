const multer = require("multer");
const path = require("path");

// pagination function
module.exports.paging = (data, page) => {
    // get the total number of pages
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};

    // check if there is a next page
    if (endIndex < data.length) {
        result.next = page + 1;
    }
    else {
        result.disableNext = 'pointer-events: none;';
        result.hiddenNext = 'hidden';
        result.numberNext = 'display: none;';
    }

    // check if there is a previous page
    if (startIndex > 0) {
        result.prev = page - 1;
    }
    else {
        result.disablePrev = 'pointer-events: none;';
        result.hiddenPrev = 'hidden';
        result.numberPrev = 'display: none;';
    }

    // get the data for the current page
    result.page = page;
    result.admins = data.slice(startIndex, endIndex);
    return result;
}
