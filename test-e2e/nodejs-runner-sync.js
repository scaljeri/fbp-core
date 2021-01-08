require("ts-node").register({
	project: "./tsconfig-nodejs-e2e.json",
});

require('./src/nodejs/main-sync');