import mongoose, { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'], 
    trim: true 
  },
  content: { 
    type: String, 
    required: [true, 'Content is required'], 
    trim: true 
  },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
    maxlength: [200, 'Summary should not exceed 200 characters'],
    trim: true
  },
  cover: {
    type: String,  // URL of the cover image
    required: false,
    trim: true
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  categories: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  }
}, { 
  timestamps: true 
});

// Automatically set `publishedAt` if the post is published
postSchema.pre('save', function(next) {
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

const Post = models.Post || model('Post', postSchema);

export default Post;
