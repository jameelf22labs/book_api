import dotenv from "dotenv";

dotenv.config();

type PostgressType = {
  Host: String | undefined;
  Port: Number | undefined;
  Username: String | undefined;
  Password: String | undefined;
};


type EnvConfiqType = {
  Port: Number;
  Postgress: PostgressType;
};

const envConfig: EnvConfiqType = {
  Port: Number(process.env.PORT) || 8080,
  Postgress: {
    Host: process.env.POSTGRESS_HOST,
    Port: Number(process.env.POSTGRESS_PORT),
    Username: process.env.POSTGRESS_USERNAME,
    Password: process.env.POSTGRESS_PASSWORD,
  },
};

export default envConfig;