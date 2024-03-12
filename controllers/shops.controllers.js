import  Shops from '../models/Shops.model.js'

export const getShops = async (req, res) => { 
    try {
        const shops = await Shops.find()
            res.json(shops)
    } catch (error) {
        return res.status(404).json({message: " shops not found"})
    }
}

export const createShops = async (req, res) => { 
    try {
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
    } catch (error) {
        return res.status(404).json({message: " shops not found"})
    }
}

export const getShop = async (req, res) => { 
    try{
        const shops = await Shops.find({"CodUnico" : req.params.CodUnico})
    if (shops.length === 0) return res.status(404).json({message: " shops not found"})
        res.json(shops)
    }catch (error){
        return res.status(404).json({message: " shops not found"})
    }
    
}

export const deleteShops = async (req, res) => { 
    try {
        const shops = await Shops.deleteOne({"CodUnico" : req.params.CodUnico})
         if (shops.deletedCount !== 1)return res.status(404).json({message: " shops not found"})
            return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({message: " shops not found"})
    }
    
}

export const updateShops = async (req, res) => { 
    try {
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
    } catch (error) {
        return res.status(404).json({message: " shops not found"})
    }
} 