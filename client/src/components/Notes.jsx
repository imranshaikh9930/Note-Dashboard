import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import NotesCard from './NotesCard';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Loader from './Loader';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(notes);
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/user/notes');
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!input.trim()) return;
    try {
      if (editId) {
        await axiosInstance.put(`/user/notes/${editId}`, { content: input });
      } else {
        await axiosInstance.post('/user/notes', { content: input });
      }
      setInput('');
      setEditId(null);
      fetchNotes();
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  const handleEdit = (note) => {
    setInput(note.content);
    setEditId(note._id);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/user/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const reordered = [...notes];
    const [moved] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, moved);
    setNotes(reordered);
  };

  return (
    <div className=" bg-red rounded shadow w-full h-full w-full max-w-screen">
      <h2 className="text-xl font-semibold mb-4">My Notes</h2>
      <div className="flex gap-2 mb-4">
      <input
  className="border p-2 w-full bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 rounded"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Write your note here..."
/>

        <button
          onClick={handleAddOrUpdate}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          {editId ? 'Update' : 'Add'}
        </button>
      </div>

      {loading ? (
        <Loader/>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="notes" direction="horizontal">
            {(provided) => (
             <div
             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 bg-transparent dark:bg-transparent place-items-center overflow-x-hidden"
             {...provided.droppableProps}
             ref={provided.innerRef}
           >
             {notes.map((note, index) => (
               <Draggable key={note._id} draggableId={note._id} index={index}>
                 {(provided) => (
                   <div
                     ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     className="bg-none dark:bg-transparent p-4  hover:shadow-lg "
                   >
                     <NotesCard
                       note={note}
                       handleEdit={handleEdit}
                       handleDelete={handleDelete}
                     />
                   </div>
                 )}
               </Draggable>
             ))}
             {provided.placeholder}
           </div>
           
            
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default Notes;
