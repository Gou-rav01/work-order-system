import mongoose, { Schema, models, model } from 'mongoose';

const WorkOrderSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 80,
    },
    description: {
      type: String,
      default: '',
      maxlength: 2000,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Done'],
      default: 'Open',
    },
  },
  {
    timestamps: true,
  }
);

export default models.WorkOrder || model('WorkOrder', WorkOrderSchema);