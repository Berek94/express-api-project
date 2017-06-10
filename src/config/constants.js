<<<<<<< HEAD
const devConfig = {
	MONGO_URL: 'mongodb://localhost/testDB-dev',
};
const prodConfig = {
	MONGO_URL: 'mongodb://localhost/testDB-prod',
};
const testConfig = {
	MONGO_URL: 'mongodb://localhost/testDB-test',
};

const defaultConfig = {
	PORT: process.env.PORT || 3000,
};

const envConfig = env => {
	switch (env) {
	case 'development':
		return devConfig;
	case 'production':
		return prodConfig;
	default:
		return testConfig;
	}
};

export default {
	...defaultConfig,
	...envConfig(process.env.NODE_ENV),
=======
const devConfig = {
	MONGO_URL: 'mongodb://localhost/testDB-dev',
};
const prodConfig = {
	MONGO_URL: 'mongodb://localhost/testDB-prod',
};
const testConfig = {
	MONGO_URL: 'mongodb://localhost/testDB-test',
};

const defaultConfig = {
	PORT: process.env.PORT || 3000,
};

const envConfig = env => {
	switch (env) {
	case 'development':
		return devConfig;
	case 'production':
		return prodConfig;
	default:
		return testConfig;
	}
};

export default {
	...defaultConfig,
	...envConfig(process.env.NODE_ENV),
>>>>>>> some commit
};