import connectDB from '../config/connect-db';
import { disconnect } from 'mongoose';
import Post from '../models/post.model.js';

const ORG_ID = '68c0cc3d33e841533cd8cadb'; // your test org ID

const mockPosts = [
  {
    content: {
      title: 'Welcome to True Orchard!',
      description:
        'We’re excited to announce the launch of our new online ministry hub — where faith meets connection.',
      media: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e'],
    },
    stats: { likes: 23, views: 150, comments: [] },
    author: 'Pastor Kim',
    postType: 'EVENT',
    visibility: 'PUBLIC',
    organizationId: ORG_ID,
  },
  {
    content: {
      title: 'Weekly Devotional: Peace in the Storm',
      description:
        'Even when the waves crash, we can rest in the One who commands them.',
      media: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'],
    },
    stats: { likes: 41, views: 230, comments: [] },
    author: 'Jane Park',
    postType: 'DAILY',
    visibility: 'PUBLIC',
    organizationId: ORG_ID,
  },
  {
    content: {
      title: 'Prayer Request for Missions Team',
      description:
        'Please pray for our missionaries traveling to Kenya this month.',
      media: ['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429'],
    },
    stats: { likes: 12, views: 90, comments: [] },
    author: 'Mission Dept',
    postType: 'PRAYER_REQUEST',
    visibility: 'PUBLIC',
    organizationId: ORG_ID,
  },
  {
    content: {
      title: 'Testimony: Healing from Anxiety',
      description:
        'I struggled with anxiety for years, but through prayer and community, God gave me peace.',
      media: ['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'],
    },
    stats: { likes: 78, views: 510, comments: [] },
    author: 'Eunice Lee',
    postType: 'TESTIMONY',
    visibility: 'PUBLIC',
    organizationId: ORG_ID,
  },
  {
    content: {
      title: 'Upcoming Worship Night',
      description:
        'Join us for an evening of worship and fellowship this Friday at 7PM!',
      media: ['https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91'],
    },
    stats: { likes: 33, views: 280, comments: [] },
    author: 'Worship Team',
    postType: 'EVENT',
    visibility: 'PUBLIC',
    organizationId: ORG_ID,
  },
  {
    content: {
      title: 'Daily Reflection: Gratitude',
      description:
        'Take a moment to thank God for the little things today — joy is found in gratitude.',
      media: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e'],
    },
    stats: { likes: 22, views: 200, comments: [] },
    author: 'John Park',
    postType: 'DAILY',
    visibility: 'PUBLIC',
    organizationId: ORG_ID,
  },
  {
    content: {
      title: 'Mission Update: Kenya Team Arrives Safely',
      description:
        'Our missions team landed safely in Nairobi and began outreach today!',
      media: ['https://images.unsplash.com/photo-1606788075761-41d0a0c2f6df'],
    },
    stats: { likes: 55, views: 420, comments: [] },
    author: 'Mission Dept',
    postType: 'MISSION_UPDATE',
    visibility: 'PUBLIC',
    organizationId: ORG_ID,
  },
  {
    content: {
      title: 'Private Staff Meeting Notes',
      description:
        'Recap of last week’s staff meeting. Please do not share externally.',
      media: ['https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4'],
    },
    stats: { likes: 0, views: 10, comments: [] },
    author: 'Admin',
    postType: 'EVENT',
    visibility: 'PRIVATE',
    organizationId: ORG_ID,
  },
  {
    content: {
      title: 'Testimony: Restored Relationships',
      description:
        'After years of distance, God helped me reconcile with my family.',
      media: ['https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d'],
    },
    stats: { likes: 91, views: 680, comments: [] },
    author: 'Grace Min',
    postType: 'TESTIMONY',
    visibility: 'PUBLIC',
    organizationId: ORG_ID,
  },
  {
    content: {
      title: 'Daily Verse: Romans 12:12',
      description:
        '"Be joyful in hope, patient in affliction, faithful in prayer." Let this guide your day.',
      media: ['https://images.unsplash.com/photo-1502136969935-8d0715a6271d'],
    },
    stats: { likes: 44, views: 330, comments: [] },
    author: 'Pastor Kim',
    postType: 'DAILY',
    visibility: 'PUBLIC',
    organizationId: ORG_ID,
  },
];

async function populatePosts() {
  try {
    await connectDB();
    console.log('Connected to DB');

    for (const post of mockPosts) {
      const exists = await Post.findOne({
        'content.title': post.content.title,
      });
      if (!exists) {
        await Post.create(post);
        console.log(`Inserted: ${post.content.title}`);
      } else {
        console.log(`Skipped (exists): ${post.content.title}`);
      }
    }

    await disconnect();
    console.log('✅ Finished seeding posts.');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  }
}

populatePosts();
