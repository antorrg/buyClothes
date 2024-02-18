import { GeneralProduct, Product1, sequelize}from '../../database.js';
import { imgsCreate } from '../Product1/imageController.js';

// const generalProdCreate = async (name, description, released, category, discipline, genre, trademarck, variants) => {
//     try {
//         // Verificar si el producto ya existe
//         const productFound = await GeneralProduct.findOne({
//             where: {
//                 name: name.toLowerCase(),
//             },
//         });

//         if (productFound) {
//             throw new Error('This product already exists!!');
//         }

//         // Crear el nuevo producto general
//         const newGeneralProduct = await GeneralProduct.create({
//             name,
//             description,
//             released,
//         });

//         // Asociar las demás entidades al producto general
//         await newGeneralProduct.addCategory(category);
//         await newGeneralProduct.addDiscipline(discipline);
//         await newGeneralProduct.addGenre(genre);
//         await newGeneralProduct.addTrademarck(trademarck);

//         // Crear las variantes (Product1) asociadas al producto general
//         const createdVariants = await Promise.all(
//             variants.map(async (variant) => {
//                 const newProduct1 = await Product1.create({
//                     characteristics: variant.characteristics,
//                     price: variant.price,
//                     stock: variant.stock,
//                 });

//                 // Asociar la variante al producto general
//                 await newGeneralProduct.addProduct1(newProduct1);

//                 // Crear las imágenes asociadas a la variante
//                 const newImage = await imgsCreate(name, variant.images);

//                 // Asociar la imagen a la variante
//                 await newProduct1.addImage(newImage);

//                 // Asociar el tamaño a la variante
//                 await newProduct1.addSize(variant.size);

//                 // Asociar el extra a la variante
//                 await newProduct1.addExtra(variant.extra);

//                 // Después de asociar la variante al producto general
//                 console.log('GeneralProductId:', newProduct1.GeneralProductId);

//                 return newProduct1;
//             })
//         );

//         return { generalProduct: newGeneralProduct, variants: createdVariants };
//     } catch (error) {
//         throw error;
//     }
// };
// export default generalProdCreate;
const generalProdCreate = async (name, description, released, category, discipline, genre, trademarck, variants) => {
    let transaction;
    try {
        // Iniciar una transacción
        transaction = await sequelize.transaction();

        // Verificar si el producto ya existe
        const productFound = await GeneralProduct.findOne({
            where: {
                name: name.toLowerCase(),
            },
           transaction, // Incluir la transacción en la consulta
        });

        if (productFound) {
            throw new Error('This product already exists!!');
        }

        // Crear el nuevo producto general dentro de la transacción
        const newGeneralProduct = await GeneralProduct.create({
            name,
            description,
            released,
        }, { transaction }
        );

        // Asociar las demás entidades al producto general dentro de la transacción 
        await newGeneralProduct.addCategory(category, 
            { transaction }
            );
        await newGeneralProduct.addDiscipline(discipline, { transaction });
        await newGeneralProduct.addGenre(genre, { transaction });
        await newGeneralProduct.addTrademarck(trademarck, { transaction });

        // Crear las variantes (Product1) asociadas al producto general dentro de la transacción
        const createdVariants = await Promise.all(
            variants.map(async (variant) => {
                const newProduct1 = await Product1.create({
                    characteristics: variant.characteristics,
                    price: variant.price,
                    stock: variant.stock,
                }, 
                { transaction }
                );

                // Asociar la variante al producto general dentro de la transacción
                await newGeneralProduct.addProduct1(newProduct1, { transaction });
                //await newGeneralProduct.reload({ include: Product1 });
              


                // Crear las imágenes asociadas a la variante dentro de la transacción
                const newImage = await imgsCreate(name, variant.images, transaction);

                // Asociar la imagen a la variante dentro de la transacción
                await newProduct1.addImage(newImage, { transaction });

                // Asociar el tamaño a la variante dentro de la transacción
                await newProduct1.addSize(variant.size, { transaction });

                await newProduct1.addExtra(variant.extra, { transaction });
                // Después de asociar la variante al producto general
                //console.log('GeneralProductId:', newProduct1.GeneralProductId);
                
                return newProduct1;
            })
        );

        // Commit (confirmar) la transacción si todas las operaciones tienen éxito
        await transaction.commit();

        return { generalProduct: newGeneralProduct, variants: createdVariants };
    } catch (error) {
        // Revertir la transacción en caso de error
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    }
};
export default generalProdCreate;

// const generalProdCreate = async (name, description, released, category, discipline, genre, trademarck, variants) => {
//     let transaction;
//     try {
//         // Iniciar una transacción
//         transaction = await sequelize.transaction();

//         // Verificar si el producto ya existe
//         const productFound = await GeneralProduct.findOne({
//             where: {
//                 name: name.toLowerCase(),
//             },
//             transaction, // Incluir la transacción en la consulta
//         });

//         if (productFound) {
//             throw new Error('This product already exists!!');
//         }

//         // Crear el nuevo producto general dentro de la transacción
//         const newGeneralProduct = await GeneralProduct.create({
//             name,
//             description,
//             released,
//         }, { transaction });

//         // Asociar las demás entidades al producto general dentro de la transacción 
//         await newGeneralProduct.addCategory(category, { transaction });
//         await newGeneralProduct.addDiscipline(discipline, { transaction });
//         await newGeneralProduct.addGenre(genre, { transaction });
//         await newGeneralProduct.addTrademarck(trademarck, { transaction });

//         // Crear las variantes (Product1) asociadas al producto general dentro de la transacción
//         const createdVariants = await Promise.all(
//             variants.map(async (variant) => {
//                 const newProduct1 = await Product1.create({
//                     characteristics: variant.characteristics,
//                     price: variant.price,
//                     stock: variant.stock,
//                 }, { transaction });

//                 // Asociar la variante al producto general dentro de la transacción
//                 await newGeneralProduct.addProduct1(newProduct1, { transaction });

//                 // Crear las imágenes asociadas a la variante dentro de la transacción
//                 const newImage = await imgsCreate(name, variant.images, transaction);

//                 // Asociar la imagen a la variante dentro de la transacción
//                 await newProduct1.addImage(newImage, { transaction });

//                 // Asociar el tamaño a la variante dentro de la transacción
//                 await newProduct1.addSize(variant.size, { transaction });

//                 await newProduct1.addExtra(variant.extra, { transaction });

//                 return newProduct1;
//             })
//         );

//         // Commit (confirmar) la transacción si todas las operaciones tienen éxito
//         await transaction.commit();

//         return { generalProduct: newGeneralProduct, variants: createdVariants };
//     } catch (error) {
//         // Revertir la transacción en caso de error
//         if (transaction) {
//             await transaction.rollback();
//         }
//         throw error;
//     }
// };

