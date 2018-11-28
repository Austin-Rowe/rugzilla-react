const removeFilterParam = (data, filters) => {
    const paramsCreator = actions => {
        let types = {};
        actions.forEach(action => {
            if(!types.hasOwnProperty(action.filterType)){
            types[action.filterType] = [];
            types[action.filterType].push(action.param);
            } else if(types.hasOwnProperty(action.filterType)){
            types[action.filterType].push(action.param);
            }
        })
        return types;
    }
    const compare = (obj, array) => {
        let trueFalse = [];
        for(let i = 1; i<array.length; i++){
            const key = array[0];
            if(obj[key] === array[i]){
            trueFalse.push(0);
            } else {
            trueFalse.push(1)
            }
        }
        if(trueFalse.includes(0)){
            return 0;
        } else {
            return -1;
        }
    }
    const insertIfInFor = (obj, array) => {
        let trueFalseList = [];
        for(let i = 0; i<array.length; i++){
            trueFalseList.push(compare(obj, array[i]));
        }
        return trueFalseList;
    };
    const reducer = (accumulator, value) => accumulator + value;
    const filtersArrayUnformatted = Object.entries(paramsCreator(filters));
    const filtersArray = filtersArrayUnformatted.map(array => {
        const type = array[0];
        const values = array[1];
        values.unshift(type);
        return values;
    });
    const filteredData = data.filter(item => {
        console.log(insertIfInFor(item, filtersArray));
        if(filtersArray.length > 0){
            if(insertIfInFor(item, filtersArray).reduce(reducer) === 0){
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
        
    })
    return filteredData;
}
  
export default removeFilterParam;




