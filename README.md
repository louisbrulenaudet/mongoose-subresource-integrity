
# mongoose-subresource-integrity

Ultralight, non-dependent and minimalist open-source package to recursively generate **sha-384 subresource integrity hashes** and store them into [MongoDB](https://www.mongodb.com) schema with [Mongoose](https://www.npmjs.com/package/mongoose) to authenticate **.js** and **.css** files.

```js
const sri = require('mongoose-subresource-integrity');

sri.saveSubresourceIntegrityHash(
  "../../models/IntegritySchema",
  "./public/css"
);
```

Subresource Integrity or SRI is a [W3C recommendation](https://www.w3.org/TR/SRI/) to provide a method to protect website delivery from CDN-served malicious code.

To use SRI, a website author wishing to include a static resource can specify a cryptographic hash of the resource in addition to the location of the resource. Browsers fetching the resource can then compare the hash provided by the website author with the hash computed from the resource. If the hashes don't match, the resource is discarded.

```html
<script src="https://cdn.example.com/app.js"
        integrity="sha384-+/M6kredJcxdsqkczBUjMLvqyHb1K/JThDXWsBVxMEeZHEaMKEOEct339VItX1zB"
></script>
```

This package aims at automating the process of generating cryptographic hashes in order to facilitate their access through a call to the MongoDB database.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/louisbrulenaudet/mongoose-subresource-integrity/issues)
![npm version](https://img.shields.io/npm/v/mongoose-subresource-integrity)

## Features

- Focus on high performance
- Low memory usage
- Executable for generating applications quickly
- High availability for synchronization with CDN systems
- Simple deployment with one-line integration

## Tech Stack

**Server:** Node, Express, Mongoose

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/). Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file) and install [MongoDB](https://www.mongodb.org/downloads). Then:

```bash
  npm i mongoose-subresource-integrity 
```

## Importing

```js
// Using Node.js 'require()'
const sri = require('mongoose-subresource-integrity');

// Using ES6 imports
import saveSubresourceIntegrityHash from 'mongoose-subresource-integrity';
```

## Overview

### Connecting to MongoDB

First, we need to define a connection. If your app uses only one database, you should use `mongoose.connect` (`createConnection` take a `mongodb://` URI, or the parameters `host, database, port, options`).

```js
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/YOUR_DATABASE_NAME";

mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology:true
  }
);

const database = mongoose.connection;

database.on("error", console.error.bind(console, "connection error:"));

module.exports = database;
```

**Note:** _If the local connection fails then try using 127.0.0.1 instead of localhost. Sometimes issues may arise when the local hostname has been changed._

**Important!** Mongoose buffers all the commands until it's connected to the database. This means that you don't have to wait until it connects to MongoDB in order to define models, run queries, etc.

### Defining a Model for hashes storing

Models are defined through the `Schema` interface. We need a pairing system between the path and the hash of each file, defined as follows within the schema :

```js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const IntegritySchema = new Schema({
    filepath: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
        unique: true,
    }
});

IntegritySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
    }
});

const Integrity =  mongoose.model("integrity", IntegritySchema);

module.exports = Integrity;
```

Once we define a model through `mongoose.model('integrity', IntegritySchema)`, we can use it through the following function :
```js
sri.saveSubresourceIntegrityHash(
  "../../models/IntegritySchema",
  "./public/css"
);
````

Where the first argument is the path to the file describing the Mongoose schema, and the second is the one containing the set of subfolders and statics files to which we want to collect the hash for the Subresource Integrity checkin.
## Usage/Examples

```javascript
{
  "_id": {
    "$oid": "6308ca92d8424fda52e63eae"
  },
  "filepath": "public/css/index.css",
  "__v": 0,
  "hash": "sha384-ql4jKwyXlyERdFY59Fq4T+ILy2bHHIusVmm1UBuSl+ddrgTfN/kAlG7lbY2oo645"
}

```

## 🚀 About Me

My name is louis, student researcher in corporate taxation at Dauphine-PSL University and full-stack developer (NodeJS, MongoDB, Express, Front-End), specializing in French cryptocurrency law issues, SEO optimization and user experience improvement. 

## License

Copyright (c) 2022 Louis Brulé Naudet <contact@louisbrulenaudet.com>.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Feedback

If you have any feedback, please reach out to us at contact@louisbrulenaudet.com.

