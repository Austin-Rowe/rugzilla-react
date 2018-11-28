const modifyPriceSort = (sortObj, action) => {
    if(action.selected){
        Object.keys(sortObj).forEach(key => sortObj[key] = false);
        sortObj[action.order] = true;
    } else if(!action.selected){
        Object.keys(sortObj).forEach(key => sortObj[key] = false);
        sortObj[action.order] = false;
    }

    return sortObj;
}

export default modifyPriceSort;