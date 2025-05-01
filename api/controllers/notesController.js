const Note = require("../model/note");

const createNotes = async(req,res)=>{

    const note = new Note({ ...req.body, userId: req.user.id });
    await note.save();
    res.json(note);
}

const getNotes = async(req,res)=>{

    const getNote = await Note.find({userId:req.user.id});
    res.json(getNote);
}

const updateNotes = async (req, res) => {
    try {
    
      const { id } = req.params;
      const { content } = req.body;
  

      const updatedNote = await Note.findByIdAndUpdate(
        { _id: id, userId: req.user.id }, 
        { content }, 
        { new: true } 
      );
  
      if (!updatedNote) {
      
        return res.status(404).json({ message: "Note not found" });
      }
  
    
      res.json(updatedNote);
  
    } catch (err) {
    //   console.error(err); 
      res.status(500).json({ message: "Internal Server Error" }); 
    }
  };
  
const deleteNotes = async(req,res)=>{
    const deleteNote = await Note.findByIdAndDelete({_id:req.params.id,userId:req.user.id});

    if(!deleteNote){
        return res.status(404).json({message:"Note not found"});
    }
    res.json({message:"Note deleted"})
}

module.exports = {createNotes,getNotes,updateNotes,deleteNotes};