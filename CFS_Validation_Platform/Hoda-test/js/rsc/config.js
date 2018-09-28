var conf1= {
					
	ship_date_day: {
		minRange: 1,
		maxRange: 31		
	},	
	ship_date_month: {
		minRange: 1,
		maxRange: 12	
	},	
	numberOfShip: {
		minRange:1,
		maxRange:100000
	},	
	totShipValue: {
		minRange: 1
	},	
	ship_value: {
		minRange: 1
	},
	ship_weight: {
		minRange: 1
	},
	unna: {
		minlength:4,
		maxlength:4
	},	
	sctg: {
		minlength:5,
		maxlength:5	
	},	
	zipCode5: {
		minlength:5,
		maxlength:5
	},	
	city: {
		not_allowed: /(APO|FPO|DPO)/g
	},	
	state: {
		not_allowed: /(AA|AE|AP)/g,
		minlength:2,
		maxlength:2
	},	
	mode: {
		minlength:1,
		maxlength:3
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
	interval1:{
		minRange:1,
		maxRange:400
	},
	interval2:{
		minRange:401,
		maxRange:800
	},	
	interval3:{
		minRange:801,
		maxRange:1200
	},
	interval4:{
		minRange:1201,
		maxRange:3600
	},	
	interval5:{
		minRange:3601,
		maxRange:4800
	},
	interval6:{
		minRange:4801,
		maxRange:8000
	},	
	interval7:{
		minRange:8001,
		maxRange:80000
	},	
	interval8:{
		minRange:80000,
		maxRange:Infinity
	}	
};