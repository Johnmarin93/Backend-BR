import  Devices from '../models/Devices.models.js'
import Shops from '../models/Shops.model.js'

export const getDevices = async (req, res) => { 
    const devices = await Devices.find()
    if (devices.length === 0) return res.status(404).json({message: " shops not found"})
    res.json(devices)
}

export const createDevices = async (req, res) => { 
    const {Placa,Serial,Referencia,Tipo,CodUnico}=req.body
    
    const newDevices = new Devices({
        Placa,
        Serial,
        Referencia,
        Tipo,
        CodUnico,
    })
    const savedDevices = await newDevices.save()
    res.json(savedDevices);
}

export const getDeviceCod = async (req, res) => { 
    const devices = await Devices.find({"CodUnico" : req.params.CodUnico})
    if (devices.length === 0) return res.status(404).json({message: " shops not found"})
        res.json(devices)
}

export const getDeviceSerie = async (req, res) => { 
    const devices = await Devices.find({"Serial" : req.params.Serial})
    if (devices.length === 0) return res.status(404).json({message: " shops not found"})
    const CodUnico = devices[0]['CodUnico']
    const CU = await Shops.find({"CodUnico" : CodUnico})
    if (devices.length === 0) return res.status(404).json({message: "No hay informacion de comercio"})
    console.log(CU[0]['Nombre'])
    const info = devices.concat(CU)
    res.json(info)

}

export const getDevicesRef = async (req, res) => { 
    const devices = await Devices.find({"Referencia" : req.params.Referencia})
    if (devices.length === 0) return res.status(404).json({message: " shops not found"})
        res.json(devices)
}

export const deleteDevices = async (req, res) => { 
    const devices = await Devices.deleteOne({"Serial" : req.params.Serial})
    if (devices.deletedCount !== 1)return res.status(404).json({message: " shops not found"})
    return res.sendStatus(204);
    
}

export const updateDevices = async (req, res) => { 
    const body = req.body;
    const devices = await Devices.findOneAndUpdate(
        {
            "Serial" : req.params.Serial
        },
        {
            ...body
        },
        {
            new:true,
        }
        
    );
    if (!devices) return res.status(404).json({message: " shops not found"})
    res.json({
        data:devices})
} 