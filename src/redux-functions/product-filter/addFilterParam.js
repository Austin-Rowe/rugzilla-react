const filterItems = (filteredData, action) => {

    const filterAndPushResults = (filteredData, action) => {
        return filteredData.filter(item => {
            const filterType = action.filterType;
            if(action.param === item[filterType]){
                return item;
            }
        });
    }

    let filteredResults = filterAndPushResults(filteredData, action);
    return filteredResults;    
}
  
export default filterItems;

/* let obj = {
    type: "FILTERALTERATION",
    filterType: 'sizeCategory',
    param: '8x11',
    isSelected: boolean
}


var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result); */