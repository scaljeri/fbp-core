import * as pjson from '../package.json';
import * as fs from 'fs';
import * as path from 'path';

function readPkgJson(name: string) {
	return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', name, 'package.json'), 'utf8'));
};

function generate(name: string): string {
	const pgk = readPkgJson(name);
	const output = {
		name: `@scaljeri/fbp/${name}`,
		version: `${pjson.version}`,
		license: 'MIT',
		main: './index.js',
		types: './index.d.ts'
	} as any;

	if (Object.keys(pgk.peerDependencies || {}).length > 0) {
		output.peerDependencies = pgk.peerDependencies;
	}

	return JSON.stringify(output, null, 4);
}

['browser', 'nodejs'].forEach((name: string) => {
	fs.writeFileSync(`./dist/${name}/package.json`, generate(name));
});