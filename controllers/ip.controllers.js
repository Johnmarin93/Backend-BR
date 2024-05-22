import  IP from '../models/Ips.models.js'

export const getIps = async (req, res) => { 
    const ips = await IP.find()
    res.json(ips)
    console.log(ips)
}

export const createIp = async (req, res) => { 
    const {Terminal,IpLocal,CodUnico,Estado}=req.body
    
    const newIp = new IP({
        IpLocal,
        Terminal,
        CodUnico,   
        Estado,
    })
    const savedIp = await newIp.save()
    res.json(savedIp);
}

export const getIp = async (req, res) => { 
    try{
        const ips = await IP.find({"CodUnico" : req.params.CodUnico})
    if (ips.length === 0) return res.status(404).json({message: " shops not found"})
        res.json(ips)
    }catch (error){
        return res.status(404).json({message: " shops not found"})
    }
}

export const deleteIp = async (req, res) => { 
    const ip = await IP.deleteOne({"CodUnico" : req.params.CodUnico})
    if (ip.deletedCount !== 1)return res.status(404).json({message: " shops not found"})
    return res.sendStatus(204);
    
}

export const updateIp = async (req, res) => { 
    const body = req.body;
    const ip = await IP.findOneAndUpdate(
        {
            "Estado" : req.params.Estado
        },
        {
            ...body
        },
        {
            new:true,
        }
        
    );
    if (!ip) return res.status(404).json({message: " shops not found"})
    res.json({
        data:ip})
} 