const spawn = require('child_process').spawn;
const fs = require('fs');
function resize(req, resp) {
    const args = [
        "-", // use stdin
        "-resize", "640x", // resize width to 640
        "-resize", "x360<", // resize height if it's smaller than 360
        "-gravity", "center", // sets the offset to the center
        "-crop", "640x360+0+0", // crop
        "-" // output to stdout
    ];
    const streamIn = fs.createReadStream('./image_for_demo.png');
    const proc = spawn('convert', args);
    streamIn.pipe(proc.stdin);
    proc.stdout.pipe(resp);
}