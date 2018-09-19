var conf1= {
	email: {
		allowed: /[^a-zA-Z0-9!@#$%&'*+-/=?^_`{|}~.]/g,
		not_allowed: /[(),:;<>[\]]/g,
		required: /^.+@{1}.+[.].+$/
	},
	shippingAddress: {
		allowed: /[^a-zA-Z0-9 _.-]/g,
		not_allowed: /([P_O_]|[P.O_]|[P..B]|[P.O_]|[P.O.]|[PO_B]|[PO_D]|[POB_]|POST)/g,
		required: /^.*/
	},
	numeric:{
		allowed: /[^0-9+$]/g,
		not_allowed: /^.*/,
		required:/^.*/
	},
	alphabetic:{
		allowed: /[^A-Za-z+$ ]/g,
		not_allowed: /^.*/,
		required:/^.*/
	},
	alphanumeric:{
		allowed: /[^0-9a-zA-Z+$,():;<>[\ ]]/g,
		not_allowed: /^.*/,
		required:/^.*/
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
	dateOfCeased:{
			allowed:/[^0-9/\ ]/g, 
			//required: /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g
			required:/^(0[1-9]|1[012])[\/](0[1-9]|[12][0-9]|3[01])[\/][0-9]{4}$/g
	},
	phone:{
		allowed: /[^0-9 - $]/g,
		//Required:
	},
	faxNum: {
		allowed: /[^0-9-$]/g,
		required:/^[0-9]{3}[-][0-9]{3}[-][0-9]{4}$/g,
		minlenght: 12 ,
		maxlenght: 12
	},
	
	hour:{
		maxRange: 8,
	},
	ship_ID: {
		allowed: /[^a-zA-Z0-9]/g,
		not_allowed: /^.*/,
		required: /^.*/	
	},		
	email: {
		allowed: /[^a-zA-Z0-9!@#$%&'*+-/=?^_`{|}~.]/g,
		not_allowed: /[(),:;<>[\]]/g,
		required: /^.+@{1}.+[.].+$/
	},	
	ship_date_day: {
		allowed: /[0-9]/g,
		not_allowed: /^.*/,
		required: /^.*/,
		minRange: 1,
		maxRange: 31		
	},	
	ship_date_month: {
		allowed: /[0-9]/g,
		not_allowed: /^.*/,
		required: /^.*/,
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
		allowed: /[0-9]/g,
		not_allowed: /^.*/,
		required: /^.*/,
		minRange:4,
		maxRange:4
	},	
	sctg: {
		allowed: /[0-9]/g,
		not_allowed: /^.*/,
		required: /^\d{5}$/,
		minRange:5,
		maxRange:5	
	},	
	zip: {
		allowed: /[0-9]/g,
		not_allowed: /^.*/,
		required: /^.*/,
		minRange:5,
		maxRange:10	
	},	
	city: {
		allowed: /[A-Za-z]/g,
		not_allowed: /(APO|FPO|DPO)/g,
		required: /^.*/
	},	
	state: {
		allowed: /[A-Za-z]/g,
		not_allowed: /(AA|AE|AP)/g,
		required: /^.*/,
		minRange:2,
		maxRange:2
	},	
	country: {
		allowed: /[A-Za-z]/g,
		not_allowed: /^.*/,
		required: /^.*/
	},
	mode: {
		allowed: /[0-9]/g,
		not_allowed: /^.*/,
		required: /^.*/,
		minRange:1,
		maxRange:4
	},
	numeric:{
		allowed: /[^0-9+$]/g,
		not_allowed: /^.*/,
		required:/^.*/
	},
	alphabetic:{
		allowed: /[^A-Za-z+$ ]/g,
		not_allowed: /^.*/,
		required:/^.*/
	},
	alphanumeric:{
		allowed: /[^0-9a-zA-Z+$]/g,
		not_allowed: /^.*/,
		required:/^.*/
	}
};