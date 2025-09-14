import Organization, { IOrganization } from '../models/organization.model';
import connectDB from '../config/connect-db';
import { disconnect } from 'mongoose';
import mongoose from 'mongoose';
// export interface IOrganization {
//     organizer: string;
//     pastor?: string;
//     managers?: [string];
//     name: string;
//     denomination: string;
//     members?: [string];
// }

const organizations: [IOrganization] = [
  {
    organizer: 'RaX8OLgQoEVn9G5pBWwdn2T8fVH3',
    name: 'Young Adult Ministry',
    denomination: new mongoose.Types.ObjectId('68c0ca2bb653857d1a414a98'),
    logoURL:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAzMjFfMjQ0%2FMDAxNjQ3ODQxNzYxNTcy.NwhMIsFFHs-a7NjxSTZAQvX9C59aHv5VuxZ1Nb4UAYcg.ih32G-R66cZRXcv7y3JjWGf6Vb_eNDCYN4gJU-p0pUsg.JPEG.network5891%2F%25B4%25EB%25C3%25B5%25BC%25D2%25B8%25C1%25B0%25A8%25B8%25AE.jpg&type=sc960_832',
    memberss: ['mFxEx0iSyfX9D4pM3DC2ldp7ifu2'],
  },
];

async function populate() {
  try {
    await connectDB();
    for (const org of organizations) {
      const exists = await Organization.findOne({ name: org.name });
      if (!exists) {
        await Organization.create(org);
        console.log(`Inserted: ${org.name}`);
      } else {
        console.log(`Skipped (exists): ${org.name}`);
      }
    }
    await disconnect();
    console.log('Finished seeding.');
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

populate();
