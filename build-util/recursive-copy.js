import fs from 'fs';
import path from 'path';

export function recursiveCopy(src, dst) {
	if (!fs.existsSync(dst)) {
		fs.mkdirSync(dst, { recursive: true });
	}

	const items = fs.readdirSync(src);

	for (const item of items) {
		const srcPath = path.join(src, item);
		const dstPath = path.join(dst, item);

		if (fs.lstatSync(srcPath).isDirectory()) {
			recursiveCopy(srcPath, dstPath);
		} else {
			fs.copyFileSync(srcPath, dstPath);
		}
	}
}