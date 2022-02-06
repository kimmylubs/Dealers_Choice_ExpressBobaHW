const express = require("express");
const bobaData = require("./bobaData");

const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

app.get("/", async (req, res, next) => {
  const stores = bobaData.list();
  res.send(stores);
});

app.get("/home", async (req, res, next) => {
    const stores = bobaData.list();
    const html = `<!DOCTYPE html>
    <html>
        <body>
            <header> <h1> Boba Shops! </h1> </header>
            <div>
            ${stores.map((store) =>  `<ul> <a href = "/home/${store.id}"> ${store.name} </a> </ul>`)
            .join(' ')}
            </div>
            <br>
            <div>
            <a href = '/home/all'> ALL BOBA INFO  </a>
            </div> 
            <br>
            <div>
            <a href ='/'> Boba Shops Array Info </a>
            </div>
        </body>
    </html>`;
    res.send(html);
  });

app.get("/home/all", async (req, res, next) => {
    const stores = bobaData.list();
    const html =` <!DOCTYPE html>
    <html>
        <body>
            <header> 
                ${stores.map((store) => 
                    `<ul> <h3> Store Name: ${store.name} </h3> </ul>
                    <ul>  Rating: ${store.stars} </ul>` )
                    .join (' ')};
            </header>
        </body>
    </html>`;
    res.send(html);
});

app.get("/home/:id", async (req, res, next) => {
    const id = req.params.id;
    const stores = bobaData.find(id);
    const html = `<!DOCTYPE html>
    <html>
        <header> <h2> BOBA SHOP </h2> 
        <h4>${stores.name} </h4></header>
        <body>
            <div>
            ID#: ${stores.id}
            <br>
            STARS: ${stores.stars}
            </div>
        </body>
    </html>`;
    res.send(html);
});

app.listen(3000);