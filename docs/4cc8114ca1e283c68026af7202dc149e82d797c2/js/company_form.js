//Global variables
var inputData = [];

//binding the event listener to the file picker button
$(document).ready(function(e) {
	document.getElementById('submit').addEventListener('click', readform, false);
});

//file reader based on papaparse when the file picker is clicked
function readform () {    
	var result = new Object();
	//Item A	
	result.shipping_comapny_name_1 = $("input[type=text][name=a_cn1]").val();
	result.shipping_comapny_name_2 = $("input[type=text][name=a_cn2]").val();
	result.shipping_address = $("input[type=text][name=a_add]").val();
	result.shipping_city = $("input[type=text][name=a_city]").val();
	result.shipping_state = $("select[name=a_state]").val();
	result.shipping_zip5 = $("input[type=text][name=a_zip1]").val();
	result.shipping_zip4 = $("input[type=text][name=a_zip2]").val();
	//Item B	
	result.Mailing_comapny_name_1 = $("input[type=text][name=b_cn1]").val();
	result.Mailing_comapny_name_2 = $("input[type=text][name=b_cn2]").val();
	result.Mailing_attention = $("input[type=text][name=b_att]").val();
	result.Mailing_address = $("input[type=text][name=b_add]").val();
	result.Mailing_city = $("input[type=text][name=b_city]").val();
	result.Mailing_state = $("select[name=b_state]").val();
	result.Mailing_zip5 = $("input[type=text][name=b_zip1]").val();
	result.Mailing_zip4 = $("input[type=text][name=b_zip2]").val();
	//Item C
	result.status_inoperation = $("input[type=radio][name=c_status]:checked").val();	
	result.status_ceased_month = $("input[type=text][name=c_co_month]").val();
	result.status_ceased_day = $("input[type=text][name=c_co_day]").val();
	result.status_ceased_year = $("input[type=text][name=c_co_year]").val();
	//Item D
	result.shipment_number = $("input[type=text][name=d_no_shipments]").val();
	result.shipment_value = $("input[type=text][name=d_val_shipments]").val();
	console.log(result);
 }
