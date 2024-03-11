import users from "../models/User.model.js";
import bcrypt from "../node_modules/bcrypt/bcrypt.js";
import createAccesTokens from "../lib/jwt.js";
import jwt from "jsonwebtoken";

export const register = async (req, res)=> {
    const { username, password, name, rol } = req.body;

  try{
    const userFound = await users.findOne({username});
    if (userFound) 
            return res.status(400).json([' the email is already in use']); 
            
            //const passwordHashs = await bcrypt.hash(password, 5) // permite darnos un estring aleatorio para encriptar la contraseña
            const newUser = new users({
                username,
                rol,
                name,
                password,
            });

      const userSaved = await newUser.save();
      const token = await createAccesTokens ({id:userSaved._id});
      
      res.cookie('token', token)
      res.json({
            id: userSaved._id,
            username: userSaved.username,
            name: userSaved.name,
            rol:userSaved.rol,
      });
    
  } catch (error) {
    res.status(500).json({massage: error.message});
  }
};


export const login = async (req, res)=> {
    const { username, password } = req.body;

  try {

      const userFound = await users.findOne({ username });

      if (!userFound) return res.status(400).json({message: "User not found"});
      
      const isMatch = await bcrypt.compare(password, userFound.password)
      
      if (!isMatch) return res.status(400).json({message: "Incorrect password"});

      const token = await createAccesTokens ({id: userFound._id});

      res.cookie("token", token, {
        sameSite: 'none',
        secure: true,
        });
      res.json({
        id:userFound._id,
        username: userFound.username,
        name: userFound.name,
        token,
        rol:userFound.rol,
      });

      
  
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};


export const logout = (req, res)=>{
        res.cookie('token', "",{
          expires: new Date(0)
        })
      
        return res.sendStatus(200);
};


export const profile = async (req, res) =>{
    const userFound = await users.findById(req.user.id)

    if (!userFound) return res.status(400).json({message: "User not found"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        name: userFound.name,
        rol:userFound.rol,
    })
};

export const verifyToken = async(req, res)=>{
  
  const {token} = req.cookies
  

  if (!token) return res.status(401).json({message:"unathorized"});

  jwt.verify(token, "Token_secret123", async (err, user) => {
    if (err) return res.status(401).json({message: "unathorized" });

    const userFound = await users.findById(user.id)
    if (!userFound) return res.status(401).json({message:"unathorized"});

    return res.json({
      id: userFound._id,
      username: userFound.username,
      name: userFound.name,
      rol:userFound.rol,
    });
  } );
};