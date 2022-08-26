var fs = require("fs");
const path = require("path");
var crypto = require("crypto");

function isNotBackgroundFile(file) {
  if(path.extname(file) === ".css" || path.extname(file) === ".js") {
    return true;
  }
  else {
    return false;
  };
};

function generate384(absolute) {
  var buffer = fs.readFileSync(absolute);
  var body = buffer.toString();
  const enc = "utf8";

  var hash = crypto.createHash("sha384").update(body, enc);
  var sha  = hash.digest("base64");

  return "sha384-" + sha;
};

function saveSubresourceIntegrityHash(integritySchema, staticFilepath) {
  const Integrity = require(integritySchema);
  const filesInDirectory = fs.readdirSync(staticFilepath);

  for (const file of filesInDirectory) {
    const absoluteFilepath = path.join(staticFilepath, file);

    if (fs.statSync(absoluteFilepath).isDirectory()) {
      saveSubresourceIntegrityHash(integritySchema, absoluteFilepath);
    }
    else if (isNotBackgroundFile(file)) {
      var query = {"filepath": absoluteFilepath};
      var newHash =  {
        "filepath": absoluteFilepath,
        "hash": generate384(absoluteFilepath)
      };

      Integrity.findOneAndUpdate(query, newHash, {upsert: true}, function(err, doc) {
        if (err) {
           console.log(err);
        };
      });
    };
  };
};

module.exports = {saveSubresourceIntegrityHash};
