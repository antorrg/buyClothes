const {infoVideoGame}=require('../../../../Data/indexData');
const {createGameDB}=require('../AdminControllers/gamesPostController');


const product1Cr = async()=>{
for (let i = 0; i <data.length; i++) {
    const info = data[i];

    try {
        // Llamar al controlador post aquí, usando los datos del json
        await createGameDB(info.name, info.description, info.image, info.released, info.genres, info.platforms, info.price, info.physicalGame, info.stock);

        console.log(`Successfully: ${info.name}`);
    } catch (error) {
        console.error(`Error when posting the game ${info.name}: ${error.message}`);
    }
}
}

export default product1Cr;
