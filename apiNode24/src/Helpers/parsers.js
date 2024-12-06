import { filterData } from "./universalHelpers.js";

export const generalParser = (data, isAdmin)=>{//discipline, extra, genre, trademarck, category
    const info = filterData(data, isAdmin)
    return {
        id: info.id,
        name:info.name,
    }
};

export const companyParser = (info, isAdmin)=>{
    return {
        id: info.id,
        name : info.name.map(nm =>nm).join(', '),
        picture: info.picture,
        email: info.email,
        web_site: info.web_site,
        country: info.country,
        enable: isAdmin? info.enable:(info.enable || null),
        ...(isAdmin || info.enable? {} : null)
    }
}

export const ratingParser = (info)=>{
    return {
        id: info.id,
        comment: info.comment,
        score: info.score,

    }
}
export const salesParser = (info, isAdmin)=>{
   
    return {
        id: info.id,
        name: info.name,
        description: info.description,
        value : info.value,
        enable : isAdmin ? info.enable : (info.enable || null),
        ...(isAdmin || info.enable? {} : null)
    }
}

