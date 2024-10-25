import fs from 'fs';
import {getIdentifier} from '.build-util/get-identifier.js';

const SRCDIR = 'src';
const BUILDDIR = 'build';
const VERSION = "0.495";

const BUILD_DIRECTORIES = [
	BUILDDIR,
	BUILDDIR + '/js',
	BUILDDIR + '/js/html',
	BUILDDIR + '/css',
	BUILDDIR + '/c64',
	BUILDDIR + '/c64/wasm',
	BUILDDIR + '/js/c64',
	BUILDDIR + '/js/c64/wasm',
	BUILDDIR + '/c64page',
	BUILDDIR + '/c64page/js'
];

for (const dir of BUILD_DIRECTORIES) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
		console.log('created directory:', dir);
	}
}

const BUILD_VARS = {
	lastIdIndex: 0,
	allIds: []
};

/*
include_once("buildUtils/buildUtils.php");
include_once("buildUtils/buildReplacements.php");
include_once("buildUtils/buildC64Page.php");

include_once("buildUtils/buildHTML.php");


$GLOBALS["VARIABLEMAP"] = [];


// concatenate all the js files included with dev.html, 
// except ones that uglify cant handle
$index = file_get_contents(SRCDIR . "/index.html");

$exclude = [ "js/c64/wasm/c64.js", "js/nes/wasm/nes.js","js/nes/nes.js",  "js/c64/c64.js",  "acmeAssembler", "ca65Assembler", "storageManager.js",  "githubClient.js" ];

$searchString = 'src="js/';
$pos = strpos($index, $searchString);

$source = "";

while($pos !== false) {
  $pos += strlen($searchString);

  $endPos = strpos($index, '"', $pos);
  $pos -= 3;
  $filepath = SRCDIR . '/' . substr($index, $pos, $endPos - $pos);
  $include = true;
  foreach($exclude as $ex) {
    if(strpos($filepath, $ex) !== false) {
      $include = false;
    }
  }
  if($include) {
    $qpos = strpos($filepath, "?");
    if($qpos !== false) {
      $filepath = substr($filepath, 0, $qpos);
    }
    print $filepath . "\n";

    if(file_exists($filepath)) {
      $source .= file_get_contents($filepath) . "\n\n";

    } else {
      print "FILE NOT FOUND $filepath";
      exit();
    }
  } else {
    print "exclude $filepath!!!!!!!!\n";
  }
  $pos = strpos($index, $searchString, $pos);
}



buildC64Page();

$source = str_replace("{v}", VERSION, $source);

$source = replaceConstants($source, "buildUtils/constants.js");
$source = replaceVariables($source, $buildReplacements);

if(!file_exists(BUILDDIR . '/js')) {
  mkdir(BUILDDIR . '/js');
}

$fp = fopen(BUILDDIR . "/js/main.js", "w");
fwrite($fp, $source);
fclose($fp);

$cmd = "uglifyjs " . BUILDDIR . "/js/main.js --mangle --output " . BUILDDIR . "/js/main.js";

exec($cmd);

// collect all the libs together
$searchString = 'src="lib/';
$pos = strpos($index, $searchString);

$libsource = "";


while($pos !== false) {
  $pos += strlen($searchString);

  $endPos = strpos($index, '"', $pos);
  $pos -= 4;
  $filepath = SRCDIR . '/' . substr($index, $pos, $endPos - $pos);
  $include = true;
  foreach($exclude as $ex) {
    if(strpos($filepath, $ex) !== false) {
      $include = false;
    }
  }
  if($include) {
    $qpos = strpos($filepath, "?");
    if($qpos !== false) {
      $filepath = substr($filepath, 0, $qpos);
    }

    if(file_exists($filepath)) {
      $libsource .= file_get_contents($filepath) . "\n\n";

    } else {
      print "FILE NOT FOUND $filepath";
      exit();
    }
  }
  $pos = strpos($index, $searchString, $pos);
}
$libFp = fopen(BUILDDIR . "/js/libs.js", "w");
fwrite($libFp, $libsource);
fclose($libFp);

// collect all the css together
$searchString = 'href="css/';
$pos = strpos($index, $searchString);

$csssource = "";

$exclude = [];

while($pos !== false) {
  $pos += strlen($searchString);

  $endPos = strpos($index, '"', $pos);
  $pos -= 4;
  $filepath = SRCDIR . '/' . substr($index, $pos, $endPos - $pos);
  $include = true;
  foreach($exclude as $ex) {
    if(strpos($filepath, $ex) !== false) {
      $include = false;
    }
  }
  if($include) {
    $qpos = strpos($filepath, "?");
    if($qpos !== false) {
      $filepath = substr($filepath, 0, $qpos);
    }
    //print $filepath . "\n";

    if(file_exists($filepath)) {
      $csssource .= file_get_contents($filepath) . "\n\n";
print $filepath . "\n";
    } else {
      print "ffffFILE NOT FOUND $filepath";
      exit();
    }
  }
  $pos = strpos($index, $searchString, $pos);
}
$cssFp = fopen(BUILDDIR . "/css/style.css", "w");
fwrite($cssFp, $csssource);
fclose($cssFp);


copyWithReplace(SRCDIR . '/js/utils/storageManager.js', BUILDDIR . '/js/storageManager.js');
copyWithReplace(SRCDIR . '/js/file/githubClient.js', BUILDDIR . '/js/githubClient.js');
copy(SRCDIR . '/js/assembler/acmeAssembler.js', BUILDDIR . '/js/acmeAssembler.js');
copy(SRCDIR . '/js/assembler/ca65Assembler.js', BUILDDIR . '/js/ca65Assembler.js');

copy(SRCDIR . '/manifest.json', BUILDDIR . '/manifest.json');
//copy('index.html', 'c64/index.html');

copyIndex(SRCDIR . '/indexTemplate.html', BUILDDIR . '/index.html');
copyIndex(SRCDIR . '/indexTemplate.html', BUILDDIR . '/c64/index.html');

$c64Index = file_get_contents(BUILDDIR . '/c64/index.html');
$c64Index = str_replace('<head>', '<head>' . "\n" . '<base href="../">', $c64Index);
$c64Index = str_replace('<title>lvllvl</title>', '<title>C64</title>', $c64Index);
$c64Index = str_replace('Draw pictures using text characters', 'Commodore 64 Emulator in a Web Browser', $c64Index);
$c64Index = str_replace('https://lvllvl.com/images/logo-large.png', 'https://lvllvl.com/images/c64.png', $c64Index);
$c64Index = str_replace('https://lvllvl.com/images/logo32.png', 'https://lvllvl.com/images/c64logo32.png', $c64Index);
$c64Index = str_replace('https://lvllvl.com/images/logo16.png', 'https://lvllvl.com/images/c64logo16.png', $c64Index);

$fp = fopen(BUILDDIR . '/c64/index.html', "w");
fwrite($fp, $c64Index);
fclose($fp);

copy(SRCDIR . '/js/c64/c64.js', BUILDDIR . '/js/c64/c64.js');



recursive_copy(SRCDIR . '/palettes', BUILDDIR . '/palettes/');
recursive_copy(SRCDIR . '/charsets', BUILDDIR . '/charsets/');
recursive_copy(SRCDIR . '/vectorsets', BUILDDIR . '/vectorsets/');
recursive_copy(SRCDIR . '/icons', BUILDDIR . '/icons/');
recursive_copy(SRCDIR . '/css', BUILDDIR . '/css/');
recursive_copy(SRCDIR . '/cursors', BUILDDIR . '/cursors/');
recursive_copy(SRCDIR . '/fonts', BUILDDIR . '/fonts/');
recursive_copy(SRCDIR . '/images', BUILDDIR . '/images/');
recursive_copy(SRCDIR . '/c64page', BUILDDIR . '/c64page/');
recursive_copy(SRCDIR . '/c64', BUILDDIR . '/c64/');

$source = file_get_contents(SRCDIR . '/c64/c64/c64.js');
$source = str_replace("c64.wasm", "c64.wasm?v=" . VERSION, $source);
$fp = fopen(BUILDDIR . '/c64/c64/c64.js', "w");
fwrite($fp, $source);
fclose($fp);  

copy(SRCDIR . '/c64/c64/c64.wasm', BUILDDIR . '/js/c64/wasm/c64.wasm');
copy(SRCDIR . '/c64/c64/c64.wasm', BUILDDIR . '/c64page/js/c64.wasm');

$src = SRCDIR . "/c64page/index.html";
$dest = BUILDDIR . "/c64page/index.html";

$source = file_get_contents($src) . "\n\n";
$source = str_replace("{v}", VERSION, $source);

$fp = fopen($dest, "w");
fwrite($fp, $source);
fclose($fp);  


print("done\n");

*/