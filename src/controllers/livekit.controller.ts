import { AccessToken } from "livekit-server-sdk";
import config from "../config/config";
import Logger from '../utils/logger';

const logger = new Logger('/src/controllers/livekit.controller.ts');

class LivekitController {
    async generateAccessToken({room, uid}: {room: string; uid: string}){
        const accessToken = new AccessToken();
        const at = new AccessToken(
        config.livekitApikey,
        config.livekitSecret,
        {
            identity: uid,
            // ttl: 60 * 10, // 10 min
        }
        );

        at.addGrant({
        roomJoin: true,
        room,
        canPublish: true,
        canSubscribe: true,
        });

        const token = await at.toJwt();

        const result = {
        token,
        url: config.livekitUri,
        identity: uid,
        };

        logger.debug(`[LivekitController.generateToken] result:`, result);

        return result;
    }

    }


}

export default LivekitController;
