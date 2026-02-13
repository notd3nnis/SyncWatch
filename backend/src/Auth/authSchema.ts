import Joi from "joi";

export const linkProviderSchema = Joi.object({
  provider: Joi.string().valid("netflix", "prime").required(),
});
