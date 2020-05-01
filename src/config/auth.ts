interface AuthConfig {
  secret: string;
  expiresIn: string;
}

export default {
  secret: process.env.APP_SECRET,
  expiresIn: '7d',
} as AuthConfig;
