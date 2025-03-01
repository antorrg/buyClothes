
```javascript
// Modelo GeneralProduct: Producto genérico
export default (sequelize, DataTypes) => {
    const GeneralProduct = sequelize.define('GeneralProduct', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        released: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        enable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        defaultScope: {
            where: { deletedAt: null }
        },
    });

    return GeneralProduct;
};

// Modelo ProductVariant: Variaciones del producto (tamaño, color, stock, precio)
export default (sequelize, DataTypes) => {
    const ProductVariant = sequelize.define('ProductVariant', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        enable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        defaultScope: {
            where: { deletedAt: null }
        },
    });

    return ProductVariant;
};

// Modelo Attribute: Atributos generales de los productos
export default (sequelize, DataTypes) => {
    const Attribute = sequelize.define('Attribute', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('Category', 'Discipline', 'Genre'),
            allowNull: false,
        },
        enable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        defaultScope: {
            where: { deletedAt: null }
        },
    });

    return Attribute;
};

// Modelo Trademarck: Marcas asociadas a los productos
export default (sequelize, DataTypes) => {
    const Trademarck = sequelize.define('Trademarck', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
    });

    return Trademarck;
};

// Modelo Rating: Calificaciones de los productos
export default (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 5 },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        timestamps: true,
    });

    return Rating;
};

// Definición de relaciones
export default (sequelize) => {
    const { GeneralProduct, ProductVariant, Attribute, Trademarck, Rating, User } = sequelize.models;

    GeneralProduct.belongsToMany(Attribute, { through: 'general_attributes' });
    Attribute.belongsToMany(GeneralProduct, { through: 'general_attributes' });

    GeneralProduct.belongsToMany(Trademarck, { through: 'general_trademarck' });
    Trademarck.belongsToMany(GeneralProduct, { through: 'general_trademarck' });

    GeneralProduct.hasMany(ProductVariant);
    ProductVariant.belongsTo(GeneralProduct);

    ProductVariant.hasMany(Rating);
    Rating.belongsTo(ProductVariant);

    User.hasMany(Rating);
    Rating.belongsTo(User);
};
```