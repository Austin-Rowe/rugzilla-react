const modifyAppliedFilters = (appliedFilters, action) => {
    if(action.isSelected){
        appliedFilters.push(action);
    } else {
        const indexOfFilter = appliedFilters.findIndex(filter => filter.param === action.param);
        appliedFilters.splice(indexOfFilter, 1);
    }

    return appliedFilters;
}
  
export default modifyAppliedFilters;