import ProductRepository from "./src/Repositories/ProductRepository.js"
import GeneralRepository from "./src/Repositories/GeneralRepository.js"
import { Trademark,Attributes } from "./src/Configs/database.js"
const provisoria = new ProductRepository()
const att = new GeneralRepository(Attributes)
const trade = new GeneralRepository(Trademark)

export const trademarks = [
    {
        name: "BILLABONG",
        metaTitle: "soy metatitle",
        metaDescription: "soy metadescription",
        metaKeywords : "metakeywords",
        ogImage: "urlImage",
        twitterCard: "pepepep",
        logo: "logo",
        officialWebsite: "https://pepe.com",
        socialMedia: "pepepe",
        brandStory: "ididididid"
    },
    {
        name: "RIP CURL",
        metaTitle: "soy metatitle",
        metaDescription: "soy metadescription",
        metaKeywords : "metakeywords",
        ogImage: "urlImage",
        twitterCard: "pepepep",
        logo: "logo",
        officialWebsite: "https://pepe.com",
        socialMedia: "pepepe",
        brandStory: "ididididid"
    }
]
//!&&&&&&&&&&&&&&&&&&&&&&&&&&

export const attributes = [
    {
        name: "Hombre",
        type: "Genre",
    },
    {
        name: "Mujer",
        type: "Genre",
    },
    {
        name:"Gala",
        type: "Discipline"
    },
    {
        name: "Moda",
        type: "Discipline"
    },
    {
        name: "Trajes",
        type:"Category"
    },
    {
        name: "Chalecos",
        type: "Category"
    }

];

//?%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const product = {
    name: "Producto uno",
    description: "Descripcion producto uno",
    images : [
                "http://images1",
                "http://images2",
                "http://images3",
                "http://images4"
    ],
    released: "2025-02-24",
    category: 5,
    discipline : 3,
    genre: 1,
    trademark : 1,
    variants : [
        {
            order: 1,
            characteristics: "Características de la Variante 1",
            price: 19.99,
            stock: 100,
            images: [
                "http://images1",
                "http://images2",
                "http://images3",
                "http://images4"
            ],
            size:"38",
            color: "Blanco"
        },
        {
            order: 2,
            characteristics: "Características de la Variante 2",
            price: 19.99,
            stock: 50,
            images: [
                "http://images1",
                "http://images2",
                "http://images3",
                "http://images4"
            ],
            size:"40",
            color: "Negro"
        }
        
    ]
};

//*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const products = [
        {
        name: "Producto uno",
        description: "Descripcion producto uno",
        images : [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
        ],
        released: "2025-02-24",
        category: 5,
        discipline : 3,
        genre: 1,
        trademark : 1,
        variants : [
            {
                order: 1,
                characteristics: "Características de la Variante 1",
                price: 19.99,
                stock: 100,
                images: [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
                ],
                size:"38",
                color: "Blanco"
            },
            {
                order: 2,
                characteristics: "Características de la Variante 2",
                price: 19.99,
                stock: 50,
                images: [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
                ],
                size:"40",
                color: "Negro"
            }
            
        ]
    },
    {
        name: "Producto dos",
        description: "Descripcion producto dos",
        images : [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
        ],
        released: "2025-02-24",
        category: 6,
        discipline : 4,
        genre: 2,
        trademark : 2,
        variants : [
            {
                order: 1,
                characteristics: "Características de la Variante 1",
                price: 19.99,
                stock: 100,
                images: [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
                ],
                size:"38",
                color: "Blanco"
            },
            {
                order: 2,
                characteristics: "Características de la Variante 2",
                price: 19.99,
                stock: 50,
                images: [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
                ],
                size:"40",
                color: "Negro"
            }
            
        ]
    },
    {
        name: "Producto tres",
        description: "Descripcion producto tres",
        images : [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
        ],
        released: "2025-02-24",
        category: 5,
        discipline : 3,
        genre: 1,
        trademark : 1,
        variants : [
            {
                order: 1,
                characteristics: "Características de la Variante 1",
                price: 19.99,
                stock: 100,
                images: [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
                ],
                size:"38",
                color: "Blanco"
            },
            {
                order: 2,
                characteristics: "Características de la Variante 2",
                price: 19.99,
                stock: 50,
                images: [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
                ],
                size:"40",
                color: "Negro"
            }
            
        ]
    },
    {
        name: "Producto cuatro",
        description: "Descripcion producto cuatro",
        images : [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
        ],
        released: "2025-02-24",
        category: 6,
        discipline : 4,
        genre: 1,
        trademark : 2,
        variants : [
            {
                order: 1,
                characteristics: "Características de la Variante 1",
                price: 19.99,
                stock: 100,
                images: [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
                ],
                size:"38",
                color: "Blanco"
            },
            {
                order: 2,
                characteristics: "Características de la Variante 2",
                price: 19.99,
                stock: 50,
                images: [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
                ],
                size:"40",
                color: "Negro"
            }
            
        ]
    }
    ]

export const createInfoPromise = async (creator, info)=>{
    try{
        for(const dat of info){
            await creator.create(dat, 'name')
            console.log('creacion correcta')}
    return 'todo ok'
    }catch(error){
        console.error(`Error al crear elemento: `,error)
    }
}
export const fillDb = async (creator, info)=>{
    try{
        for(const dat of info){
            await creator.create(dat, 'name')
            console.log('creacion correcta')
        }
        return "todo ok"
    }catch(error){
        console.error(`Error al crear elemento: `,error)
    }
}
export async function pepe (){
    try{
    await createInfoPromise(trade, trademarks)
    await createInfoPromise(att, attributes)
    await fillDb(provisoria, products)
    console.log('todo Ok')
    return
    }catch(error){
        console.error('Error al crear elementos generales: ',error)
    }
}
