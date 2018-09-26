var conf1= {
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
	state: {
		minlenght:2 ,
		maxlenght:2
	},
	zipCode5: {
			minlenght:5 ,
			maxlenght:5	
	},
	zipCode4:{
		minlenght:4 ,
		maxlenght:4	
	},

	faxNum: {
		minlenght: 10 ,
		maxlenght: 10
	},
	phone: {
		minlenght: 10 ,
		maxlenght: 17
	},
	hour:{
		maxRange: 8,
	},
	
	ship_date_day: {
		
		minRange: 1,
		maxRange: 31		
	},	
	ship_date_month: {
	
		minRange: 1,
		maxRange: 12	
	},	
	ship_date_year: {
		minlenght: 4,
		maxlenght: 4	
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
		
		minlenght:4,
		maxlenght:4
	},	
	sctg: {
		minlenght:5,
		maxlenght:5	
	},
	interval1:{
		minRange:41,
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