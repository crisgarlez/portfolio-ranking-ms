import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    app: {
      version: process.env.APP_VERSION,
    },
    rankingDb: {
      dbName: process.env.MYSQL_DB,
      port: parseInt(process.env.MYSQL_PORT, 10),
      password: process.env.MYSQL_PASSWORD,
      user: process.env.MYSQL_USER,
      host: process.env.MYSQL_HOST,
    },
  };
});
