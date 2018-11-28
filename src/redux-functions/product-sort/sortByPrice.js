const sortByPrice = (filteredData, action) => {
    if(action.order === "lowToHigh"){
        return filteredData.sort((a,b) => a.price - b.price);
    } else if(action.order === "highToLow"){
        return filteredData.sort((a,b) => b.price - a.price);
    }
}

export default sortByPrice;