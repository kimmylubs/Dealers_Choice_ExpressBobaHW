const express = require("express");
const { syncAndSeed, models: { Shop, Owner }} = require("./db");
const app = express();

app.use(require('method-override')('_method'));
app.use(express.urlencoded({ extended: false }));

app.put('/shop/:id', async(req, res, next) => {
    try{
        const shop = await Shop.findByPk(req.params.id);
        await shop.update(req.body);
        res.redirect('/');
    }
    catch(e){
        console.log(e)
        next(e);
    }
});

app.get("/", async (req, res, next) => {
  try {
    const [shops, owners] = await Promise.all([
      Shop.findAll({
        include: [Owner],
                order: [
            ['name']
        ]
      }),
      Owner.findAll({
        include: [Shop],
        order: [
            ['name']
        ]
      }),
    ]);
    const html = 
    `<html>
    <body> <div>
    <h2> Owners </h2>
    <ul>
        ${owners.map((owner) => `
        <li>${owner.name}
        <ul> ${owner.shops.map( shop => `<li> ${shop.name}</li>`). join('')} </ul>
        </li>`
        ).join('')}
    </ul>
    </div> <div>
    <h2> Boba Shops </h2>
    <ul> 
        ${shops.map((shop) =>` 
        <li> ${shop.name} 
        <form method='POST' action='/shop/${shop.id}?_method=PUT'> <select name='ownerId'> 
        <option value=''>-- not managed --</option> 
        ${owners.map(owner => `<option value='${owner.id}' ${ owner.id === shop.ownerId ? 'selected="selected"':''}> ${owner.name} </option>`).join('')}
        </select> <button> Save </button> </form>
        </li>`).join('')}
    </ul>
    </div>
    </body>
    </html>`;
    res.send(html);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    console.log("ready");
  } catch (e) {
    console.log(e);
  }
};

init();

const port = 3000;
app.listen(port, () => console.log(`lstening on ${port}`));
