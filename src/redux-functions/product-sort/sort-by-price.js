const sortByPrice = (filteredData, action) => {
    if(action.order === "low-to-high"){
        return filteredData.sort((a,b) => a.price - b.price);
    } else if(action.order === "high-to-low"){
        return filteredData.sort((a,b) => b.price - a.price);
    }
}

export default sortByPrice;