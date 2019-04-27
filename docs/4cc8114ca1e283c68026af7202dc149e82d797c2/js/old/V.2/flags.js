//Edit flags for shipment attributes
var flags = {
	S1_1: {
		flag: "S1",
		value: "1",
		name: "overseas_military_zip",
		msg: "U.S. destination (zip) contains overseas millitary address."
	},	
	S1_2: {
		flag: "S1",
		value: "2",
		name: "inv_zip_state",
		msg: "U.S. destination state/zip combination is invalid."
	},
	S2_1: {
		flag: "S2",
		value: "1",
		name: "miss_mode",
		msg: "Mode of transport is missing."
	},
	S2_2: {
		flag: "S2",
		value: "2",
		name: "nonNumeric_mode",
		msg: "Mode of transport is not numeric."
	},
	S2_3: {
		flag: "S2",
		value: "3",
		name: "inv_mode",
		msg: "Mode of transport contains a numeric entry but is not a valid mode including multi-mode."
	},
	S3_1: {
		flag: "S3",
		value: "1",
		name: "miss_sctg",
		msg: "SCTG commodity code is missing."
	},
	S3_2: {
		flag: "S3",
		value: "2",
		name: "notFound_sctg",
		msg: "SCTG commodity code is invalid."
	},	
	S3_3: {
		flag: "S3",
		value: "3",
		name: "16xxx_sctg",
		msg: "SCTG commodity code is invalid."
	},	
	S4_1: {
		flag: "S4",
		value: "1",
		name: "inv_sctg_mode7",
		msg: "SCTG commodity code is invalid for mode includes pipeline (7)."
	},
	S4_2: {
		flag: "S4",
		value: "2",
		name: "inv_sctg_mode1_weight_state",
		msg: "SCTG commodity code is invalid for mode includes parcel (1), shipment weight and state provided."		
	},
	S4_3: {
		flag: "S4",
		value: "3",
		name: "inv_sctg_mode8_weight_state",
		msg: "SCTG commodity code is invalid for mode includes air (8), shipment weight and state provided."
	},
	S5_1: {
		flag: "S5",
		value: "1",
		name: "miss_ship_value",
		msg: "Shipment value is missing."
	},
	S5_2: {
		flag: "S5",
		value: "2",
		name: "nonPositive_ship_value",
		msg: "Shipment value is invalid. The value must be greater than zero."
	},
	S6_1: {
		flag: "S6",
		value: "1",
		name: "miss_ship_weight",
		msg: "Shipment weight is missing."
	},
	S6_2: {
		flag: "S6",
		value: "2",
		name: "nonPositive_ship_weight",
		msg: "Shipment weight is invalid. The value must be greater than zero."
	},
	S7_1: {
		flag: "S7",
		value: "1",
		name: "maxWeight_threshold_mode",
		msg: "Shipment weight exceeds maximum weight for modes 1, 2, 3, 8, 12, 13, 18, 21, 31 and 81."
	},
	S7_2: {
		flag: "S7",
		value: "2",
		name: "minWeight_threshold_mode",
		msg: "Shipment weight is less than minimum weight for modes 4, 5 and 6."
	},
	S8_1: {
		flag: "S8",
		value: "1",
		name: "vw_sctg_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG commodity codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
	},
	S8_2: {
		flag: "S8",
		value: "2",
		name: "vw_sctg_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG commodity codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
	},
	S8_3: {
		flag: "S8",
		value: "3",
		name: "vw_sctg16_17_18_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG commodity codes of 16, 17 and 18."
	},
	S8_4: {
		flag: "S8",
		value: "4",
		name: "vw_sctg16_17_18_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG commodity codes of 16, 17 and 18."
	},		
	S8_5: {
		flag: "S8",
		value: "5",
		name: "vw_allSctg_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for SCTG commodity code provided."
	},
	S8_6: {
		flag: "S8",
		value: "6",
		name: "vw_allSctg_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for SCTG commodity code provided."
	},
	S9_1: {
		flag: "S9",
		value: "1",
		name: "sctg_miss_unna",
		msg: "The 4-digit 'UN' or 'NA' number for SCTG commodity code provided is missing."
	},
	S9_2: {
		flag: "S9",
		value: "2",
		name: "notFound_unna",
		msg: "The 4-digit 'UN' or 'NA' number is invalid."
	},
	S9_3: {
		flag: "S9",
		value: "3",
		name: "notAllowed_sctg_unna",
		msg: "SCTG commodity code/'UN' or 'NA' number combination is invalid."
	},
	S9_4: {
		flag: "S9",
		value: "4",
		name: "inv_sctg_unna",
		msg: "SCTG commodity code/'UN' or 'NA' number combination is invalid."
	}, 
	S10_1: {
		flag: "S10",
		value: "1",
		name: "sctg_naics_provisionalPass",
		msg: "NAICS code/SCTG commodity code combination is invalid."
	},
	S10_2: {
		flag: "S10",
		value: "2",
		name: "sctg_naics_provisionalStop",
		msg: "NAICS code/SCTG commodity code combination is invalid."
	},
	S10_3: {
		flag: "S10",
		value: "3",
		name: "sctg_naics_automaticStop",
		msg: "NAICS code/SCTG commodity code combination is invalid."
	},
	S11_1: {
		flag: "S11",
		value: "1",
		name: "miss_tempCont",
		msg: "No selection is made."
	},
	S11_2: {
		flag: "S11",
		value: "2",
		name: "inv_tempCont",
		msg: "Input is invalid."
	},
	S12_1: {
		flag: "S12",
		value: "1",
		name: "inv_sctg_tempContY",
		msg: "SCTG commodity code is invalid with a positive temperature control response."
	},
	S12_2: {
		flag: "S12",
		value: "2",
		name: "inv_sctg_tempContY",
		msg: "SCTG commodity code is invalid with a positive temperature control response."
	},
	S12_3: {
		flag: "S12",
		value: "3",
		name: "inv_sctg_tempContN",
		msg: "SCTG commodity code is invalid with a negative temperature control response."
	},
	S13_1: {
		flag: "S13",
		value: "1",
		name: "mode7_tempContY",
		msg: "Temperature control response is invalid with pipeline (7) as mode of transport."
	},
	S14_1: {
		flag: "S14",
		value: "1",
		name: "ship_month_quarter1",
		msg: "Shipment date (month) is not within the quarter reported."
	},
	S14_2: {
		flag: "S14",
		value: "2",
		name: "ship_month_quarter2",
		msg: "Shipment date (month) is not within the quarter reported."
	},
	S14_3: {
		flag: "S14",
		value: "3",
		name: "ship_month_quarter3",
		msg: "Shipment date (month) is not within the quarter reported."
	},
	S14_4: {
		flag: "S14",
		value: "4",
		name: "ship_month_quarter4",
		msg: "Shipment date (month) is not within the quarter reported."
	},
	S14_5: {
		flag: "S14",
		value: "5",
		name: "miss_ship_month",
		msg: "Shipment date (month) is missing."
	},
	S15_1: {
		flag: "S15",
		value: "1",
		name: "autoFill_error1",
		msg: "Autofill error."
	},
	S15_2: {
		flag: "S15",
		value: "2",
		name: "autoFill_error2",
		msg: "Autofill error."
	},
	S15_3: {
		flag: "S15",
		value: "3",
		name: "autoFill_error3",
		msg: "Autofill error."
	},
	S15_4: {
		flag: "S15",
		value: "4",
		name: "autoFill_error4",
		msg: "Autofill error."
	},
	S15_5: {
		flag: "S15",
		value: "5",
		name: "autoFill_error5",
		msg: "Autofill error."
	},
	S15_6: {
		flag: "S15",
		value: "6",
		name: "autoFill_error6",
		msg: "Autofill error."
	},
	S16_1: {
		flag: "S16",
		value: "1",
		name: "inv_mode_exportCountry",
		msg: "Export mode of transport (truck or rail) is invalid for countries other than Mexico or Canada."
	},
	S17_1: {
		flag: "S17",
		value: "1",
		name: "inv_exportCity_country",
		msg: "Export city is invalid for Canada or Mexico."
	},
	S17_2: {
		flag: "S17",
		value: "2",
		name: "inv_exportCountry",
		msg: "Export country is invalid."
	},
	S30_2: {
		flag: "S30",
		value: "2",
		name: "miss_numberOfShip",
		msg: "Total number of outbound shipments is missing."
	},
	S30_20: {
		flag: "S30",
		value: "20",
		name: "outOfRange_numberOfShip",
		msg: "Total number of outbound shipments is invalid. The value must be greater than zero."
	},
	S31_2: {
		flag: "S31",
		value: "2",
		name: "miss_totShipValue",
		msg: "Total value of shipments is missing."
	},
	S31_20: {
		flag: "S31",
		value: "20",
		name: "zero_totShipValue",
		msg: "Total value of shipments is invalid. The value must be greater than zero."
	},
	S32_2: {
		flag: "S32",
		value: "2",
		name: "moreThan40ship",
		msg: "No selection is made."
	},
	S33_1: {
		flag: "S33",
		value: "1",
		name: "nonAlphanumeric_ship_ID",
		msg: "Shipment ID number is not alphanumeric."
	},
	S33_2: {
		flag: "S33",
		value: "2",
		name: "miss_ship_ID",
		msg: "Shipment ID number is missing."
	},
	S34_1: {
		flag: "S34",
		value: "1",
		name: "nonNumeric_ship_date_month",
		msg: "Shipment date (month) is not numeric."
	},
	S34_20: {
		flag: "S34",
		value: "20",
		name: "outOfRange_ship_date_month",
		msg: "Shipment date (month) is not in range."
	},
	S35_1: {
		flag: "S35",
		value: "1",
		name: "nonNumeric_ship_date_day",
		msg: "Shipment date (day) is not numeric."
	},
	S35_2: {
		flag: "S35",
		value: "2",
		name: "miss_ship_date_day",
		msg: "Shipment date (day) is missing."
	},
	S35_20: {
		flag: "S35",
		value: "20",
		name: "outOfRange_ship_date_day",
		msg: "Shipment date (day) is not in range."
	},
	S36_1: {
		flag: "S36",
		value: "1",
		name: "nonNumeric_shipValue",
		msg: "Shipment value is not numeric."
	},
	S37_1: {
		flag: "S37",
		value: "1",
		name: "nonNumeric_shipWeight",
		msg: "Shipment weight is not numeric."
	},
	S38_1: {
		flag: "S38",
		value: "1",
		name: "nonNumeric_sctg",
		msg: "SCTG commodity code is not numeric."
	},
	S38_4: {
		flag: "S38",
		value: "4",
		name: "inv_sctg",
		msg: "SCTG commodity code not a 5-digit number."
	},
	S39_1: {
		flag: "S39",
		value: "1",
		name: "nonAlphanumeric_sctg_descr",
		msg: "Commodity description is not alphanumeric."
	},
	S39_2: {
		flag: "S39",
		value: "2",
		name: "miss_sctg_descr",
		msg: "Commodity description is missing."
	},
	S40_1: {
		flag: "S40",
		value: "1",
		name: "nonNumeric_unna",
		msg: "'UN' or 'NA' code is not numeric."
	},
	S40_4: {
		flag: "S40",
		value: "4",
		name: "inv_unna",
		msg: "'UN' or 'NA' code is not a 4-digit number."
	},
	S41_1: {
		flag: "S41",
		value: "1",
		name: "nonAlphabetic_destinationCity",
		msg: "U.S. destination (city) is not alphabetic."
	},
	S41_2: {
		flag: "S41",
		value: "2",
		name: "miss_destinationCity",
		msg: "U.S. destination (city) is missing."
	},
	S41_5: {
		flag: "S41",
		value: "5",
		name: "invChar_destinationCity",
		msg: "U.S. destination (city) has invalid character (a value of APO, FPO, and DPO)."
	},
	S42_1: {
		flag: "S42",
		value: "1",
		name: "nonAlphabetic_destinationState",
		msg: "U.S. destination (state) is not alphabetic."
	},
	S42_2: {
		flag: "S42",
		value: "2",
		name: "miss_destinationState",
		msg: "U.S. destination (state) is missing."
	},
	S42_4: {
		flag: "S42",
		value: "4",
		name: "inv_destinationState",
		msg: "U.S. destination (state) is not a two-letter abbreviation."
	},
	S42_5: {
		flag: "S42",
		value: "5",
		name: "invChar_destinationState",
		msg: "U.S. destination (state) has invalid character (a value of AA, AE, and AP)."
	},
	S43_1: {
		flag: "S43",
		value: "1",
		name: "nonNumeric_destinationZip",
		msg: "U.S. destination (zip) is not numeric."
	},
	S43_2: {
		flag: "S43",
		value: "2",
		name: "miss_destinationZip",
		msg: "U.S. destination (zip) is missing."
	},
	S43_4: {
		flag: "S43",
		value: "4",
		name: "inv_destinationZip",
		msg: "U.S. destination (zip) is not a 5-digit number."
	},
	S43_22: {
		flag: "S43",
		value: "22",
		name: "notFound_destinationZip",
		msg: "U.S. destination (zip) is invalid."
	},
	S44_2: {
		flag: "S44",
		value: "2",	
		name: "YN_export",
		msg: "No selection is made."
	},
	S44_5: {
		flag: "S44",
		value: "5",	
		name: "inv_export",
		msg: "Input is invalid."
	},
	S45_1: {
		flag: "S45",
		value: "1",
		name: "nonAlphabetic_exportCity",
		msg: "Foreign destination (city) is not alphabetic."
	},
	S45_2: {
		flag: "S45",
		value: "2",
		name: "miss_exportCity",
		msg: "Foreign destination (city) is missing."
	},
	S46_1: {
		flag: "S46",
		value: "1",
		name: "nonAlphabetic_exportCountry",
		msg: "Foreign destination (country) is not alphabetic."
	},
	S46_2: {
		flag: "S46",
		value: "2",
		name: "miss_exportCountry",
		msg: "Foreign destination (country) is missing."
	},
	S47_1: {
		flag: "S47",
		value: "1",
		name: "nonNumeric_exportMode",
		msg: "Export mode of transport is not numeric."
	},
	S47_2: {
		flag: "S47",
		value: "2",
		name: "miss_exportMode",
		msg: "Export mode of transport is missing."
	},
	//Edit flags for establishment attributes
	E1_1: {
		flag: "E1",
		value: "1",
		name: "miss_numOfShip_D",
		msg: "Number of shipments in Item D is missing while the number of lines entered in Item F is greater than zero."
	},
	E1_2: {
		flag: "E1",
		value: "2",
		name: "zero_numOfShip_D",
		msg: "Number of shipments in Item D is zero while the number of lines entered in Item F is greater than zero."
	},
	E1_3: {
		flag: "E1",
		value: "3",
		name: "zero_numOfShip_F",
		msg: "Number of shipments in Item D is greater than zero while the number of lines entered in Item F is zero."
	},
	E1_4: {
		flag: "E1",
		value: "4",
		name: "missOrZero_numofShip_D",
		msg: "Number of shipments in Item D is missing or zero and the number of lines entered in Item F is zero."
	},
	E1_5: {
		flag: "E1",
		value: "5",
		name: "threshold_numOfShip_D",
		msg: "Number of shipments in Item D is greater than 100,000 and the number of lines entered in Item F is greater than zero."
	},
	E2_1: {
		flag: "E2",
		value: "1",
		name: "numOfShip_required_vs_reported_greaterThan10",
		msg: " Reported shipments in item D and the total number of shipments reported in Item F are not consistent when the number of shipments required is more than 10. "
	},
	E2_2: {
		flag: "E2",
		value: "2",
		name: "numOfShip_required_vs_reported_lessThan10",
		msg: " Reported shipments in item D and the total number of shipments reported in Item F are not consistent when the number of shipments required is less than 9. "
	},
	E3_1: {
		flag: "E3",
		value: "1",
		name: "mos_vs_atv_1billion",
		msg: "The value of ATV derived from the CFS data is not consistent with the value of MOS from derived the CFS frame."
	},
	E3_2: {
		flag: "E3",
		value: "2",
		name: "mos_vs_atv_20billion",
		msg: "The value of ATV derived from the CFS data is not consistent with the value of MOS from derived the CFS frame."
	},
	E4_1: {
		flag: "E4",
		value: "1",
		name:"shipAddress_inv_state_zip",
		msg: "Shipping address state/zip combination is invalid."
	},
	E4_2: {
		flag: "E4",
		value: "2",
		name:"shipAddress_inv_state_zip",
		msg: "Shipping address state has been changed since it was mailed to the database."
	},
	E4_3: {	
		flag: "E4",
		value: "3",
		name: "shipAddress_invChar_state",
		msg: "Shipping address (state) has invalid character (a value of P.O.Box)."
	},
	E5_1:{
		flag: "E5",
		value: "1",
		name: "operatingStatus_dateOfCeased",
		msg: "Ceased operation is selected for the establishment operating status or a date for ceased operation is provided."
	},
	E6_1: {
		flag: "E6",
		value:"1",
		name: "mailAddress_inv_state_zip",
		msg: "Mailing address state/zip combination is invalid."
	},
	E7_1: {	
		flag: "E7",
		value: "1",
		name: "nonNumeric_fax",
		msg: "Fax number in not numeric."
	},
	E7_2: {	
		flag: "E7",
		value: "2",
		name: "inv_fax",
		msg: "Fax number is not a 10 digit number."
	},
	E8_1: {
		flag: "E8",
		value: "1",
		name: "numOfShip_100000",
		msg: "Total number of outbound shipments is greater than 100,000."
	},
	E9_1: {
		flag: "E9",
		value: "1",
		name: "weeklyValue1_vs_ATV",
		msg: "The total weekly value of shipments is not consistent with the value of ATV derived from the CFS data."
	},
	E9_2: {
		flag: "E9",
		value: "2",
		name: "weeklyValue2_vs_ATV",
		msg: "The total weekly value of shipments is not consistent with the value of ATV derived from the CFS data."
	},
	E10_1: {
		flag: "E10",
		value: "1",
		name: "miss_completeTime",
		msg: "Completion time (hours or minutes) are missing."
	},
	E10_2: {	
		flag: "E10",
		value: "2",
		name: "nonNumeric_completeTime",
		msg: "Completion time (hours or minutes) are not numeric."
	},
	E10_3: {		
		flag: "E10",
		value: "3",
		name: "8hours_completeTime",
		msg: "The value of completation time is more than 8 hours."
	},
	E20_2: {		
		flag: "E20",
		value: "2",
		name: "checkBox_companyShipName",
		msg: "No selection is made."
	},
	E21_1: {	
		flag: "E21",
		value: "1",
		name: "nonAlphanumeric_companyShipName1",
		msg: "Shipping company name is not alphanumeric."
	},	
	E21_2: {		
		flag: "E21",
		value: "2",
		name: "miss_companyShipName1",
		msg: "Shipping company name 1 is missing."
	},
	E22_1: {	
		flag: "E22",
		value: "1",
		name: "nonAlphanumeric_companyShipName2",
		msg: "Shipping company name 2 is not alphanumeric."
	},
	E23_1: {	
		flag: "E23",
		value: "1",
		name: "nonAlphanumeric_shipAddress",
		msg: "Shipping address is not alphanumeric. "
	},
	E23_2: {	
		flag: "E23",
		value: "2",
		name: "miss_shipAddress",
		msg: "Shipping address is missing."
	},	
	E23_5: {	
		flag: "E23",
		value: "5",
		name: "invChar_shipAddress",
		msg: "Shipping address has invalid character (a value of P_O_/P.O_/P..B/P.O_/P.O./PO_B/PO_D/POB_/POST)."
	},
	E24_1: {	
		flag: "E24",
		value: "1",
		name: "nonAlphabetic_shipCity",
		msg: "Shipping address (city) is not alphabetic."
	},
	E24_2: {	
		flag: "E24",
		value: "2",
		name: "miss_shipCity",
		msg: "Shipping address (city) is missing."
	},
	E25_1: {	
		flag: "E25",
		value: "1",
		name: "nonAlphabetic_shipState",
		msg: "Shipping address (state) is not alphabetic."
	},
	E25_2: {	
		flag: "E25",
		value: "2",
		name: "miss_shipState",
		msg: "Shipping address (state) is missing."
	},
	E25_4: {		
		flag: "E25",
		value: "4",
		name: "inv_shipState",
		msg: "Shipping address (state) is not a two-letter abbreviation."
	},
	E26_1: {	
		flag: "E26",
		value: "1",
		name: "nonNumeric_shipZip",
		msg: "Shipping address (zip) is not numeric."
	},
	E26_2: {	
		flag: "E26",
		value: "2",
		name: "miss_shipZip",
		msg: "Shipping address (zip) is missing."
	},
	E26_4: {	
		flag: "E26",
		value: "4",
		name: "inv_shipZip",
		msg: "Shipping address (zip) is not a 5-digit number."
	},
	E26_22: {	
		flag: "E26",
		value: "22",
		name: "notFound_shipZip",
		msg: "Shipping address (zip) is invalid."
	},
	E26_23: {	
		flag: "E24",
		value: "26",
		name: "inv_shipCity_state_zip",
		msg: "City/state/zip combination is invalid."
	},
	E27_2: {		
		flag: "E27",
		value: "2",
		name: "CheckBox_companyMailName",
		msg: "No selection is made."
	},
	E28_1: {
		flag: "E28",
		value: "1",
		name: "nonAlphanumeric_companyMailName1",
		msg: "Mailing company name 1 is not alphanumeric."
	},	
	E28_2: {	
		flag: "E28",
		value: "2",
		name: "miss_companyMailName1",
		msg: "Mailing company name 1 is missing."
	},
	E29_1: {
		flag: "E29",
		value: "1",
		name: "nonAlphanumeric_companyMailName2",
		msg: "Mailing company name 2 is not alphanumeric."
	},	
	E30_1: {	
		flag: "E30",
		value: "1",
		name: "nonAlphanumeric_mailAddressAttention",
		msg: "Mailing address (attention) is not alphanumeric."
	},
	E31_1: {
		flag: "E31",
		value:"1",
		name:"nonAlphanumeric_mailAddress_address",
		msg: "Mailing address (address) is not alphanumeric."
	},
	E31_2: {	
		flag: "E31",
		value: "2",
		name: "miss_mailAddress_address",
		msg: "Mailing address (address) is missing."
	},
	E32_1: {	
		flag: "E32",
		value: "1",
		name: "nonAlphabetic_mailCity",
		msg: "Mailing address (city) is not alphabetic."
	},
	E32_2: {	
		flag: "E32",
		value: "2",
		name: "miss_mailCity",
		msg: "Mailing address (city) is missing."
	},
	E32_23: {	
		flag: "E32",
		value: "22",
		name: "inv_mailCity_state_zip",
		msg: "City/state/zip combination is invalid."
	},
	E33_1: {
		flag: "E33",
		value: "1",
		name: "nonAlphabetic_mailState",
		msg: "Mailing address (state) is not alphabetic."
	},
	E33_2: {
		flag: "E33",
		value: "2",
		name: "miss_mailStat",
		msg: "Mailing address (state) is missing."
	},
	E33_4: {	
		flag: "E33",
		value: "3",
		name: "inv_mailState",
		msg: "Mailing address (state) is not a two-letter abbreviation."
	},
	E34_1: {	
		flag: "E34",
		value: "1",
		name: "nonNumeric_mailZip",
		msg: "Mailing address (zip) is not numeric."
	},
	E34_2: {		
		flag: "E34",
		value: "2",
		name: "miss_mailZip",
		msg: "Mailing address (zip) is missing."
	},
	E34_4: {	
		flag: "E34",
		value: "4",
		name: "inv_mailZip",
		msg: "Mailing address (zip) is not a 10-digit number."
	},
	E34_22: {	
		flag: "E34",
		value: "22",
		name: "notFound_mailZip",
		msg: "Mailing address (zip) is invalid."
	},
	E35_2: {	
		flag: "E35",
		value: "2",
		name: "checkBox_operatingStatus",
		msg: "No selection is made."
	},
	E36_1:{
		flag: "E36",
		value:"1",
		name: "nonNumeric_dateOfCeased",
		msg: "Date for ceased operation is not numeric."
	},
	E36_3:{
		flag: "E36",
		value: "3",
		name: "invFormat_dateOfCeased",
		msg: "Date of ceased operation is not in correct format."
	},
	E36_40:{
		flag: "E36",
		value: "40",
		name: "dateOfCeased_CrossConst",
		msg: "Ceased operation is selected but the date of ceases is missing or date of ceased is provided but ceased operation check box is not selected. ."
	},
	E37_2: {	
		flag: "E37",
		value: "2",
		name: "checkBox_priIndustryActivity",
		msg: "No selection is made."
	},
	E38_1: {	
		flag: "E38",
		value: "1",
		name: "nonAlphanumeric_priIndustryActivity",
		msg: "Primary industry activity is not alphanumeric "
	},
	E38_40: {
		flag: "E38",
		value: "40",
		name: "primIndustAct_CrossConst",
		msg: "Checkbox is checked as 'No' but primary industry activity description is not provided."
	},
	E39_1: {	
		flag : "E39",
		value: "1",
		name: "nonAlphabetic_contactName",
		msg: "Contact information (name) is not alphabetic."
	},
	E39_2: {
		flag: "E39",
		value: "2",
		name: "miss_contactName",
		msg: "Contact information (name) is missing."
	},	
	E40_1: {	
		flag: "E40",
		value: "1",
		name: "nonAlphabetic_contactTitle",
		msg: "Contact information (title) is not alphabetic."
	},
	E40_2: {
		flag: "40",
		value: "2",
		name: "miss_contactTitle",
		msg: "Contact information (title) is missing."
	},		
	E41_1: {	
		flag: "E41",
		value: "1",
		name: "nonNumeric_contactPhone",
		msg: "Contact information (phone number) is not numeric."
	},
	E41_2: {
		flag: "41",
		value: "2",
		name: "miss_contactPhone",
		msg: "Contact information (phone number) is missing."
	},	
	E42_2: {	
		flag: "E42",
		value: "2",
		name: "miss_contactFax",
		msg: "Contact information (fax number) is missing."
	},
	E43_40: {	
		flag: "E43",
		value: "40",
		name: "Remark_CrossConst_OperatStatusCheck",
		msg: "Operating status is checked as 'in operation' but description of operation change is not provided."
	},
	
};	