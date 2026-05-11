function getProducts() {
  getRefreshToken();

  let row = 2;
  let options = {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${acessToken.getValue()}`
    }
  }

  let req = UrlFetchApp.fetch(globalUrl, options)
  let res = JSON.parse(req.getContentText());
  let produto = res.data;
  let estoque;

  res.data.map((elem, index, object) => {
    sheetProdutos.getRange(`A${row}:G${row}`).setValues([
      [
        elem.id,
        elem.nome,
        elem.preco,
        estoque = (produto.estoque && produto.estoque.saldoVirtualTotal !== undefined)
          ? produto.estoque.saldoVirtualTotal : 0,
        elem.tipo,
        elem.situacao,
        elem.formato,
      ]
    ])
    console.log(estoque)
    row++;
  })

  let id = sheetProdutos.getRange(`A2:A`).getValues();
  id.map((elem, index, object) => {

  })
};

function getMultiplosProdutos() {
  getRefreshToken();
  sheetProdutos.getRange('A2:J').clearContent();
  let page = 1;
  let fim = false;
  let row = 2;
  let arr = [];

  let options = {
    'method': 'GET',
    'muteHttpExceptions': true,
    'headers': {
      'Authorization': `Bearer ${acessToken.getValue()}`,
      'accept': '*/*'
    }
  }

  while (fim == false) {

    let reqs = UrlFetchApp.fetch(globalUrl + `?pagina=${page}`, options);
    let ress = JSON.parse(reqs.getContentText());
    let produto = ress.data;
    let estoque;
    Utilities.sleep(2000);
    console.log(produto.length);


    if (produto.length > 0) {
      produto.map((elem, ind, obj) => {
        arr.push([
          elem.id,
          elem.nome,
          elem.preco,
          estoque = (produto.estoque && produto.estoque.saldoVirtualTotal !== undefined)
            ? produto.estoque.saldoVirtualTotal : 0,
          elem.tipo,
          elem.situacao,
          elem.formato,
        ])
        row++;
      });
    } else {
      fim = true;
    }
    page++;
  }

  sheetProdutos.getRange(`A2:G${arr.length + 1}`).setValues(arr);
}


