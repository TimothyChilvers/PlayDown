var http = require('http');
var toMarkdown = require('to-markdown');
var playground = require('playground');
var fileSystem = require('fs');
var path = require('path');
var md5 = require('MD5');
var cheerio = require('cheerio');
var AdmZip = require('adm-zip');
 
http.createServer(function (req, res) {
	
  if (req.method == 'POST') {
  	console.log("[200] " + req.method + " to " + req.url);
	var postBody = "";
	
	req.on('data', function(chunk) {
		console.log("Received body data:");
		console.log(chunk.toString());
		postBody = postBody + chunk.toString();
	});

	req.on('end', function() {
	// empty 200 OK response for now
		
		postBody = JSON.parse(postBody);
		
		var URLHash = md5(postBody.URL);
	    console.log("Ended POST");
		console.log("URL Hash " + URLHash);

	    var filePath = path.join(__dirname, URLHash + ".zip");
		if (fileSystem.existsSync(filePath) == false) {	
			console.log("Downloading " + postBody.URL);	
			var htmlReq = http.get(postBody.URL, function(htmlResponse) {

			  var webBodyChunks = [];
			  htmlResponse.on('data', function(chunk) {
				  webBodyChunks.push(chunk);				  
			  }).on('end', function() {
				var webBody = Buffer.concat(webBodyChunks);
				var markDown = toMarkdown(webBody.toString('utf8'));

				fileSystem.writeFile(path.join(__dirname, URLHash + ".md"),markDown, function(err) {
				    if(err) {
				        return console.log(err);
				    }

				    console.log("The file was saved!");
				}); 

	            var $ = cheerio.load(webBody);
			    var title = $("title").text();
				console.log("Downloaded " + title);
				
				var playOptions = {name : URLHash, outputDirectory : __dirname};
				playground.createFromString(markDown, playOptions);
				console.log("Created playground. Zipping.");
				
			    var zip = new AdmZip();
			    zip.addLocalFolder(path.join(__dirname, URLHash + ".playground"));
				console.log("Zipping...");
			    zip.writeZip(filePath);
				
				console.log("Zipped");
				
				respond(res,filePath);
			  })
			});
		} else {
			respond(res,filePath);
		}
		
	});
  } else {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end('Hello World\n');  	
  }
  
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

function respond(response, filePath) {
	
    var stat = fileSystem.statSync(filePath);
	
    response.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Length': stat.size
    });
	console.log("Responding with " + filePath);
	
    var readStream = fileSystem.createReadStream(filePath);
	console.log("Piping");
	readStream.on('error', function(error) {
		console.log("Error piping " + error);
	})
    readStream.pipe(response);
}