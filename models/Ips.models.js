import mongoose from "mongoose";

const ipsSchema = new mongoose.Schema({
    Terminal: {
        type: String,
        required: false,
    },
    IpLocal: {
        type: String,
        required: true,
    },
    CodUnico: {
        type: String,
        required: true,
    },
    Estado:{
        type:Boolean,
        required:true,
    },
});

export default mongoose.model('Ips', ipsSchema)