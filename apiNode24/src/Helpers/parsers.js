
export const generalParser = (info)=>{//discipline, extra, genre, trademarck, category
    return {
        id: info.id,
        name:info.name,
    }
};

export const companyParser = (info)=>{
    return {
        id: info.id,
        name : info.name.map(nm =>nm).join(', '),
        picture: info.picture,
        email: info.email,
        web_site: info.web_site,
        country: info.country,
        enable: info.enable,
    }
}

export const ratingParser = (info)=>{
    return {
        id: info.id,
        comment: info.comment,
        score: info.score,

    }
}
export const salesParser = (info)=>{
    return {
        id: info.id,
        name: info.name,
        description: info.description,
        value : info.value,
        enable : info.enable,
    }
}

