import Joi from "joi";

export const postMessageSchema = Joi.object({
  text: Joi.string().min(1).max(1000).required(),
});
