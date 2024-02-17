const User=require('../models/userModel');
const multer= require('multer');

let filename= '';
const mystorage=multer.diskStorage({
    destination: './uploads',
    filename:(req,file,cb)=>{
        let date =Date.now()
        let fl=date + '.' + file.mimetype.split('/')[1];
        cb(null, fl);
        filename=fl;
    }
})
const upload =multer({storage:mystorage})


exports.getOneUser=async(req,res)=>{
    try {
    const userId = req.params.id;
      const userExist = await User.findById(userId);
      if (!userExist) {
        res.status(404).json({ message: "User not found check the id !!!! " });
      } else {
        await User.findByIdAndUpdate(userId);
        const usersList = await User.find();
        res.status(200).json(usersList);
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
      const usersList = await User.find();
      res.status(200).json(usersList);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  
  exports.createUser = async (req, res) => {
    try {
      //extraction de data from body request
      upload.single('image')(req,res,async function(err){
        if (err instanceof multer.MulterError){
            return res.status(500).json({message:err})
            }else if (err){
             return res.status(500).json({message:err})}

             const newUser = new User(req.body);
             newUser.imageURL=filename;
             //store dans mongo db
             const resUser = await newUser.save();
             res.status(201).json(resUser);
        })
    
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const userExist = await User.findById(userId);
      if (!userExist) {
        res.status(404).json({ message: "User not found check the id !!!! " });
      } else {
        await User.findByIdAndDelete(userId);
        const usersList = await User.find();
        res.status(200).json(usersList);
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  
  exports.editUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const userExist = await User.findById(userId);
      if (!userExist) {
        res.status(404).json({ message: "User not found check the id !!!! " });
      } else {
        const newUserData = req.body;
        await User.findByIdAndUpdate(userId, newUserData, { new: true });
        res.status(200).json("user updated sucessfully");
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  