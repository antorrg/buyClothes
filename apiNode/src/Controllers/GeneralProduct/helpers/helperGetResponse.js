
const nextPageUrl = (req, totalPages, currentPage) => {
    if (currentPage < totalPages) {
        //console.log(currentPage+' soy en next')
        const nextPage = Number(currentPage) + 1
        //console.log(nextPage+' soy nextPage')
        return `${getBaseUrl(req)}?page=${parseInt(nextPage,10)}`;
    }
    if(currentPage === totalPages){
        return null;
    }
};

const prevPageUrl = (req, totalPages, currentPage) => {
    if (currentPage > 1) {
        //console.log(currentPage+' soy page')
        let prevPage = Number(currentPage) - 1;
        return `${getBaseUrl(req)}?page=${parseInt(prevPage, 10)}`;
    }
    if(currentPage ===1){
        return null;
    }
};

const getBaseUrl = (req) => {
    return `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
};

export {
    nextPageUrl,
    prevPageUrl
}