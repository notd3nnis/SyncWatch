import Joi from "joi";

export const joinInviteSchema = Joi.object({
  inviteCode: Joi.string().length(6).required(),
});
