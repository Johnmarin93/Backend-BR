import express from 'express';
import cors from 'cors'; // Es un control de acceso en http 
const app = express();
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';  // Nos permite convertir una cookie en un objeto json 
import authRoutes from './routes/auth.routes.js';
import shopsRoutes from './routes/shops.routes.js'
import devicesRoutes from './routes/devices.routes.js'
import ipRoutes from './routes/ip.routes.js'



const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://dircre.netlify.app',
        //http://localhost:5173
        //https://dircre.netlify.app
    credentials:true}));
app.use(express.json());
app.use(cookieParser());

async function main(){
    await mongoose.connect("mongodb+srv://Admin:UQblVb7Vk5HRHItL@cluster0.zvndshp.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connected to MongoDB*");
}

main().catch(console.error);

app.use('/api', authRoutes);
app.use('/api', shopsRoutes);
app.use('/api', devicesRoutes);
app.use('/api', ipRoutes);


app.get('/', (req, res)=>{
    res.send('Soy tu servidor de confianza!')
});

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});

export default app;