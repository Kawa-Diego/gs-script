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

Você deve armazenar em outra página desta panilha os Id's coletados da sua [aplicação](https://github.com/Kawa-Diego/gs-script/new/main?filename=README.md#iniciando-as-configura%C3%A7%C3%B5es)



# Instruções de uso do código e funções



  A crendencial globalUrl aprensetada, refere-se a API de busca do próprio Bling, documentado em [Produtos](https://developer.bling.com.br/referencia#/Produtos)
  A string que armazena
  
    Guia:
     - API_BLING_OAUTH_API = api oficial de rota de autenticação do Bling;
     - REFRESH_TOKEN = primeiro token retornado ao realizar a busca via método HTTP - POST;
     - 
     
## Autenticação 

A função [`getToken`](https://github.com/Kawa-Diego/gs-script/blob/main/Autenticacao.gs) realiza a busca de um refreshToken
