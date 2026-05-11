//Credenciais do Bling
let clientId = 'YOUR_CLIENT_ID'
let clientSecret = 'YOUR_CLIENT_SECRET';
let globalUrl = 'BLING_URL_API';

// Credenciais da panilha e abas
let app = SpreadsheetApp;
let spreadSheet = app.getActiveSpreadsheet();
let sheetConfig = spreadSheet.getSheetByName('CONFIGURATION_PAGE');
let sheetProdutos = spreadSheet.getSheetByName('MAIN_PAGE');


let acessToken = sheetConfig.getRange('spreadsheet_access_token');
let refreshToken = sheetConfig.getRange('spreadsheet_refresh_token');
