import  Shops from '../models/Shops.model.js'

export const getShops = async (req, res) => { 
    const shops = await Shops.find()
    res.json(shops)
}

export const createShops = async (req, res) => { 
    const {CodUnico,Nombre,Direccion,Telefono,Contacto,Host,Mask,Gateway}=req.body
    
    const newShops = new Shops({
        CodUnico,
        Nombre,
        Direccion,
        Telefono,
        Contacto,
        Host,
        Mask,
        Gateway,
    })
    const savedShops = await newShops.save()
    res.json(savedShops);
}

export const getShop = async (req, res) => { 
    const shops = await Shops.find({"CodUnico" : req.params.CodUnico})
    if (shops.length === 0) return res.status(404).json({message: " shops not found"})
        res.json(shops)
}

export const deleteShops = async (req, res) => { 
    const shops = await Shops.deleteOne({"CodUnico" : req.params.CodUnico})
    if (shops.deletedCount !== 1)return res.status(404).json({message: " shops not found"})
    return res.sendStatus(204);
    
}

export const updateShops = async (req, res) => { 
    const body = req.body;
    const shops = await Shops.findOneAndUpdate(
        {
            "CodUnico" : req.params.CodUnico
        },
        {
            ...body
        },
        {
            new:true,
        }
        
    );
    if (!shops) return res.status(404).json({message: " shops not found"})
    res.json({
        data:shops})
} 