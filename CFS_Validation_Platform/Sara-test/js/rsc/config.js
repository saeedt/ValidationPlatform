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
		minlength:2 ,
		maxlength:2
	},
	zipCode5: {
			minlength:5 ,
			maxlength:5	
	},
	zipCode4:{
		minlength:4 ,
		maxlength:4	
	},

	faxNum: {
		minlength: 10 ,
		maxlength: 10
	},
	phone_main: {
		minlength: 10 ,
		maxlength: 10
	},
	phone_extent: {
		minlength: 1 ,
		maxlength: 7
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
		minlength: 4,
		maxlength: 4	
	},
	numberOfShip: {
		minRange:100000
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
		maxRange:10,
	},
	requiredRatio:{
		maxRange:0.2,
	},
	
	requiredCase2:{
		minRange:10,
	},
	difReNos:{
		maxRange:1,	
	},
	tot_ship_week:{
		maxRange:100000,
	}

};

var ATV_MOS_case1={
	dif:{
		maxRange:1000000000
		},
	
	ratio1:{
		minRange: 0.2,
		MaxRange: 5
			}
			
	
};
var ATV_MOS_case2={
		dif:{
			maxRange:20000000,
			},
		estabWeight:{
			maxRange:5,
			},
		ratio1:{
			minRange: 0.1,
			maxRange: 10
				}	
	};