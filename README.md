# Instruções para primeiro uso

Ao abrir a página inicial, vá em `Central de Extensões`

<img width="1574" height="91" alt="Imagem-inicial" src="https://github.com/user-attachments/assets/21965eca-9a13-4eab-9354-d5d27dae5a60" />
<br >
Entre em `área do integrador`
<img width="1684" height="132" alt="Imagem 2" src="https://github.com/user-attachments/assets/304915f3-9c44-4f4d-8414-de1f9c7dcbcb" />
<br />

Você verá esta tela. Clique em `Criar aplicativo` para criar uma nova instância.<br>
<img width="1697" height="327" alt="image" src="https://github.com/user-attachments/assets/fdaa1984-bebf-4d0d-95f5-8553932a52e9" />
<br/>

Mantenha os acessos de conexão à API padrão, e vá em próximo, localizado ao canto inferior direito da página.
<img width="1686" height="852" alt="Imagem 3" src="https://github.com/user-attachments/assets/129723dd-e518-4943-9dca-1ec07d08f3ef" />
<br/>

Dê o nome que desejar à sua aplicação, selecione a categoria que você deseja que sua categoria consiga se conectar.<br>

<img width="1401" height="860" alt="Imagem 4" src="https://github.com/user-attachments/assets/cbf94507-1286-4bcd-af29-6be2cdf49d55" />
<br />

Você deve inserir uma curta descrição sobre sua aplicação.
Insira uma url para redirecionamento (ela é obrigatória. Ela proverá o código que irá gerar um token temporário, com uma duração de cerca de 60 segundos).
<br />
Selecione os escopos que deseja para sua aplicação.
<img width="1412" height="868" alt="image" src="https://github.com/user-attachments/assets/5d0babc0-d996-470b-a7a0-6a401095e04f" />
Logo após, clique em `Salvar dados básicos`.

<br />

Sua aplicação já estará disponível para uso dentro da área de Extensões. <br>
<br />

# Iniciando as configurações

Ao abrir sua aplicação dentro da aba de extensões, Clique em Informações do app. <br>
<img width="313" height="613" alt="image" src="https://github.com/user-attachments/assets/0c8dda42-256e-4d14-a73f-de5d86ce8159" />
<br />

Você deverá copiar os dois primeiros códigos tipo Client e armazene-os em variáveis. Iremos utilizá-los mais tarde
<img width="993" height="667" alt="imagem 5" src="https://github.com/user-attachments/assets/307704f3-c0f5-482e-80c6-9e0ad6a80327" />
<br />


# Iniciando com panilhas

Para o caso de uso da aplicação para retorno de estoque, devemos estruturar uma panilha para retornar os dados através da API do Bling. <br>
<br>

 - Crie sua panilha dentro do Google Sheets e nomeie-o como desejar. <br>

Dentro da panilha utilizei cabeçalhos, como na imagem abaixo.
Esta será a base para armazenar nossos dados: Id do produto, Nome valor, quantidade ...
<img width="1557" height="46" alt="image" src="https://github.com/user-attachments/assets/c40cec1c-44cc-4470-8557-975841aa1888" />
<br>

Você deve armazenar em outra página desta panilha os Id's coletados da sua aplicação
Clique na opção localizada no canto inferior esquerdo da página e clique no ícone (` + `)

Você irá criar cabeçalhos com os nomes das variáveis clientId e clientSecret, e armazenar os dados que você copiou, como instruído em [Iniciando as configurações](https://github.com/Kawa-Diego/gs-script/blob/main/README.md#iniciando-as-configurações)
<br />
<br />

# Configuração de variáveis globais

Iremos utilizar a ferramenta Google Scripts, localizado logo abaixo o nome da sua panilha:
<img width="762" height="122" alt="image" src="https://github.com/user-attachments/assets/869221df-96ed-4a87-9ee0-a12e8f438928" /><br>

Iniciando, vamos primeiro atribuir valores às variáveis em [`global.gs`](https://github.com/Kawa-Diego/gs-script/blob/main/global.gs).
<br>

 - `clientId` e `clientSecret` você vai inserir os mesmos dados que você salvou na panilha. `globalUrl` é o link da API de produtos da Bling. <br>
 - A variável `sheetConfig` irá se conectar com a página de configuração dos client's dentro da sua panilha. Atribua o nome da página dentro de (''). O mesmo vale para `sheetProdutos`.<br>
 - Em `acessToken` e `refreshToken` (valor resgatado na próxima seção), as variáveis se conectam com a linha 2 da sua página na panilha, e as atualiza conforme a função for chamada.
<br />

# Autenticação <br />
 
 ## getToken
 A função `getToken()` irá informar dentro do servidor as variáveis informadas conforme seus valores válidos. Para iniciar e retornar o primeiro refreshToken de sua aplicação, você deve abrir o link de convite    informado em [Inciando as configurações](https://github.com/Kawa-Diego/gs-script/blob/main/README.md#iniciando-as-configurações).<br/>
  Você irá informar o código que irá aparecer dentro da barra de pesquisa na url do site, sendo informado logo após "code=exABCDEFGHI". O código deve ser copiado até antes de `&`.
<br />
  Ao ser solicitado: `BLING_OAUTH_TOKEN_API`, você deverá informar: "https://www.bling.com.br/Api/v3/oauth/token". <br />
  Rodando com êxito, e imprimindo o resultado no console, você conseguira seus valores de accessToken e um novo refreshToken. Armazene estes valores na panilha em `__acessToken_` e `__refreshToken_`.
<br />

# Produtos <br />

 ## getProducts()
  Sempre que for chamar alguma função, deve fazer um callback de `refreshToken()` para atualizar os tokens e mantê-los sempre ativos.
  <br />
  <br>
  A primeira função `getProducts()` irá fazer um map, ou seja, um laço de repetição dentro de um JSON __data:{}_ que estará armazenando os dados necessários. Assim, irá 'pegar' a linha da panilha que seus respectivos nomes estão (getRange()), percorrendo de A, até a linha que você for utilizar, indo "de cima para baixo" utilizando um método *row*, e 'atribuir' valores a eles (setValues()).
<br>
  Existe um pequeno porém. O Bling permite, por padrão, retornar apenas 100 produtos por requisição. <br>
  Para contornar este problema, utilizaremos a próxima função.
<br />
<br>

## getMultiplosProdutos()
A função `getMultiplosProdutos()` tem a mesma finalidade que a função anterior. Entretanto, com um laço de repetição **while**, ele consegue percorrer e ir adiante, passando por páginas e retornando a quantidade de produtos em cada uma, retornando o total de produtos final dentro da panilha. <br>

Exemplo: 
- Se uma loja possui 400 produtos, o método padrão (getProducts()) retornaria apenas os 100 primeiros produtos. Já com o método getMultiplosProdutos(), ele vai passando e verificando a quantidade de páginas e a quantidade de produtos nelas, retornando o resultado final dentro da panilha. <br>

<br>

Adendo: o resultado padrão de quantidade de produtos poderá sair como: <saldoVirtualTotal>. Então, foi criado um método if - else para retornar apenas o valor numérico dele.<br>

Para automatizar a função, você deverá, dentro da página de scripts, entrar na aba de Acionadores.
<img width="275" height="288" alt="image" src="https://github.com/user-attachments/assets/f0a7bc1c-089f-44ee-80ee-4f6cf3bc5285" /><br>
Clique em `Adicionar acionador`
<img width="319" height="138" alt="image" src="https://github.com/user-attachments/assets/4a5046bb-a17a-4dc3-8254-0659872c2788" /><br>

Insira as informações a seguir:
<img width="728" height="779" alt="image" src="https://github.com/user-attachments/assets/61d00e9a-c0fe-49dc-925b-3e0ee46abc02" /><br />

Desta maneira, a função `getMultiplosProdutos` será acionado automaticamente a cada 1 hora, atualizando novos dados, caso existam.
