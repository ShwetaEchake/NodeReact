const Service = require("../models/service-model");


const services = async (req,res) =>{
  try {
    const response = await Service.find();
    if(!response){
        //handle the case where no document was found
        return res.status(404).json({ msg:"No service found" });
    }
     res.status(200).json({ msg: response});
  } catch (error) {
    console.error(`services: ${error}`);
  }
};

module.exports = services;