var converter_config= {
	LKUP_SCTG: {
		config_name: 'lkup_1',
		flags: ['S3','S8','S38','S39'],
		required_columns: ['SCTG_CODE','VW_RATIO_LB','VW_RATIO_UB']
	},
	LKUP_UNNA: {
		config_name: 'lkup_2',
		flags: ['S9','S42'],
		required_columns: ['HAZMAT_CODE']
	},
	LKUP_ACCMODES: {
		config_name: 'lkup_3',
		flags: ['S3'],
		required_columns: ['ACCEPTABLE_MODE']
	},
	LKUP_CSZ: {
		config_name: 'lkup_4',
		flags: ['S1','S43','S44','E6','E24','E25','E26','E32','E33','E34'],
		required_columns: ['ZIP_CODE','CITY','STATE']
	},
	LKUP_INVSCTG: {
		config_name: 'lkup_14',
		flags: ['S9','S42'],
		required_columns: ['SCTG']
	},
	LKUP_HAZMATSCTG: {
		config_name: 'lkup_15',
		flags: ['S9','S42'],
		required_columns: ['SCTG']
	},
	LKUP_CANADA: {
		config_name: 'lkup_16',
		flags: ['S17'],
		required_columns: ['CITY_NAME']
	},
	LKUP_COUNTRY: {
		config_name: 'lkup_17',
		flags: ['S17'],
		required_columns: ['COMMON_COUNTRY_NAME']
	}
}