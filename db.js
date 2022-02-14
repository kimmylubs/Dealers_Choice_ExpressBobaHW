const Sequelize = require('sequelize');
const { STRING } = Sequelize;

const connector = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/boba_hw');

const Shop = connector.define('shop', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    },
});

const Owner = connector.define('owner', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
    }
})

Shop.belongsTo(Owner);
Owner.hasMany(Shop);   

const syncAndSeed = async() => {
    await connector.sync({ force: true });
    const [jooy, truedan, gongcha, teazzi, tenren, kungfutea, tigersugar, wanpoteashop] = await Promise.all(
        ['jooy', 'truedan', 'gongcha', 'teazzi', 'ten ren', 'kung fu tea', 'tiger sugar', 'wanpo tea shop' ].map ( name => Shop.create({ name }))
    );
    const [billy, henry, kasey, trina] = await Promise.all (
        ['billy', 'henry', 'kasey', 'trina'].map ( name => Owner.create({ name }))
    );
    jooy.ownerId = kasey.id,
    truedan.ownerId = trina.id;
    await Promise.all([jooy.save(), truedan.save()]);
};

module.exports = {
    syncAndSeed,
    models: {
        Shop,
        Owner
    }
};


