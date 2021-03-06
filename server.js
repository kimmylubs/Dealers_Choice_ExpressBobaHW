const express = require("express");
const app = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL ||'postgres://localhost/boba_hw');
const path = require('path');

const Shop = sequelize.define('shop', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  owner: {
    type: Sequelize.ENUM('mel', 'kel', 'jel', 'ral', 'sel'),
    defaultValue: 'mel',
  }
  
});

app.use('/src', express.static(path.join(__dirname,'src')));
 
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname,'index.html')));

app.delete('/api/shops/:id', async(req, res, next) => {
  try{
    const shop = await Shop.findByPk(req.params.id);
    await shop.destroy();
    res.sendStatus(204)
  } catch(e) {
    next(e);
  }
});

app.get('/api/shops', async(req, res, next) => {
  try {
    res.send(await Shop.findAll());
  }
  catch(e){
    next(e);
  }
});

const init = async () => {
    await sequelize.sync({ force: true })
    const [jooy, truedan, gongcha, teazzi, tenren] = await Promise.all(
      ['jooy', 'truedan', 'gongcha', 'teazzi', 'ten ren']
    .map ( name => Shop.create({ name })));

    // jooy.owner = 'rel',
    // truedan.owner = 'sel';
    // await Promise.all([jooy.save(), truedan.save()]);
};

init();

const port = 3000;
app.listen(port, () => console.log(`lstening on ${port}`));
