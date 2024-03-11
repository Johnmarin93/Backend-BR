import mongoose from "mongoose";

const shopsSchema = new mongoose.Schema({
    CodUnico: {
        type: String,
        required: true,
    },
    Nombre: {
        type: String,
        required: true,
    },
    Direccion: {
        type: String,
        required: true,
    },
    Telefono: {
        type: String,
        required: false,
    },
    Contacto: {
        type: String,
        required: false,
    },
    Host: {
        type: String,
        required: true,
    },
    Mask: {
        type: String,
        required: true,
    },
    Gateway: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Shops', shopsSchema)