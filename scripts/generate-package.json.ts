import * as pjson from '../package.json';
import * as fs from 'fs';


function generate(name: string): string {
	return JSON.stringify({
	name: `@scaljeri/fbp/${name}`,
	version: `${pjson.version}`,
	license: 'MIT',
	main: './index.js',
	types: './index.d.ts'
	}, null, 4);
}

['browser', 'nodejs'].forEach((name: string) => {
	fs.writeFileSync(`./dist/${name}/package.json`, generate(name));
});