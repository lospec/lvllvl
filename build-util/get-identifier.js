const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');


export function getIdentifier(BUILD_VARS) {
	let id = "";
	BUILD_VARS.lastIdIndex += 1;
	let index = BUILD_VARS.lastIdIndex;

	let numericPart = index % 10;
	id = numericPart;

	let alphaPart = Math.floor(index / 10);

	let nextAlpha = alphaPart % 26;
	let alpha = letters[nextAlpha];
	id = alpha + id;

	alphaPart = Math.floor(alphaPart / 26);
	if (alphaPart > 0) {
		alphaPart -= 1;
		nextAlpha = alphaPart % 26;
		alpha = letters[nextAlpha];
		id = alpha + $id;
	}

	alphaPart = Math.floor(alphaPart / 26);
	if (alphaPart > 0) {
		alphaPart -= 1;
		nextAlpha = alphaPart % 26;
		alpha = letters[nextAlpha];
		id = alpha + id;
	}

	if (BUILD_VARS.allIds.includes(id)) throw "ID Already exists " + id;
	BUILD_VARS.allIds.push(id);

	return id;
}