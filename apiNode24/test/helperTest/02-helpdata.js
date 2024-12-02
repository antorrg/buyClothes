
export const createParser = (info)=>{// for tables discipline, extra, genre, trademarck, category
    return {
        id: info.id,
        name:info.name,
        enable:info.enable,
        deletedAt: info.deletedAt,
    }
};

export const dataCreated = {
    id:1,
    name: "Hola",
    enable: true,
    deletedAt: false,
  };
  export const createParserWithType = (info)=>{// for tables discipline, extra, genre, trademarck, category
    return {
        id: info.id,
        name:info.name,
       // type:info.type,
        enable:info.enable,
        deletedAt: info.deletedAt,
    }
};
export const dataCreatedWithType = {
    id:1,
    name: "Hola",
    //type: 'Category',
    enable: true,
    deletedAt: false,
  };
  export const dataUpdated = {
    id:1,
    name: "Hola",
    enable: false,
    deletedAt: false,
  };