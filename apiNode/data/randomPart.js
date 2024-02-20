// const randomPart =()=>{ Math.random().toString(36).substring(2, 8).toUpperCase();
//               const datePart = new Date().toISOString().replace(/[-:.]/g, '');
//               const final = `${datePart}-${randomPart}`
//                 return final;
//             }
// console.log(randomPart())

const data = 
  {
    "id": "1cc28a44-f186-49b5-a590-0f9744166898",
    "name": "Producto general nueve",
    "description": "Descripción del Producto General",
    "released": "2024-02-18",
    "Categories": "Chalecos",
    "Disciplines": "Moda",
    "Genres": "Hombre",
    "Trademarcks": "RIP CURL",
    "enable": true,
    "createdAt": "2024-02-19T15:55:50.391Z",
    "updatedAt": "2024-02-19T15:55:50.391Z",
    "Product1s": [
      {
        "id": "c4fed980-a9f2-4f15-aa96-f39e34313834",
        "order": 1,
        "characteristics": "Características de la Variante 1",
        "images": [
          "https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg",
          "https://res.cloudinary.com/dt1lpgumr/image/upload/v1708046933/ac1e24294ac4bff00e5eaef22b93594d.webp",
          "https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg",
          "https://res.cloudinary.com/dt1lpgumr/image/upload/v1708046933/ac1e24294ac4bff00e5eaef22b93594d.webp"
        ],
        "price": "19.99",
        "stock": 100,
        "size": "44",
        "extras": "Blanco",
        "enable": true
      },
      {
        "id": "bc2f7ed4-d13b-4c55-a7ab-daec5fb46f18",
        "order": 2,
        "characteristics": "Características de la Variante 2",
        "images": [
          "https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg",
          "https://res.cloudinary.com/dt1lpgumr/image/upload/v1708046933/ac1e24294ac4bff00e5eaef22b93594d.webp",
          "https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg",
          "https://res.cloudinary.com/dt1lpgumr/image/upload/v1708046933/ac1e24294ac4bff00e5eaef22b93594d.webp"
        ],
        "price": "24.99",
        "stock": 50,
        "size": "46",
        "extras": "Blanco",
        "enable": true
      },
      {
        "id": "c9197917-82ac-4a6c-af87-9992de618c7d",
        "order": 3,
        "characteristics": "Características de la Variante 3",
        "images": [
          "https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg",
          "https://res.cloudinary.com/dt1lpgumr/image/upload/v1708046933/ac1e24294ac4bff00e5eaef22b93594d.webp",
          "https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg",
          "https://res.cloudinary.com/dt1lpgumr/image/upload/v1708046933/ac1e24294ac4bff00e5eaef22b93594d.webp"
        ],
        "price": "24.99",
        "stock": 50,
        "size": "44",
        "extras": "Negro",
        "enable": true
      },
      {
        "id": "890fabe4-4bb1-45e7-818b-02c621f9d469",
        "order": 4,
        "characteristics": "Características de la Variante 4",
        "images": [
          "https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg",
          "https://res.cloudinary.com/dt1lpgumr/image/upload/v1708046933/ac1e24294ac4bff00e5eaef22b93594d.webp",
          "https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg",
          "https://res.cloudinary.com/dt1lpgumr/image/upload/v1708046933/ac1e24294ac4bff00e5eaef22b93594d.webp",
          "https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg",
          "https://res.cloudinary.com/dt1lpgumr/image/upload/v1708046933/ac1e24294ac4bff00e5eaef22b93594d.webp"
        ],
        "price": "24.99",
        "stock": 50,
        "size": "46",
        "extras": "Negro",
        "enable": true
      },
      {
        "id": "d3a2238a-5411-4588-87f2-001e0f21062e",
        "order": 5,
        "characteristics": "Características de la Variante 5",
        "images": [
          "https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg",
          "https://res.cloudinary.com/dt1lpgumr/image/upload/v1708046933/ac1e24294ac4bff00e5eaef22b93594d.webp",
          "https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg",
          "https://res.cloudinary.com/dt1lpgumr/image/upload/v1708046933/ac1e24294ac4bff00e5eaef22b93594d.webp"
        ],
        "price": "26.99",
        "stock": 50,
        "size": "40",
        "extras": "Beige",
        "enable": true
      }
    ]
  }

  const parser = (data)=>{
    const pars = data.Product1s.forEach(element => {
      element.id,
      element.order,
      element.characteristics,
      element.images,
      element.price,
      element.stock,
      element.extras,
      element.enable
      return pars;
    });
  }
  console.log(parser(data))