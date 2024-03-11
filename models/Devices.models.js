import mongoose from "mongoose";

const devicesSchema = new mongoose.Schema({
    Placa: {
        type: String,
        required: false,
    },
    Serial: {
        type: String,
        required: true,
    },
    Referencia: {
        type: String,
        required: true,
    },
    Tipo: {
        type: String,
        required: true,
    },
    CodUnico: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Devices', devicesSchema)