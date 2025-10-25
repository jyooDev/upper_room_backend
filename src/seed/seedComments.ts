import connectDB from '../config/connect-db';
import { disconnect } from 'mongoose';
import Comment from '../models/comment.model';

const POST_ID = '68fd1865e7aae70c739e6258'; // your test org ID

const mockComments = [
  {
    post: POST_ID,
    comment: 'Praying for you and your team! Keep shining His light 🙏',
    author: 'JnM7sb9X91YE4cFF5VZ5yWUjKCj2',
    stats: { likes: 2 },
    likedBy: ['mFxEx0iSyfX9D4pM3DC2ldp7ifu2', 'RaX8OLgQoEVn9G5pBWwdn2T8fVH3'],
  },
  {
    post: POST_ID,
    comment: 'Such an encouraging testimony — thank you for sharing!',
    author: 'mFxEx0iSyfX9D4pM3DC2ldp7ifu2',
    stats: { likes: 2 },
    likedBy: ['JnM7sb9X91YE4cFF5VZ5yWUjKCj2', 'RaX8OLgQoEVn9G5pBWwdn2T8fVH3'],
  },
  {
    post: POST_ID,
    comment: 'This blessed me so much today. God is faithful!',
    author: 'RaX8OLgQoEVn9G5pBWwdn2T8fVH3',
    stats: { likes: 1 },
    likedBy: ['mFxEx0iSyfX9D4pM3DC2ldp7ifu2'],
  },
  {
    post: POST_ID,
    comment: 'Amen! His grace never fails.',
    author: 'JnM7sb9X91YE4cFF5VZ5yWUjKCj2',
    stats: { likes: 0 },
    likedBy: [],
  },
];

async function populateComments() {
  try {
    await connectDB();
    console.log('✅ Connected to DB');

    for (const comment of mockComments) {
      const exists = await Comment.findOne({
        comment: comment.comment,
      });

      if (!exists) {
        await Comment.create(comment);
        console.log(`Inserted: ${comment.comment}`);
      } else {
        console.log(`Skipped (exists): ${comment.comment}`);
      }
    }
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    await disconnect();
    console.log('✅ Finished seeding comments.');
  }
}

populateComments();
