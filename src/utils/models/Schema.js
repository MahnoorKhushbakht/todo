import  { Schema, model, models } from 'mongoose';

const todoSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, 
  versionKey: false,
});



const Todo = models.Todo || model('Todo',todoSchema)


export { Todo };
