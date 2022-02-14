const express = require("express");
const bobaData = require("./bobaData");
const path = require('path');

const app = express();


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