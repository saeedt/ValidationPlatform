var shp = {
		1: {
			name: 'Shipment_ID',
			keys: ['ship','shp','num','key','id','unique','identification','cargo','package','product','consignment'],
			required: false,
			hint: 'Your	shipment ID	number.'
		},
		2: {
			name: 'Ship_Month',
			keys: ['ship','shp','month','delivery'],
			required: true,
			hint: 'Month for the shipment date.'
		},
		3: {
			name: 'Ship_Day',
			keys: ['ship','shp','day','delivery'],
			required: true,
			hint: 'Day for the shipment date.'
		},
		4: {
			name: 'Shipment_Value',
			keys: ['ship','shp','val','order','amount','cost','rate','price','merchandise','consignment','package','parcel'],
			required: true,
			hint: 'Shipment value excluding freight charges	and excise taxes)in whole dollars. Estimates acceptable.'
		},
		5: {
			name: 'Shipment_Weight',
			keys: ['ship','shp','weight','wgt','tonnage','order','product','merchandise','consignment','package','parcel','gross','cargo','inbound','outbound','commodity','freight'],
			required: true,
			hint: 'Net shipment	weight in pounds. Estimates	acceptable.'
		},
		6: {
			name: 'SCTG_Commodity_Code',
			keys: ['sctg','commodity','code'],
			required: true,
			hint: 'SCTG	commodity code from	the accompanying booklet. For shipments consisting of more than one commodity, report the code	and description of the commodity that contributed the greatest weight of the shipment.'
		},
		7: {
			name: 'Commodity_Description',
			keys: ['commodity','desc','product','ship','consignment','cargo'],
			required: true,
			hint: 'Commodity Description. For shipments consisting of more than one commodity, report the code	and description of the commodity that contributed the greatest weight of the shipment.'
		},
		8: {
			name: 'Temp_Control_YN',
			keys: ['temp','control','ctrl'],
			required: true,
			hint: 'Is the item being shipped temperature controlled? (Y/N)'
		},
		9: {
			name: 'HAZMAT_Code',
			keys: ['hazmat','code','hazardous','material','dangerous','control','ctrl'],
			required: true,
			hint: 'Is item being shipped a hazardous material?	Enter "UN" or "NA" number.'
		},
		10: {
			name: 'Domestic_City_Name',
			keys: ['city','name','domestic','town'],
			required: true,
			hint: 'U.S. destination or U.S. exit port city for the shipment.'
		},
		11: {
			name: 'Domestic_State_Abbrev',
			keys: ['State','domestic','abbr','name'],
			required: true,
			hint: 'U.S. destination or U.S. exit port state for the shipment.'
		},
		12: {
			name: 'Domestic_ZIP_Code',
			keys: ['zip','code','domestic','post'],
			required: true,
			hint: 'U.S. destination or U.S. exit port ZIP code for the shipment.'
		},
		13: {
			name: 'Domestic_Transport_Mode',
			keys: ['mode','freight','domestic','transport','tsp'],
			required: true,
			hint: 'Mode(s) of transport to U.S. destination. Enter all that	apply in order used: 1-Parcel delivery, courier, or U.S. Parcel Post; 2-Company-owned truck; 3-For-hire truck;	4-Railroad;	5-Inland water;	6-Deep sea;	7-Pipeline;	8-Air; 9-Other mode; 0-Unknown'
		},
		14: {
			name: 'Export_YN',
			keys: ['export','yn'],
			required: true,
			hint: 'Is the item exported? (Y/N)'
		},
		15: {
			name: 'Export_City',
			keys: ['export','city','name','town'],
			required: true,
			hint: 'Foreign destination city for export shipments only.'
				},
		16: {
			name: 'Export_Country',
			keys: ['export','country','name'],
			required: true,
			hint: 'Foreign destination country for export shipments only.'
		},
		17: {
			name: 'Export_Transport_Mode',
			keys: ['export','transport','mode','transit','tsp'],
			required: true,
			hint: 'Mode(s) of transport to the foreign destination. Enter all that apply in order used: 1-Parcel delivery, courier, or U.S. Parcel Post; 2-Company-owned truck; 3-For-hire truck;	4-Railroad;	5-Inland water;	6-Deep sea;	7-Pipeline;	8-Air; 9-Other mode; 0-Unknown'
				}	
}
var est = {
		1: {
			name: 'Establishment_ID',
			keys: ['est','company','id'],
			required: false,
			hint: 'Establishment unique identifier.'
		},
		2: {
			name: 'Shipping_Company_Name_1',
			keys: ['ship','shp','company','name','1'],
			required: true,
			hint: 'Name of the company for which the shipping address is provided.'
		},
		3: {
			name: 'Shipping_Company_Name_2',
			keys: ['ship','shp','company','name','2'],
			required: false,
			hint: 'Name of the company for which the shipping address is provided.'
		},
		4: {
			name: 'Shipping_Address',
			keys: ['ship','shp','add'],
			required: true,
			hint: 'The address from where your shipments originate.'
		},
		5: {
			name: 'Shipping_City',
			keys: ['ship','shp','city','town'],
			required: true,
			hint: 'Shipping address city.'
		},		
		6: {
			name: 'Shipping_State',
			keys: ['ship','shp','state'],
			required: true,
			hint: 'Shipping address state.'
		},
		7: {
			name: 'Shipping_Zip5',
			keys: ['ship','shp','zip','5','dig'],
			required: true,
			hint: 'Shipping address 5 digit zip code.'
		},
		8: {
			name: 'Shipping_Zip4',
			keys: ['ship','shp','zip','4','dig'],
			required: false,
			hint: 'Shipping address 4 digit zip code extension.'
		},		
		9: {
			name: 'Mailing_Company_Name_1',
			keys: ['mail','company','name','1'],
			required: false,
			hint: 'Name of the company for which the mailing address is provided.'
		},
		10: {
			name: 'Mailing_Company_Name_2',
			keys: ['mail','company','name','2'],
			required: false,
			hint: 'Name of the company for which the mailing address is provided.'
		},
		11: {
			name: 'Mailing_Attention',
			keys: ['mail','attention','attn'],
			required: false,
			hint: 'A person, division, or department recieveing the CFS corrsepondance.'
		},		
		12: {
			name: 'Mailing_Address',
			keys: ['mail','add'],
			required: true,
			hint: 'The address to which all CFS correspondence is sent to.'
		},		
		13: {
			name: 'Mailing_City',
			keys: ['mail','city','town'],
			required: true,
			hint: 'Mailing address city.'
		},		
		14: {
			name: 'Mailing_State',
			keys: ['mail','state'],
			required: true,
			hint: 'Mailing address state.'
		},		
		15: {
			name: 'Mailing_Zip5',
			keys: ['mail','zip','5','dig'],
			required: true,
			hint: 'Mailing address 5 digit zip code.'
		},
		16: {
			name: 'Mailing_Zip4',
			keys: ['mail','zip','4','dig'],
			required: false,
			hint: 'Mailing address 4 digit zip code extension.'
		},
		17: {
			name: 'Operating_Status',
			keys: ['stat','opr','operat'],
			required: true,
			hint: 'The operating status for the specified location and reporting period: in_operation, inactive, ceased_operation.'
		},
		18: {
			name: 'Status_Ceased_Day',
			keys: ['stat','cease','day'],
			required: false,
			hint: 'Two digit day for the date ceased operation.'
		},
		19: {
			name: 'Status_Ceased_Month',
			keys: ['stat','cease','month'],
			required: false,
			hint: 'Two digit month for the date ceased operation.'
		},
		20: {
			name: 'Status_Ceased_Year',
			keys: ['stat','cease','year','yr'],
			required: false,
			hint: 'Four digit year for the date ceased operation.'
		},		
		21: {
			name: 'Shipment_Number',
			keys: ['ship','num','total','merchandise','consignment','package','parcel'],
			required: true,
			hint: 'Total number of outbound shipments for the specified location and reporting period.'
		},
		22: {
			name: 'Shipment_Value',
			keys: ['ship','shp','val','total','amount','cost','rate','price','merchandise','consignment','package','parcel'],
			required: true,
			hint: 'Total dollar value of outbound shipments for the specified location and reporting period, excluding freight charges and excise taxes.'
		}		
	};