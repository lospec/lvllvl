import {cmpkeys} from './cmpkeys';
import {getIdentifier} from './get-identifier';

export function replaceVariables(content, replacements) {
	replacements = replacements.sort(cmpkeys);

	for (const replacement of replacements) {
		let value = getIdentifier();
	  	let content = str_replace($name, $value, $content);
	  $GLOBALS["VARIABLEMAP"][$name] = $value;
	}
  
	return $content;
}