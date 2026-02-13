import Joi from "joi";

const netflixWatchUrlPattern = /^https?:\/\/(www\.)?netflix\.com\/watch\/\d+/i;

export const postSyncEventSchema = Joi.object({
  type: Joi.string().valid("PLAY", "PAUSE", "SEEK", "HEARTBEAT").required(),
  payload: Joi.object({
    positionMs: Joi.number().min(0).required(),
    playbackRate: Joi.number().min(0.25).max(2).optional(),
    seq: Joi.number().required(),
  }).required(),
});

export const upsertSessionSchema = Joi.object({
  netflixTitleId: Joi.string().trim().allow("").optional(),
  netflixUrl: Joi.string().pattern(netflixWatchUrlPattern).allow("").optional(),
  ready: Joi.boolean().optional(),
  source: Joi.string().valid("extension", "manual").optional(),
});
