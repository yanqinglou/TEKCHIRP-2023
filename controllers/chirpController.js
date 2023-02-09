const express = require('express');
const router = express.Router();
const {User,Chirp} = require('../models');

router.get("/",(req,res)=>{
   Chirp.findAll().then(chirpData=>{
    res.json(chirpData)
   }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"oh noes!",err})
   })
})
router.get("/:id",(req,res)=>{
   Chirp.findByPk(req.params.id,{
    include:[User]
   }).then(chirpData=>{
    res.json(chirpData)
   }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"oh noes!",err})
   })
})

//TODO: protect this route so only logged in users can chirp
router.post("/",(req,res)=>{
   if(!req.session.userId){
      return res.status(403).json({msg:"login first post"})
   }
   console.log(req.body);
   Chirp.create({
    chirp:req.body.chirp,
    //TODO: read userid from session data instead of from req.body
    UserId:req.session.userId
   }).then(chirpData=>{
    res.json(chirpData)
   }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"oh noes!",err})
   })
})

//TODO: BONUS: add a protected route to delete a chirp (/api/chirps/:id) so that only the user who created the chirp can delete it
router.delete("/:id",(req,res)=>{
   if(!req.session.userId){
      return res.status(403).json({msg:"login first post"})
   }
   console.log(req.body);
   Chirp.findByPk(req.params.id).then(chirpData=>{
      if(!chirpData){
         return res.status(404).json({msg:"no such chirp"})
      } else if(chirpData.UserId!== req.session.userId){
         return res.status(403).json({msg:"not your chirp!"})
      }
      Chirp.destroy({
       where:{
          id:req.params.id,
       }
      }).then(chirpData=>{
        res.json(chirpData)
       }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
       })
   }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
   })
})

module.exports = router;