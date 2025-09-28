import Organization, { IOrganization } from '../models/organization.model';
import connectDB from '../config/connect-db';
import { disconnect } from 'mongoose';
import { Types } from 'mongoose';
// export interface IOrganization {
//     organizer: string;
//     pastor?: string;
//     managers?: [string];
//     name: string;
//     denomination: string;
//     members?: [string];
// }

const organizations: IOrganization[] = [
  {
    organizer: 'mFxEx0iSyfX9D4pM3DC2ldp7ifu2',
    name: 'Young Adult Ministry',
    denomination: new Types.ObjectId('68c0ca2bb653857d1a414a98'),
    logoURL:
      'https://southerncharmdesign.co/wp-content/uploads/2018/05/YoungAdultMinisty_Logo_2.jpg',
    memberss: ['RaX8OLgQoEVn9G5pBWwdn2T8fVH3'],
  },
  {
    organizer: '녹동감리교회',
    name: 'Young Adult Ministry',
    denomination: new Types.ObjectId('68c0ca2bb653857d1a414a98'),
    logoURL:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20110126_1%2Fboramadok_1296005146489TKMjh_jpg%2F%25B0%25A8%25B8%25AE%25B1%25B3%25B8%25B6%25C5%25A9_boramadok.jpg&type=sc960_832',
    memberss: ['RaX8OLgQoEVn9G5pBWwdn2T8fVH3'],
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
