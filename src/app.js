import express from "express";
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

import mongoose from "mongoose";
import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import viewsRouter from './routes/views.routes.js';

const app = express();
mongoose.set('strictQuery', true);
const user = 'kaoh0';
const dbname = 'ecommerce';
const password = 'hx1xVbLU3Gs3R2Tb';
const uri =  `mongodb+srv://${user}:${password}@ecommerce.l6epe3o.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri, 
    { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('DB conectado'))
    .catch(err => console.log(err))

// handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartsRoutes);
app.use('/', viewsRouter);

app.listen(8080, () => console.log('Server up in port 8080'))

