import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
