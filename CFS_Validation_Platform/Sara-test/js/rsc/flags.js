var flags = {
		// SHIPPING ADDRESS ATTRIBUTE
			E20_2: {
				name: "ShipCheck_blank",
				flag: "E20",
				value:"2",
				msg: "checkbox is not selected"
			},
			E21_1: {
				name:"ShipCompanyName1_dataType",
				flag: "E21",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},	
			E21_2: {
				name:"ShipCompanyName1_blank",
				flag: "E21",
				value:"2",
				msg: "ShipmentCompanyName1 is blank"
			},
				
			E22_1: {
				name:"ShipCompanyName2_dataType",
				flag: "E22",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			
			E23_1: {
				name:"shipAddress_dataType",
				flag: "E23",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			E23_2: {
				name:"shipAddress_blank",
				flag: "E23",
				value:"2",
				msg: "Adresss is blank"
			},
			
			E23_5: {
				name:"shipAddress_invalid_char_New",
				flag: "E23",
				value:"5",
				msg: " Invalid characters such as  P_O_/P.O_/P..B/P.O_/P.O./PO_B/PO_D/POB_/POST} Box is entered in shipping address"
			},
			E4_3: {
				name:"shipAddress_invalid_char_Exist",
				flag: "E4",
				value:"4",
				msg: " The respondent provided P.O.Box Box in their shipping address",
				},
			E24_1: {
				name:"shipCity_dataType",
				flag: "E24",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered ",
				},
			E24_2: {
				name:"shipCity_blank",
				flag: "E24",
				value:"2",
				msg: "City is blank"
			},
			E24_23: {
				name:"shipCity-state-zip-lukup-Cross",
				flag: "E24",
				value:"23",
				msg: "The combination of zip, state, city is invalid"
			},
			
			E25_1: {
				name:"shipState_dataType",
				flag: "E25",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
				},
			E25_2: {
				name:"shipState_blank",
				flag: "E25",
				value:"2",
				msg: "state is blank"
				},
			E25_4: {
				name:"shipState_fieldLenght",
				flag: "E25",
				value:"4",
				msg: "The lenght of state is not matched with it's abbreviation "
				},
			
			E4_1: {
				name:"shipState-lookuptable_Cross_Exist",
				flag: "E4",
				value:"1",
				msg: "The state is not matched with zip Code"
			},
			E26_1: {
				name:"shipZipCode_dataType",
				flag: "E26",
				value:"1",
				msg: "None numeric charecter is entered or Incorrect data type is entered "
				},
			E26_2: {
				name:"shipZipCode_blank",
				flag: "E26",
				value:"2",
				msg: "zip Code is blank"
				},
			E26_4: {
				name:"shipZipCode_fieldLenght",
				flag: "E26",
				value:"4",
				msg: "The lenght of zip code is not correct "
				},
			E26_22: {
				name:"shipZipCode-lookuptable_find",
				flag: "E26",
				value:"22",
				msg: "The zip code does not exist"
				},
										
				// MAILING ADDRESS ATRRIBUTE
			E27_2: {
				name:"mailCheck_blank",
				flag: "E27",
				value:"2",
				msg: "checkbox is not selected"
			},
			E28_1: {
				name:"mailCompanyName1_dataType",
				flag: "E28",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},	
			E28_2: {
				name:"mailCompanyName1_blank",
				flag: "E28",
				value:"2",
				msg: "ShipmentCompanyName1 is blank"
			},
			E29_1: {
				name:"mailCompanyName2_dataType",
				flag: "E29",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			
			E30_1: {
				name:"mailAddressAttention_dataType",
				flag: "E30",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			
			E31_1: {
				name:"mailAddress_dataType",
				flag: "E31",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			E31_2: {
				name:"mailAddress_blank",
				flag: "E31",
				value:"2",
				msg: "Adresss is blank"
			},
			
			E32_1: {
				name:"mailCity_dataType",
				flag: "E32",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
				},
			E32_2: {
				name:"mailCity_blank",
				flag: "E32",
				value:"2",
				msg: "City is blank"
			},
			E32_23: {
				name:"mailCity-state-zip-lukup-Cross",
				flag: "E32",
				value:"22",
				msg: "The combination of city, state, zipe is invalid"
			},
			
			E33_1: {
				name:"mailState_dataType",
				flag: "E33",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
				},
			E33_2: {
				name:"mailState_blank",
				flag: "E33",
				value:"2",
				msg: "state is blank"
				},
			E33_4: {
				name:"mailState_fieldLenght",
				flag: "E33",
				value:"3",
				msg: "The lenght of the state abbriviation is more than 2 characters"
				},
			
			E6_1: {
				name:"mailState-lookuptable_Cross_Exist",
				flag: "E6",
				value:"1",
				msg: "The state does not match the zip code provided"
			},
			E34_1: {
				name:"mailZipCode_dataType",
				flag: "E34",
				value:"1",
				msg: "None numeric charecter is entered or Incorrect data type is entered"
				},
			E34_2: {
				name:"mailZipCode_blank",
				flag: "E34",
				value:"2",
				msg: "zip Code is blank"
				},
			E34_4: {
				name:"mailZipCode_fieldLenght",
				flag: "E34",
				value:"4",
				msg: "The lenght of zip code is not correct "
				},
			E34_22: {
				name:"mailZipCode-lookuptable_find",
				flag: "E34",
				value:"22",
				msg: "The zip code does not exist"
				},
		//OPERATING STATUS ATTRIBUTE
				
			E35_2: {
				name:"statusCheck_blank",
				flag: "E35",
				value:"2",
				msg: "The check box is not the the only one selected status"
				},
			E5_1:{
				name:"operatingStatus_CrossCons_DateOfCeased_Exist",
				flag: "E5",
				value:"1",
				msg: "Item C = 3 (ceased operation) or the respondent has not provided the ceased operation date"
				},
			E36_1:{
					name:"dateOf Ceased_datatype",
					flag: "E36",
					value:"1",
					msg: "None numeric charecter is entered or Incorrect data type is entered"
				},
			E36_3:{
			name:"dateOf Ceased_Format",
				flag: "E36",
				value:"3",
				msg: "Date of ceased operation is not entered in  MMDDYYYY format "
				},
			E37_2: {
			name:"primIndustCheck_blank",
				flag: "E37",
				value:"2",
				msg: "checkbox is not selected"
				},
			E38_1: {
			name:"primIndustAct_dataType",
				flag: "E38",
				value:"2",
				msg: "None numeric charecter is entered or Incorrect data type is entered "
				},
			E38_40: {
			name:"primIndustAct_CrossConst",
				flag: "E38",
				value:"40",
				msg: " 'No' check box is selected  but the activity  is not entered "},

			// CONTACT INFORMATION ATTRIBUTE 
		
			E39_1: {
				name:"contactName_dataType",
				flag : "E39",
				value: "1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
			},
			E39_2: {
			name:"ContactName_blank",
				flag: "E39",
				value:"2",
				msg: "Contact name is blank"
			},	
			E40_1: {
			name:"contactTitle_dataType",
				flag: "E40",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
			},
			E40_2: {
			name:"ContactTitle_blank",
				flag: "40",
				value:"2",
				msg: "Contact Title is blank"
			},		
			E41_1: {
			name:"contactPhone_dataType",
				flag: "E41",
				value:"1",
				msg: "None anumeric charecter is entered or Incorrect data type is entered "
			},
			E41_2: {
			name:"ContactPhone_blank",
				flag: "41",
				value:"2",
				msg: "Contact Phone number is blank"
			},	
			E7_1: {
			name:"contactFax_dataType",
				flag: "E7",
				value:"1",
				msg: " Fax number contains other format than intiger numeric entries "
			},
			E42_2: {
			name:"contactFax_blank",
				flag: "E42",
				value:"2",
				msg: "Contact Fax number is blank"
			},
			E7_2: {
			name:"contactFax_fieldLenght",
				flag: "E7",
				value:"2",
				msg: "The lenght of fax number is less than 10 digit "
				},
			E42_3 :{
			name:"contactFaxd_Format",
				flag: "E42",
				value:"3",
				msg: "The format as area code-phone-extenstion is not provided"
				},
				//REMARKS ATTRIBUTE
			E43_41: {
			name:"Remark_CrossConst_OperatStatusCheck",
				flag: "E43",
				value:"41",
				msg: "  Operating status is checked but description of operation change is not entered   "
				},
			E43_42: {
			name:"Remark_CrossConst_ShipWeighttype",
				flag: "E43",
				value:"42",
				msg: "   Net shipment weight is not in pound and the weight unit in not mentioned in Remark    "
				},
				// COMPLETION TIME
			E10_1: {
				name:"completTime_dataType",
				flag: "E10",
				value:"1",
				msg: " Either hours or minutes have something other than a number  "
			},
			E10_2: {
				name:"completTime_blank",
				flag: "E10",
				value:"2",
				msg: "Both hour and minutes are blankk"
			},
			E10_3: {
				name:"CompletTime_Range",
				flag: "E10",
				value:"3",
				msg: "The value of completation time is more than 10 hours "
				}, 
				S1_1: {
					flag: "S1",
					value: "1",
					name: "overseas_military_zip",
					msg: "Zipcode contains overseas military mail address."
			},	
			S1_2: {
					flag: "S1",
					value: "2",
					name: "inv_zip_state",
					msg: "Zipcode/state combination is invalid."
			},
			S2_3: {
					flag: "S2",
					value: "3",
					name: "inv_mode",
					msg: "Mode of transport is invalid."
			},
			S3_3: {
					flag: "S3",
					value: "3",
					name: "sctg_16xxx",
					msg: "SCTG code is invalid."
			},	
			S4_1: {
					flag: "S4",
					value: "1",
					name: "inv_sctg_mode7",
					msg: "SCTG code is invalid for mode includes pipeline (7)."
			},
			S4_2: {
					flag: "S4",
					value: "2",
					name: "inv_sctg_mode1_weight150_orAK",
					msg: "SCTG code is invalid for mode includes parcel (1), shipment weight ≥ 150 lbs, or state ≠ AK."		
			},
			S4_3: {
					flag: "S4",
					value: "3",
					name: "inv_sctg_mode8_weight1000_orAK",
					msg: "SCTG code is invalid for mode includes air (8), shipment weight ≥ 1000 lbs, or state ≠ AK."
			},
			S5_2: {
				flag: "S5",
				value: "2",
				name: "zero_ship_value",
				msg: "Shipment value is invalid. The value must be greater than zero."
			},
			S6_2: {
				flag: "S6",
				value: "2",
				name: "zero_ship_weight",
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
				name: "valueW_sctg_lessThanExpected",
				msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
			},
			S8_2: {
				flag: "S8",
				value: "2",
				name: "valueW_sctg_greaterThanExpected",
				msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
			},
			S8_3: {
				flag: "S8",
				value: "3",
				name: "valueW_sctg16_17_18_lessThanExpected",
				msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG codes of 16, 17 and 18."
			},
			S8_4: {
				flag: "S8",
				value: "4",
				name: "valueW_sctg16_17_18_greaterThanExpected",
				msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG codes of 16, 17 and 18."
			},		
			S8_5: {
				flag: "S8",
				value: "5",
				name: "valueW_allSctg_lessThanExpected",
				msg: "Shipment value to weight ratio is less than excpected for SCTG code provided."
			},
			S8_6: {
				flag: "S8",
				value: "6",
				name: "valueW_allSctg_greaterThanExpected",
				msg: "Shipment value to weight ratio is greater than excpected for SCTG code provided."
			},
			S9_1: {
				flag: "S9",
				value: "1",
				name: "sctg_balnk_unna",
				msg: "The 4-digit 'UN' or 'NA' number for commodity code provided is missing."
			},
			S9_2: {
				flag: "S9",
				value: "2",
				name: "inv_unna",
				msg: "The 4-digit 'UN' or 'NA' number is invalid."
			},
			S9_3: {
				flag: "S9",
				value: "3",
				name: "notAllowed_sctg_unna",
				msg: "SCTG code/'UN' or 'NA' number combination is invalid."
			},
			S9_4: {
				flag: "S9",
				value: "4",
				name: "inv_sctg_unna",
				msg: "SCTG code/'UN' or 'NA' number combination is invalid."
			}, 
			S10_1: {
				flag: "S10",
				value: "1",
				name: "sctg_naics_provisionalPass",
				msg: "Provisional pass (NAICS/SCTG)"
			},//Not sure about the error message
			S10_2: {
				flag: "S10",
				value: "2",
				name: "sctg_naics_provisionalStop",
				msg: "Provisional stop (NAICS/SCTG)"
			},//Not sure about the error message
			S10_3: {
				flag: "S10",
				value: "3",
				name: "sctg_naics_automaticStop",
				msg: "Automatic stop (NAICS/SCTG)"
			},//Not sure about the error message
		//I excluded the edit flag S11 since its rules are defined by our own validation flags.	
			S12_1: {
				flag: "S12",
				value: "1",
				name: "inv_sctg_tempContY",
				msg: "SCTG code is invalid with a positive temperature control response."
			},
			S12_2: {
				flag: "S12",
				value: "2",
				name: "inv_sctg_tempContY",
				msg: "SCTG code is invalid with a positive temperature control response."
			},
			S12_3: {
				flag: "S12",
				value: "3",
				name: "inv_sctg_tempContN",
				msg: "SCTG code is invalid with a negative temperature control response."
			},
			S13_1: {
				flag: "S13",
				value: "1",
				name: "mode7_tempContY",
				msg: "Temperature control response is invalid for mode of transport includes pipeline (7)."
			},
			S14_1: {
				flag: "S14",
				value: "1",
				name: "ship_date_quarter1",
				msg: "Shipment month is not within the quarter reported."
			},
			S14_2: {
				flag: "S14",
				value: "2",
				name: "ship_date_quarter2",
				msg: "Shipment month is not within the quarter reported."
			},
			S14_3: {
				flag: "S14",
				value: "3",
				name: "ship_date_quarter3",
				msg: "Shipment month is not within the quarter reported."
			},
			S14_4: {
				flag: "S14",
				value: "4",
				name: "ship_date_quarter4",
				msg: "Shipment month is not within the quarter reported."
			},
			S15_1: {
				flag: "S15",
				value: "1",
				name: "autoFill_error1",
				msg: ""
			},//Edit flag value indicated the number of variables that fail the edit (Not sure about the error message).
			S15_2: {
				flag: "S15",
				value: "2",
				name: "autoFill_error2",
				msg: ""
			},//Not sure about the error message
			S15_3: {
				flag: "S15",
				value: "3",
				name: "autoFill_error3",
				msg: ""
			},//Not sure about the error message
			S15_4: {
				flag: "S15",
				value: "4",
				name: "autoFill_error4",
				msg: ""
			},//Not sure about the error message
			S15_5: {
				flag: "S15",
				value: "5",
				name: "autoFill_error5",
				msg: ""
			},//Not sure about the error message
			S15_6: {
				flag: "S15",
				value: "6",
				name: "autoFill_error6",
				msg: ""
			},//Not sure about the error message
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
				msg: ""
			},//Not sure about the error message. Number of shipments required > 10 and (number of shipments required - number of shipments reported) / number of shipments required > 0.2
			E2_2: {
				flag: "E2",
				value: "2",
				name: "numOfShip_required_vs_reported_lessThan10",
				msg: ""
			},//Not sure about the error message. Number of shipments required ≤  10 and |number of shipments required – number of shipments reported| > 1
			E3_1: {
				flag: "E3",
				value: "1",
				name: "mos_vs_atv_1billion",
				msg: ""
			},//Not sure about the error message. |ATV - MOS| > $1 billion and (MOS/ATV) is < 0.2 or > 5
			E3_2: {
				flag: "E3",
				value: "2",
				name: "mos_vs_atv_20billion",
				msg: ""
			},//Not sure about the error message. [|ATV - MOS| > $20 million or Estab Wgt > 5] and ratio of (MOS/ATV) < 0.1 or > 10
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
				msg: "Total number of outbound shipments is invalid. The total number of outbound shipments must be between 1 and 100,000."
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
				msg: "Total value of shipments is not in range."
			},
			S31_28: {
				flag: "S31",
				value: "28",
				name: "totShipValue_atv_sum",
				msg: ""
			},//Not sure about the message for the error: ATV =  SUM ( YEARWGT * QTRWGT * WEEKWGT * SHIP_VALUE )
			S31_29: {
				flag: "S31",
				value: "29",
				name: "totShipValue_atv_valueWeek_1billion",
				msg: ""
			},//Not sure about the message for the error: (ATV*1000)–(TOT_VALUE_WEEK*52))|>$1 Billion and (TOT_VALUE_WEEK*52) / (ATV*1000)| < 0.2 or > 5, reference look up table Total-value-week and ATV
			S31_30: {
				flag: "S31",
				value: "30",
				name: "totShipValue_atv_valueWeek_20million",
				msg: ""
			},//Not sure about the message for the error: |(ATV*1000)–(TOT_VALUE_WEEK*52)|>$20 Million or ESTAB_WEIGHT>5] and |(TOT_VALUE_WEEK*52) / (ATV*1000)| < 0.1 or > 10
			S32_2: {
				flag: "S32",
				value: "2",
				name: "checkBox_moreThan_40ship",
				msg: "No selection is made."
			},
			S32_40: {
				flag: "S32",
				value: "40",
				name: "checkBox_moreThan_40ship_numberOfShip",
				msg: "Total number of shipments does not match the information provided in Item D."
			},
			S33_1: {
				flag: "S33",
				value: "1",
				name: "nonAlphanumeric_ship_ID",
				msg: "Shipment ID is not alphanumeric."
			},
			S33_2: {
				flag: "S33",
				value: "2",
				name: "miss_ship_ID",
				msg: "Shipment ID is missing."
			},
			S33_5: {
				flag: "S33",
				value: "5",
				name: "invChar_ship_ID",
				msg: "Shipment ID has invalid character."
			},
			S34_2: {
				flag: "S34",
				value: "2",
				name: "miss_numberOfShipReported",
				msg: "Total number of shipments is missing."
			},
			S34_28: {
				flag: "S34",
				value: "28",
				name: "numberOfShipReported_atv_mos_1billion",
				msg: ""
			},//Not sure about the message for the error: |ATV - MOS| > $1 billion and (MOS/ATV) is < 0.2 or > 5
			S34_29: {
				flag: "S34",
				value: "29",
				name: "numberOfShipReported_atv_mos_20million",
				msg: ""
			},//Not sure about the message for the error: [|ATV - MOS| > $20 million or Estab Wgt > 5] and ratio of (MOS/ATV) < 0.1 or > 10
			S35_1: {
				flag: "S35",
				value: "1",
				name: "nonNumeric_ship_date_month",
				msg: "Shipment date (month) is not numeric."
			},
			S35_2: {
				flag: "S35",
				value: "2",
				name: "miss_ship_date_month",
				msg: "Shipment date (month) is missing."
			},
			S35_20: {
				flag: "S35",
				value: "20",
				name: "inv_ship_date_month",
				msg: "Shipment date (month) is not within the range."
			},
			S36_1: {
				flag: "S36",
				value: "1",
				name: "nonNumeric_ship_date_day",
				msg: "Shipment date (day) is not numeric."
			},
			S36_2: {
				flag: "S36",
				value: "2",
				name: "miss_ship_date_day",
				msg: "Shipment date (day) is missing."
			},
			S36_20: {
				flag: "S36",
				value: "20",
				name: "inv_ship_date_day",
				msg: "Shipment date (day) is not within the range."
			},
			S37_2: {
				flag: "S37",
				value: "2",
				name: "miss_ship_value",
				msg: "Shipment value is missing."
			},
			S37_28: {
				flag: "S37",
				value: "28",
				name: "ship_value_atv_sum",
				msg: ""
			},//Not sure about the message for the error: ATV =  SUM ( YEARWGT * QTRWGT * WEEKWGT * SHIP_VALUE )
			S37_29: {
				flag: "S37",
				value: "29",
				name: "ship_value_atv_valueWeek_1billion",
				msg: ""
			},//Not sure about the message for the error: (ATV*1000)–(TOT_VALUE_WEEK*52))|>$1 Billion and (TOT_VALUE_WEEK*52) / (ATV*1000)| < 0.2 or > 5, reference look up table Total-value-week and ATV
			S37_30: {
				flag: "S37",
				value: "30",
				name: "ship_value_atv_valueWeek_20million",
				msg: ""
			},//Not sure about the message for the error: |(ATV*1000)–(TOT_VALUE_WEEK*52)|>$20 Million or ESTAB_WEIGHT>5] and |(TOT_VALUE_WEEK*52) / (ATV*1000)| < 0.1 or > 10
			S38_2: {
				flag: "S38",
				value: "2",
				name: "miss_ship_weight",
				msg: "Shipment weight is missing."
			},
			S38_34: {
				flag: "S38",
				value: "34",
				name: "vWeight_sctg_lessThanExpected",
				msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
			},
			S38_35: {
				flag: "S38",
				value: "35",
				name: "vWeight_sctg_greaterThanExpected",
				msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
			},		
			S38_36: {
				flag: "S38",
				value: "36",
				name: "vWeight_sctg16_17_18_lessThanExpected",
				msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG codes of 16, 17 and 18."
			},
			S38_37: {
				flag: "S38",
				value: "37",
				name: "vWeight_sctg16_17_18_greaterThanExpected",
				msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG codes of 16, 17 and 18."
			},
			S38_38: {
				flag: "S38",
				value: "38",
				name: "vWeight_allSctg_lessThanExpected",
				msg: "Shipment value to weight ratio is less than excpected for the SCTG code provided."
			},
			S38_39: {
				flag: "S38",
				value: "39",
				name: "vWeight_allSctg_greaterThanExpected",
				msg: "Shipment value to weight ratio is greater than excpected for the SCTG code provided."
			},
			S38_40: {
				flag: "S38",
				value: "40",
				name: "ship_weight_mode0",
				msg: "Shipment weight is invalid for mode of transport unknown (0)."
			},//If mode = 0 (Unknown mode), then shipments will be converted to 3 or 4 based on shipment weight.
			S38_41: {
				flag: "S38",
				value: "41",
				name: "ship_weight_lessThanOrEqualTo_80000_mode0",
				msg: "Shipment weight (≤ 80,000 lbs) is invalid for mode of transport unknown (0)."
			},//If weight ≤ 80,000 lbs, then mode 0 will be converted to 3 (for-hire truck).
			S38_42: {
				flag: "S38",
				value: "42",
				name: "ship_weight_greaterThan_80000_mode0",
				msg: "Shipment weight (> 80,000 lbs) is invalid for mode of transport unknown (0)."
			},//If weight > 80,000 lbs, then mode 0 will be coveted to 4 (rail).
			S38_43: {
				flag: "S38",
				value: "43",
				name: "ship_weight_mode9",
				msg: "Shipment weight is invalid for other mode of transport (9)."
			},//If mode = 9 (Other mode), then shipments will likely be converted to 3 or 4 based on shipment weight.
			S39_1: {
				flag: "S39",
				value: "1",
				name: "nonNumeric_sctg",
				msg: "SCTG code is not numeric."
			},
			S39_2: {
				flag: "S39",
				value: "2",
				name: "miss_sctg",
				msg: "SCTG code is missing."
			},
			S39_3: {
				flag: "S39",
				value: "3",
				name: "invFormat_sctg",
				msg: "SCTG code is not a 5-digit number."
			},
			S39_34: {
				flag: "S39",
				value: "34",
				name: "sctg_vw_lessThanExpected",
				msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
			},
			S39_35: {
				flag: "S39",
				value: "35",
				name: "sctg_vw_greaterThanExpected",
				msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
			},
			S39_36: {
				flag: "S39",
				value: "36",
				name: "sctg16_17_18_vw_lessThanExpected",
				msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG codes of 16, 17 and 18."
			},
			S39_37: {
				flag: "S39",
				value: "37",
				name: "sctg16_17_18_vw_greaterThanExpected",
				msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG codes of 16, 17 and 18."
			},
			S39_38: {
				flag: "S39",
				value: "38",
				name: "allSctg_vw_lessThanExpected",
				msg: "Shipment value to weight ratio is less than excpected for the SCTG code provided."
			},
			S39_39: {
				flag: "S39",
				value: "39",
				name: "allSctg_vw_greaterThanExpected",
				msg: "Shipment value to weight ratio is greater than excpected for the SCTG code provided."
			},
			S39_40: {
				flag: "S39",
				value: "40",
				name: "inv_sctg_mode",
				msg: "SCTG code/mode of transport combination is invalid."
			},
			S40_1: {
				flag: "S40",
				value: "1",
				name: "nonAlphanumeric_sctg_descr",
				msg: "Commodity description is not alphanumeric."
			},
			S40_2: {
				flag: "S40",
				value: "2",
				name: "miss_sctg_descr",
				msg: "Commodity description is missing."
			},
			S40_5: {
				flag: "S40",
				value: "5",
				name: "inv_sctg_descr",
				msg: "Commodity discriction has invalid character."
			},
			S41_2: {
				flag: "S41",
				value: "2",
				name: "miss_temp_cont",
				msg: "No selection is made."
			},
			S41_34: {
				flag: "S41",
				value: "34",
				name: "inv_tempContY_sctg",
				msg: "SCTG code is invalid with a positive temperature control response."
			},
			S41_35: {
				flag: "S41",
				value: "35",
				name: "inv_tempContY_sctg",
				msg: "SCTG code is invalid with a positive temperature control response."
			},
			S41_36: {
				flag: "S41",
				value: "36",
				name: "inv_tempContN_sctg",
				msg: "SCTG code is invalid with a negative temperature control response."
			},
			S42_1: {
				flag: "S42",
				value: "3",
				name: "invFormat_unna",
				msg: "'UN' or 'NA' code is nnumeric."
			},
			S42_3: {
				flag: "S42",
				value: "3",
				name: "invFormat_unna",
				msg: "'UN' or 'NA' code is not a 4-digit number."
			},
			S42_22: {
				flag: "S42",
				value: "22",
				name: "inv_unna",
				msg: "'UN' or 'NA' code is invalid."
			},
			S42_34: {
				flag: "S42",
				value: "34",
				name: "miss_unna_sctg",
				msg: "The 4-digit 'UN' or 'NA' number for commodity code is missing."
			},
			S42_35: {
				flag: "S42",
				value: "35",
				name: "unna_notAllowed_sctg",
				msg: "SCTG code/'UN' or 'NA' number combination is invalid."
			},
			S42_36: {
				flag: "S42",
				value: "36",
				name: "inv_unna_sctg",
				msg: "SCTG code/'UN' or 'NA' number combination is invalid."
			}, 
			S43_1: {
				flag: "S43",
				value: "1",
				name: "nonAlphabetic_destinationCity",
				msg: "U.S. destination (city) is not alphabetic."
			},
			S43_2: {
				flag: "S43",
				value: "2",
				name: "miss_destinationCity",
				msg: "U.S. destination (city) is missing."
			},
			S43_5: {
				flag: "S43",
				value: "5",
				name: "invChar_destinationCity",
				msg: "U.S. destination (city) has invalid character."
			},
			S43_22: {
				flag: "S43",
				value: "22",
				name: "inv_destinationCity",
				msg: "U.S. destination (city) is invalid."
			},
			S44_1: {
				flag: "S44",
				value: "1",
				name: "nonAlphabetic_destinationState",
				msg: "U.S. destination (state) is not alphabetic."
			},
			S44_2: {
				flag: "S44",
				value: "2",
				name: "miss_destinationState",
				msg: "U.S. destination (state) is missing."
			},
			S44_3: {
				flag: "S44",
				value: "3",
				name: "invFormat_destinationState",
				msg: "U.S. destination (state) is not two-letter state abbreviation."
			},
			S44_5: {
				flag: "S44",
				value: "5",
				name: "invChar_destinationState",
				msg: "U.S. destination (state) has invalid character."
			},
			S44_22: {
				flag: "S44",
				value: "22",
				name: "inv_destinationState",
				msg: "U.S. destination (state) is invalid."
			},
			S44_34: {
				flag: "S44",
				value: "34",
				name: "inv_destinationState_zip",
				msg: "Zipcode/state combination is invalid."
			},
			S45_1: {
				flag: "S45",
				value: "1",
				name: "nonNumeric_destinationZip",
				msg: "U.S. destination (zip code) is not numeric."
			},
			S45_2: {
				flag: "S45",
				value: "2",
				name: "miss_destinationZip",
				msg: "U.S. destination (zip code) is missing."
			},
			S45_3: {
				flag: "S45",
				value: "3",
				name: "invFormat_destinationZip",
				msg: "U.S. destination (zip code) is not a 5-digit or 10-digit number."
			},
			S45_5: {
				flag: "S45",
				value: "5",
				name: "invChar_destinationZip",
				msg: "U.S. destination (zip code) has invalid character."
			},
			S45_22: {
				flag: "S45",
				value: "22",
				name: "inv_destinationZip",
				msg: "U.S. destination (zip code) is invalid."
			},
			S46_1: {
				flag: "S46",
				value: "1",
				name: "nonNumeric_mode",
				msg: "Mode of transport is not numeric."
			},
			S46_2: {
				flag: "S46",
				value: "2",
				name: "miss_mode",
				msg: "Mode of transport is missing."
			},
			S46_5: {
				flag: "S46",
				value: "5",
				name: "invChar_mode",
				msg: "Mode of transport has invalid character."
			},
			S46_28: {
				flag: "S46",
				value: "28",
				name: "mode7_inv_tempCont",
				msg: "Temperature control response is invalid for mode of transport includes pipeline (7)."
			},
			S46_29: {
				flag: "S46",
				value: "29",
				name: "mode_maxWeight_threshold",
				msg: "Shipment weight exceeds maximum weight for modes of transport 1, 2, 3, 8, 12, 13, 18, 21, 31 and 81."
			},
			S46_30: {
				flag: "S46",
				value: "30",
				name: "mode_minWeight_threshold",
				msg: "Shipment weight is less than minimum weight for modes of transport 4, 5 and 6."
			},
			S46_34: {
				flag: "S46",
				value: "34",
				name: "mode7_inv_sctg",
				msg: "SCTG code is invalid for mode of transport includes pipeline (7)."
			},
			S46_35: {
				flag: "S46",
				value: "35",
				name: "mode1_inv_sctg_weight150_orAK",
				msg: "SCTG code is invalid for mode of transport includes parcel (1), shipment weight ≥ 150 lbs, or state ≠ AK."
			},
			S46_36: {
				flag: "S46",
				value: "36",
				name: "mode8_inv_sctg_weight1000_orAK",
				msg: "SCTG code is invalid for mode of transport includes air (8), shipment weight ≥ 1000 lbs, or state ≠ AK."
			},
			S46_40: {
				flag: "S46",
				value: "40",
				name: "inv_mode_sctg",
				msg: "SCTG code/mode of transport combination is invalid."
			},
			S47_2: {
				flag: "S47",
				value: "2",	
				name: "checkbox_exportMode",
				msg: "No selection is made."
			},
			S48_1: {
				flag: "S48",
				value: "1",
				name: "nonAlphabetic_exportCity",
				msg: "Foreign destination (city) is not alphabetic."
			},
			S48_2: {
				flag: "S48",
				value: "2",
				name: "miss_exportCity",
				msg: "Foreign destination (city) is missing."
			},
			S48_5: {
				flag: "S48",
				value: "5",
				name: "invChar_exportCity",
				msg: "Foreign destination (city) has invalid character."
			},
			S49_1: {
				flag: "S49",
				value: "1",
				name: "nonAlphabetic_exportCountry",
				msg: "Foreign destination (country) is not alphabetic."
			},
			S49_2: {
				flag: "S49",
				value: "2",
				name: "miss_exportCountry",
				msg: "Foreign destination (country) is missing."
			},
			S49_5: {
				flag: "S49",
				value: "5",
				name: "invChar_exportCountry",
				msg: "Foreign destination (country) has invalid character."
			},
			S49_28: {
				flag: "S49",
				value: "28",
				name: "inv_exportCountry_mode",
				msg: "Export mode of transport (truck or rail) is invalid for countries other than Mexico or Canada."
			},
			S50_1: {
				flag: "S50",
				value: "1",
				name: "nonNumeric_exportMode",
				msg: "Export mode of transport is not numeric."
			},
			S50_2: {
				flag: "S50",
				value: "2",
				name: "miss_exportMode",
				msg: "Export mode of transport is missing."
			}
};