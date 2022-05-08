export enum DhlServiceType {
  MOTHER = 'Mother',
  BBX = 'BBX',
  WPX = 'WPX',
  ESI = 'ESI',
  ESU = 'ESU',
  DOM = 'DOM',
  XPD = 'XPD',
  DOX = 'DOX',
  ECX = 'ECX',
  TDE = 'TDE',
  TDK = 'TDK',
  TDL = 'TDL',
  TDM = 'TDM',
  TDY = 'TDY',
  CMX = 'CMX',
  WMX = 'WMX',
}

export enum UpsServiceType {
  Next_Day_Air = '01',
  Second_Day_Air = '02', // 2nd Day Air
  Ground = '03',
  Express = '07',
  Expedited = '08',
  UPS_Standard = '11',
  Three_Day_Select = '12', // 3 Day Select
  Next_Day_Air_Saver = '13',
  UPS_Next_Day_Air_Early = '14',
  UPS_Worldwide_Economy_DDU = '17',
  Express_Plus = '54',
  Second_Day_Air_A_M = '59', // 2nd Day Air A.M.
  UPS_Saver = '65',
  First_Class_Mail = 'M2',
  Priority_Mail = 'M3',
  Expedited_MaiI_Innovations = 'M4',
  Priority_Mail_Innovations = 'M5',
  Economy_Mail_Innovations = 'M6',
  MaiI_Innovations_Returns = 'M7',
  UPS_Access_PointTM_Economy = '70',
  UPS_Worldwide_Express_Freight_Midday = '71',
  UPS_Worldwide_Economy = '72',
  UPS_Express_12_00 = '74', // UPS Express®12=00
  UPS_Today_Standard = '82',
  UPS_Today_Dedicated_Courier = '83',
  UPS_Today_Intercity = '84',
  UPS_Today_Express = '85',
  UPS_Today_Express_Saver = '86',
  UPS_Worldwide_Express_Freight = '96',
}

export const Services = {
  ...DhlServiceType,
  ...UpsServiceType,
};

export type ServiceType = DhlServiceType & UpsServiceType;
