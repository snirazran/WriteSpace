export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? 'yourDefaultSecretKey',
  expiersIn: process.env.JWT_EXPIRES_IN ?? '30d',
};
