function getToken() {
  let credentials = Utilities.base64Encode(clientId + ':' + clientSecret);
  let options = {
    method: 'post',
    payload: {
      'grant_type':'authorization_code',
      'code':'REFRESH_TOKEN' // primeiro refresh token gerado ao realizar a requisição da url 
    },
    contentType : 'application/x-www-form-urlencoded',
    headers: {
      'Authorization': `Basic ${credentials}`
    }
  };

  let req = UrlFetchApp.fetch('BLING_OAUTH_TOKEN_API', options);
  let res = JSON.parse(req.getContentText());
  console.log(res)
}



function getRefreshToken() {
  let credentials = Utilities.base64Encode(clientId + ':' + clientSecret);
  let options = {
    method: 'post',
    payload: {
      'grant_type': 'refresh_token',
      'refresh_token': refreshToken.getValue() 
    },
    contentType : 'application/x-www-form-urlencoded',
    headers: {
      'Authorization': `Basic ${credentials}`
    }
  };

  let req = UrlFetchApp.fetch('BLING_OAUTH_TOKEN_API', options);
  let res = JSON.parse(req.getContentText());
  acessToken.setValue(res.access_token);
  refreshToken.setValue(res.refresh_token);
  console.log(res)
}
