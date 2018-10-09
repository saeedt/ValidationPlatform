var conf1= {
	mode: {
		minlength:1,
		maxlength:3
	},
	email: {
		allowed: /[^a-zA-Z0-9!@#$%&'*+-/=?^_`{|}~.]/g,
		not_allowed: /[(),:;<>[\]]/g,
		required: /^.+@{1}.+[.].+$/
	},		
	shippingAddress: {
		not_allowed: /([P_O_]|[P.O_]|[P..B]|[P.O_]|[P.O.]|[PO_B]|[PO_D]|[POB_]|POST)/g
	},
	numeric:{
		allowed: /[^0-9+$]/g
	}, 
	alphabetic:{
		allowed: /[^A-Za-z+$]/g
	},
	alphanumeric:{
		allowed: /[^0-9a-zA-Z+$,():;<>[\ ]]/g
	},	
	city: {
		not_allowed: /(APO|FPO|DPO)/g
	},	
	state: {
		not_allowed: /(AA|AE|AP)/g,
		minlength:2,
		maxlength:2
	},
	zipCode5: {
		minlength:5,
		maxlength:5		
	},
	zipCode4:{
		minlength:4,
		maxlength:4	
	},
	faxNum: {
		minlength:10,
		maxlength:10
	},
	phone: {
		minlength:10,
		maxlength:17
	},
	hour:{
		maxRange:8,
	},
	ship_date_day: {	
		minRange:1,
		maxRange:31		
	},	
	ship_date_month: {	
		minRange:1,
		maxRange:12	
	},	
	ship_date_year: {
		minlength:4,
		maxlength:4	
	},
	numberOfShip: {
		minRange:1,
		maxRange:100000
	},	
	totShipValue: {
		minRange:1
	},	
	ship_value: {
		minRange:1
	},
	ship_weight_c1: {
		minRange:0
	},
	ship_weight_c2: {
		minRange:100
	},
	sctg_m1_weight: {
		maxRange:150
	},
	sctg_m8_weight: {
		maxRange:1000
	},
	unna: {			
		minlength:4,
		maxlength:4,
		minRange:0004,
		maxRange:9269
	},	
	sctg: {
		minlength:5,
		maxlength:5,
		minRange:01001,
		maxRange:43999
	},
	ATV: {
		minRange:0
	},
	ATV_c1: { 
		maxRange:1000000000
	},
	ATV_c2: {
		minRange:0.2,
		maxRange:5
	},
	ATV_c3: { 
		maxRange:20000000
	},
	ATV_c4: {
		minRange:0.1,
		maxRange:10
	},
	estbWeight: {
		maxRange:5
	},
	interval1:{
		minRange:1,
		maxRange:400,
		sample_rate:40
	},
	interval2:{
		minRange:401,
		maxRange:800,
		sample_rate:200
	},	
	interval3:{
		minRange:801,
		maxRange:1200,
		sample_rate:600
	},
	interval4:{
		minRange:1201,
		maxRange:3600,
		sample_rate:600
	},	
	interval5:{
		minRange:3601,
		maxRange:4800,
		sample_rate:1600
	},
	interval6:{
		minRange:4801,
		maxRange:8000,
		sample_rate:1600
	},	
	interval7:{
		minRange:8001,
		maxRange:80000,
		sample_rate:4000
	},	
	interval8:{
		minRange:80000,
		maxRange:Infinity,
		sample_rate:8000
	},
	requiredCase1:{
 		minRange:10,
 		maxRange:Infinity
 	},
 	requiredRatio:{
 		minRange:0.2,
 		maxRange:1
 	},
 	requiredCase2:{
 		minRange:0,
 		maxRange:11
 	},
 	difReNos:{
 		minRange:1,
 		maxRange:Infinity
 	},
 	ship_reported:{
 		minRange:1,
 		maxRange:Infinity
 	}
};