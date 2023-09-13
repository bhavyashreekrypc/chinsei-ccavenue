var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postRes = function(request,response){
    var ccavEncResponse='',
	ccavResponse='',	
	workingKey = 'F9C0322137F2DC1C3D41D7BF4B2C1ED0',	//Put in the 32-Bit key provided by CCAvenues.
	ccavPOST = '';
	
        request.on('data', function (data) {
			console.log(data);
	    ccavEncResponse += data;
	    ccavPOST =  qs.parse(ccavEncResponse);
	    var encryption = ccavPOST.encResp;
	    ccavResponse = ccav.decrypt(encryption,workingKey);
		console.log(ccavResponse);
        });

	request.on('end', function () {
	    var pData = '';
	    pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'	
	    pData = pData + ccavResponse.replace(/=/gi,'</td><td>')
	    pData = pData.replace(/&/gi,'</td></tr><tr><td>')
	    pData = pData + '</td></tr></table>'
		console.log(pData)
            htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>'+ pData +'</center><br></body></html>';
            response.writeHeader(200, {"Content-Type": "text/html"});
	    response.write(htmlcode);
	    response.end();
	}); 	
};
