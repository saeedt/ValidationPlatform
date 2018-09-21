var conf1= {
					
	ship_date_day: {
		required: /^0[1-9]|[12][0-9]|3[01]$/,
		minRange: 1,
		maxRange: 31		
	},	
	ship_date_month: {
		required: /^0[1-9]|1[012]$/,
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
	zip: {
		minlength:5
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
		maxlength:4
	},
	numeric:{
		allowed: /[^0-9+$]/g
	},
	alphabetic:{
		allowed: /[^A-Za-z+$ ]/g
	},
	alphanumeric:{
		allowed: /[^0-9a-zA-Z+$,():;<>[\ ]]/g,
		required: /^(0[1-9]|1[012])[\/](0[1-9]|[12][0-9]|3[01])[\/][0-9]{4}$/g
	}
}