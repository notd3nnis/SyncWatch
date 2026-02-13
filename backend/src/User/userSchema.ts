import Joi from "joi";

export const patchMeSchema = Joi.object({
  displayName: Joi.string().trim().min(2).max(80).optional(),
  email: Joi.string().trim().email().allow("").optional(),
  avatarUrl: Joi.string().uri().allow("").optional(),
}).or("displayName", "email", "avatarUrl");
