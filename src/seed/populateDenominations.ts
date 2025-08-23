
import { Denomination } from '../models/denomination.model'
import connectDB from '../config/connect-db';
import { disconnect } from 'mongoose'


const denominations = [
    { name: 'Protestant', localizedName: { ko: '개신교', en: 'Protestant' } },
    { name: 'Baptist', localizedName: { ko: '침례교', en: 'Baptist' } },
    { name: 'Methodist', localizedName: { ko: '감리교', en: 'Methodist' } },
    { name: 'Presbyterian', localizedName: { ko: '장로교', en: 'Presbyterian' } },
    { name: 'Evangelical', localizedName: { ko: '복음주의', en: 'Evangelical' } },
    { name: 'Full Gospel', localizedName: { ko: '순복음', en: 'Full Gospel' } },
    { name: 'Interdenominational', localizedName: { ko: '초교파', en: 'Interdenominational' } }, 
    { name: 'Non-denominational', localizedName: { ko: '비교단', en: 'Non-denominational' } },
]


async function populate() {
    try {
        await connectDB();
        for (const denom of denominations) {
            const exists = await Denomination.findOne({ name: denom.name })
            if (!exists) {
                await Denomination.create(denom)
                console.log(`Inserted: ${denom.name}`)
            } else {
                console.log(`Skipped (exists): ${denom.name}`)
            }
        }
        await disconnect();
        console.log('Finished seeding.')
    } catch (err) {
        console.error('Seeding error:', err)
    }
}

populate();