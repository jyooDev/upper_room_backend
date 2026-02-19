import { Types } from 'mongoose';
import Sermon from '../models/sermon.model';
import Organization from '../models/organization.model';
import SermonLiveSession from '../models/sermon-live-session.model';
import Logger from '../utils/logger';

const logger = new Logger('/src/controllers/live-sessions.controller.ts');

export type StartLiveSessionPayload = {
  sermonId: string;
  // For now, backend issue specifies PRIVATE sessions.
  visibility?: 'PRIVATE' | 'PUBLIC';
};

export type EndLiveSessionPayload = {
  sermonId: string;
  storeRecording?: boolean;
};

class LiveSessionsController {
  async startSession(payload: StartLiveSessionPayload, userUid: string) {
    const { sermonId, visibility = 'PRIVATE' } = payload;

    const sermon = await Sermon.findById(sermonId);
    if (!sermon) {
      return { status: 404, body: { message: 'sermon not found' } };
    }

    if (sermon.status !== 'LIVE') {
      return { status: 400, body: { message: 'sermon is not LIVE' } };
    }

    const org = await Organization.findById(sermon.organizationId);
    if (!org) {
      return { status: 404, body: { message: 'organization not found' } };
    }

    const roomName = sermon.roomName ?? `sermon-${sermon._id.toString()}`;

    // Ensure no existing LIVE session for this sermon
    const existing = await SermonLiveSession.findOne({
      sermonId: sermon._id,
      status: 'LIVE',
    });

    if (existing) {
      return {
        status: 200,
        body: {
          liveSession: existing,
          roomName: existing.roomName,
        },
      };
    }

    const created = await SermonLiveSession.create({
      sermonId: sermon._id,
      orgId: org._id,
      roomName,
      visibility,
      status: 'LIVE',
      startedAt: new Date(),
      createdBy: userUid,
    });

    logger.debug('Live session started', {
      sermonId,
      orgId: org._id.toString(),
      roomName,
      visibility,
    });

    return { status: 201, body: { liveSession: created, roomName } };
  }

  async endSession(payload: EndLiveSessionPayload, userUid: string) {
    const { sermonId, storeRecording = false } = payload;

    const sermon = await Sermon.findById(sermonId);
    if (!sermon) {
      return { status: 404, body: { message: 'sermon not found' } };
    }

    const session = await SermonLiveSession.findOne({
      sermonId: sermon._id,
      status: 'LIVE',
    });

    if (!session) {
      return { status: 404, body: { message: 'live session not found' } };
    }

    session.status = 'ENDED';
    session.endedAt = new Date();
    session.endedBy = userUid;
    session.storeRecording = storeRecording;
    await session.save();

    // Mark sermon ended as well (backend is source of truth)
    sermon.status = 'ENDED';
    sermon.endedAt = new Date();
    await sermon.save();

    logger.debug('Live session ended', {
      sermonId,
      roomName: session.roomName,
      storeRecording,
    });

    return { status: 200, body: { liveSession: session } };
  }

  async joinSession(sermonId: string) {
    const sermon = await Sermon.findById(sermonId);
    if (!sermon) {
      return { status: 404, body: { message: 'sermon not found' } };
    }

    const session = await SermonLiveSession.findOne({
      sermonId: sermon._id,
      status: 'LIVE',
    });

    if (!session) {
      return { status: 404, body: { message: 'live session not found' } };
    }

    return {
      status: 200,
      body: {
        roomName: session.roomName,
        liveSession: session,
      },
    };
  }

  async listLiveSessions(orgId: string) {
    if (!Types.ObjectId.isValid(orgId)) {
      return { status: 400, body: { message: 'invalid orgId' } };
    }

    const sessions = await SermonLiveSession.find({
      orgId: new Types.ObjectId(orgId),
      status: 'LIVE',
    }).sort({ startedAt: -1 });

    return { status: 200, body: { liveSessions: sessions } };
  }
}

export default LiveSessionsController;
