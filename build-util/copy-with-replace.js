export function recursiveCopy (src,dest) {

	let source = file_get_contents(src) + "\n\n";
	source = replaceConstants(source);
	source = replaceVariablesWithMap(source);
	
	let fp = fopen(dest, "w");
	fwrite(fp, source);
	fclose(fp);
}