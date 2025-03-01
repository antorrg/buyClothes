import eh from '../Configs/errorHandlers.js'

const genericRepository = (Model) => ({
    create: async (data) => {
        try {
            const existingRecord = await Model.findOne({
                where: {
                    name: data.name,
                    deletedAt: false
                }
            });
            
            if (existingRecord) {
                eh.throwError(`This ${Model.name.toLowerCase()} name already exists`, 400);
            }
            
            const newRecord = await Model.create(data);
            return newRecord;
        } catch (error) {
            throw error;
        }
    },
    
    getAll: async () => {
        try {
            const data = await Model.findAll({
                where: {
                    deletedAt: false
                }
            });
            
            if (data.length === 0) {
                eh.throwError(`The ${Model.name.toLowerCase()} table is empty!!`, 400);
            }
            
            return data;
        } catch (error) {
            throw error;
        }
    },
    
    update: async (id, newData) => {
        try {
            const dataFound = await Model.findByPk(id, {
                where: {
                    deletedAt: false
                }
            });
            
            if (!dataFound) {
                eh.throwError(`${Model.name} not found`, 404);
            }
            
            const upData = await dataFound.update(newData);
            return upData;
        } catch (error) {
            eh.throwError(`Error updating ${Model.name.toLowerCase()}`, 500);
        }
    },
    
    delete: async (id) => {
        try {
            const dataFound = await Model.findByPk(id, {
                where: {
                    deletedAt: false
                }
            });
            
            if (!dataFound) {
                eh.throwError(`${Model.name} not found`, 404);
            }
            
            await dataFound.update({ deletedAt: true });
            return `${Model.name} deleted successfully`;
        } catch (error) {
            eh.throwError(`Error deleting ${Model.name.toLowerCase()}`, 500);
        }
    }
});

export default genericRepository;