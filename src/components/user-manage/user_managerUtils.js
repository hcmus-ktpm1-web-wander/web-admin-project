module.exports.paging = (data,page)=>{
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};

    if(endIndex < data.length) {
        result.next = page + 1;
    }
    else {
        result.disableNext = 'pointer-events: none;';
        result.hiddenNext = 'hidden';
        result.numberNext = 'display: none;';
    }
    if (startIndex > 0) {
        result.prev = page - 1;
    }
    else {
        result.disablePrev = 'pointer-events: none;';
        result.hiddenPrev = 'hidden';
        result.numberPrev = 'display: none;';
    }
    result.page = page;
    result.admins = data.slice(startIndex, endIndex);
    return result;
}