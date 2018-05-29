$(document).ready(function(e) {
	document.getElementById('file').addEventListener('change', readFile, false);
});

function readFile (evt) {
    var files = evt.target.files;
    var file = files[0]; 
    Papa.parse(file, {
    	complete: function(results) {
    		console.log(results);
    	}
    });
 }

