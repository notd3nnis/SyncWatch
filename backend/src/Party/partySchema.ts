import Joi from "joi";

const netflixWatchUrlPattern = /^https?:\/\/(www\.)?netflix\.com\/watch\/\d+/i;

export const createPartySchema = Joi.object({
  title: Joi.string().min(2).max(120).optional(),
  description: Joi.string().max(500).allow(""),
  provider: Joi.string().valid("netflix", "prime").optional(),
  contentRef: Joi.object({
    netflixTitleId: Joi.string().allow("").optional(),
    netflixUrl: Joi.string().pattern(netflixWatchUrlPattern).allow("").optional(),
    displayTitle: Joi.string().allow("").optional(),
    imageUrl: Joi.string().uri().allow(""),
  })
    .or("netflixTitleId", "netflixUrl")
    .optional(),
  settings: Joi.object({
    maxMembers: Joi.number().integer().min(2).max(100).optional(),
    allowMemberPause: Joi.boolean().optional(),
    requireNetflixLinked: Joi.boolean().optional(),
  }).optional(),
});
