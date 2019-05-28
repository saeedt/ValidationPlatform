var shipment;
var company;
var cfile_ok;
var log_e = [];
var log_s = [];
//binding the event listener to the file picker button
$(document).ready(function(e) {
	'use strict';
	;( function( $, window, document, undefined ) {
				$( '.inputfile' ).each( function() {
					var $input	 = $( this ),
						$label	 = $input.next( 'label' ),
						labelVal = $label.html();
					$input.on( 'change', function( e ) {
						var fileName = '';
						if( e.target.value )
							fileName = e.target.value.split( '\\' ).pop();
						if( fileName )
							$label.find( 'span' ).html( fileName );
						else
							$label.html( labelVal );
					});
					// Firefox bug fix
					$input
					.on( 'focus', function(){ $input.addClass( 'has-focus' ); })
					.on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
				});
			})( jQuery, window, document );
	document.getElementById('cfile').addEventListener('change', readFile_e, false);
	document.getElementById('sfile').addEventListener('change', readFile_s, false);
	document.getElementById("submit-s").style.display  = 'none';
	document.getElementById("submit-e").style.display  = 'none';
	document.getElementById("estTable").style.display  = 'none';
	document.getElementById("t1").style.display  = 'none';
	document.getElementById("shipTable").style.display  = 'none';
	document.getElementById("t2").style.display  = 'none';
	/*$( "#tabs" ).tabs();*/
	/*document.getElementById("dl-report").disabled = true;
	document.getElementById("submit-s").onclick = process_shp;
	document.getElementById("submit-e").onclick = process_est;
	document.getElementById("dl-report").onclick = download_report;*/
});
//load the shipment data file
function readFile_s (evt) {
    var file = evt.target.files[0];      
    Papa.parse(file, {    	
    		delimiter: ",",
    		newline: "",	// auto-detect
    		quoteChar: '"',
    		escapeChar: '"',
    		header: true, //store in array - 
    		trimHeader: true,
    		dynamicTyping: false,
    		preview: 0,
    		encoding: "",
    		worker: false,
    		comments: false,
    		step: undefined,
    		complete: function(result) {
	    		shipment = result.data;	    		
	    		var html = [];
	    		try {
	    	    	$( '#sfiledetails' ).accordion( "destroy" );
	    	    	} catch(e){}
	    	    $("#sfiledetails").empty(); 
	    		if (result.errors.length>0){
	    			var errors = [];
	    			for (var i=0; i<result.errors.length;i++){
	    				errors.push('row:'+result.errors[i].row+
	    				' index:'+result.errors[i].index+' '+result.errors[i].type+
	    				':'+result.errors[i].message);
	    			}
	    			html.push('<h2>Errors</h2><div>'+ errors.join("<br/>")+'</div>');	
	    		} else {	    			
	    			html.push('<h2>Attributes</h2><div>'+ result.meta.fields.join("<br/>")+'</div>');	    			
	    			document.getElementById("submit-s").style.display  = 'inline-block';
	    			document.getElementById("submit-s").onclick = process_shp;
	    		}
	    		$('#sfiledetails').append(html.join(''));
	        	collapse_e('sfiledetails');
    		},
    		error: undefined,
    		download: false,
    		skipEmptyLines: true,
    		chunk: undefined,
    		fastMode: undefined,
    		beforeFirstChunk: undefined,
    		withCredentials: undefined   		
    });
 }
//load the establishment file
function readFile_e (evt) {
    var file = evt.target.files[0];
    var fr = new FileReader();
    fr.onload = function () {
    	var result;
    	cfile_ok = false;
    	var html = [];
    	var log_e = [];
    	try {
    	$( '#cfiledetails' ).accordion( "destroy" );
    	} catch(e){}
    	//document.getElementById("cfiledetails").style.display  = "block";
    	$('#cfiledetails').empty();
    	try {
    		result = JSON.parse(fr.result);
    		company = result;
    		var keys = [];
    		for (var i in result){
    			keys.push(i);
    		}
    		html.push('<h2>Attributes</h2><div>'+keys.join("<br/>")+'</div>');
    		cfile_ok = true;    		
    	} catch(e) {
    		html.push('<h2>Errors</h2><div>'+e+'</div>');
    		cfile_ok = false;
    	}    	
    	$('#cfiledetails').append(html.join(''));
    	collapse_e('cfiledetails');
    	if (cfile_ok){			
			document.getElementById("submit-e").style.display  = 'inline-block';
    		document.getElementById("submit-e").onclick = process_est;
		}    	
	};
    fr.readAsText(file);        
 }
//process the establishment file
function process_est(){
	var cresult = verify_est(company);	
	var pass = true;	
	document.getElementById("estTable").style.display  = 'block';
	document.getElementById("t1").style.display  = 'block';
	document.getElementById("submit-e").style.display  = 'none';
	collapse_c('cfiledetails');
	$( "#tabs" ).tabs();
	$("#tabs").tabs("option", "active", 0);
	$('#estTable').DataTable().destroy();
	$('#estTable').empty();		
	/*$('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
	        $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
	    } );*/	
	/*document.getElementById("tabs-1").dispatchEvent(new Event("click"));*/
    $('#estTable').DataTable( {
        data: cresult,	        
        scrollCollapse: true,
        paging: true,
        autoWidth: true,
        ordering: true,
        select: true,
        dom: 'Blfrtip',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],       
        "columnDefs": [
            { "title": "Flag",   "targets": 0 ,  "data": "flag"},
            { "title": "Value",  "targets": 1 , "data": "flagval"},
            { "title": "Flag Name", "targets": 2, "data":"flagname" },
            { "title": "Description",  "targets": 3 , "data": "flagmsg"}]        
    } );	
    //$('#estTable').DataTable().columns.adjust().draw();
}
//process the shipment file
function process_shp(){
	var cresult = verify_shipment(shipment);
	var pass = true;
	document.getElementById("shipTable").style.display  = 'block';
	document.getElementById("t2").style.display  = 'block';
	document.getElementById("submit-s").style.display  = 'none';	
	collapse_c('sfiledetails');
	$( "#tabs" ).tabs();
	$("#tabs").tabs("option", "active", 1);
	$('#shipTable').DataTable().destroy();
	$('#shipTable').empty();
	/*$('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
	        $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
	    } );*/
	//document.getElementById("tabs-2").dispatchEvent(new Event("click"));
	$('#shipTable').DataTable( {
	        data: cresult,	        
	        scrollCollapse: true,
	        paging: true,
	        autoWidth: true,
	        ordering: true,
	        select: true,
	        dom: 'Blfrtip',
	        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
	        buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
	        "columnDefs": [
	        	{ "title": "Line#",   "targets": 0 ,  "data": "line"},
	            { "title": "Flag",   "targets": 1 ,  "data": "flag"},
	            { "title": "Value",  "targets": 2 , "data": "flagval"},
	            { "title": "Flag Name", "targets": 3, "data":"flagname" },
	            { "title": "Description",  "targets": 4 , "data": "flagmsg"}]	        
	    } );	
}

/*function collapse(obj){
	obj.addEventListener("click", function() {
	    //this.classList.toggle("active");
	    var content = obj.getElementsByTagName('div')[0];
	    if (content.style.display === "block") {
	    	content.style.display = "none";
	    } else {
	      content.style.display = "block";
	    }
	  });
	obj.dispatchEvent(new Event("click"));
	//obj.dispatchEvent(new Event("click"));
}*/

function collapse_e(obj){
  var ref = document.getElementById(obj);
  $( function() {
	  $(ref).accordion({
		  header: 'h2',
		  icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" },
	      collapsible: true
	    });
	  });
}
function collapse_c(obj){
	var ref = document.getElementById(obj);
	var handle = ref.getElementsByTagName('h2')[0];
	//var active = $(handle).hasClass('ui-state-active')
	//var active = $(ref).accordion( "option", "active" );
	//console.log(active);
	//console.log(content["id"]);
	if ($(handle).hasClass('ui-state-active')){
		handle.dispatchEvent(new Event("click"));
	}
}
function download_report(){
	var output = log_e.concat(log_s);
	var a         = document.createElement('a');
	a.href        = 'data:attachment/txt,' + encodeURIComponent(output.join(''));
	a.target      = '_blank';
	a.download    = 'Report.txt';
	document.body.appendChild(a);
	a.click();
}
