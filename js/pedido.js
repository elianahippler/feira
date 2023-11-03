const lanches = [
    {id: 0, nome: 'Cachorro-quente', img: '../feira/imagens/produtos/cachorro-quente.jpg', preco: 5.00, quantidade: 0},
    {id: 1, nome: 'Pastel', img: '../feira/imagens/produtos/pastel.jpg', preco: 5.00, quantidade: 0},
    {id: 2, nome: 'Coxinha', img: '../feira/imagens/produtos/coxinha.jpg', preco: 5.00, quantidade: 0},
    {id: 3, nome: 'Crepe', img: '../feira/imagens/produtos/crepe.jpg', preco: 5.00, quantidade: 0},
];

const bebidas = [
    {id: 4, nome: 'Coca-cola (350ml)', img: '../feira/imagens/produtos/coca-cola.jpg', preco: 5.00, quantidade: 0},
    {id: 5, nome: 'Guaraná (350ml)', img: '../feira/imagens/produtos/guarana.jpg', preco: 5.00, quantidade: 0},
    {id: 6, nome: 'Fanta Uva (350ml)', img: '../feira/imagens/produtos/fanta-uva.jpg', preco: 5.00, quantidade: 0},
    {id: 7, nome: 'Fanta Laranja (350ml)', img: '../feira/imagens/produtos/fanta-laranja.jpg', preco: 5.00, quantidade: 0},
];

const doces = [
    {id: 8, nome: 'Chocolate', img: '../feira/imagens/produtos/chocolate.jpg', preco: 5.00, quantidade: 0},
    {id: 9, nome: 'Kitkat', img: '../feira/imagens/produtos/kitkat.jpg', preco: 5.00, quantidade: 0},
    {id: 10, nome: 'Brigadeiro', img: '../feira/imagens/produtos/brigadeiro.jpg', preco: 5.00, quantidade: 0},
    {id: 11, nome: 'Beijinho', img: '../feira/imagens/produtos/beijinho.jpg', preco: 5.00, quantidade: 0},
];

const allItems = lanches.concat(bebidas, doces);

document.getElementById("cliente").addEventListener("submit", function (event) {
    event.preventDefault();
    alert('Clique no botão para Visualizar seu pedido!')
});

function calcularEExibirTotalCarrinho() {
    let totalCarrinho = 0;
    allItems.forEach(item => {
        totalCarrinho += item.preco * item.quantidade;
    });

    const visualizarPedidoButton = document.getElementById('visualizarPedidoButton');
    visualizarPedidoButton.textContent = `(R$ ${totalCarrinho.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}) Visualizar Pedido 🡢`;
}

function adicionarAoCarrinho(key) {
    const item = allItems[key];
    item.quantidade++;
    atualizarCarrinho();
    atualizarQuantidadeProduto(key);
    calcularEExibirTotalCarrinho();
    salvarCarrinhoNoLocalStorage();
    return false;
}

calcularEExibirTotalCarrinho();

function removerDoCarrinho(key) {
    const item = allItems[key];
    if (item.quantidade > 0) {
        item.quantidade--;
        atualizarCarrinho();
        atualizarQuantidadeProduto(key);
        calcularEExibirTotalCarrinho();
        salvarCarrinhoNoLocalStorage();
    } return false;
}

function limparCarrinho() {
    allItems.forEach(item => {
        item.quantidade = 0;
        atualizarQuantidadeProduto(item.id);
    });
    atualizarCarrinho();
    calcularEExibirTotalCarrinho();
    salvarCarrinhoNoLocalStorage();
}

function inicializarCarrinhoDoLocalStorage() {
    const carrinhoDoLocalStorage = JSON.parse(localStorage.getItem('carrinho'));
    if (carrinhoDoLocalStorage) {
        allItems.forEach((item, index) => { 
            item.quantidade = carrinhoDoLocalStorage[index].quantidade;
        });

        allItems.forEach((item, index) => {
            atualizarQuantidadeProduto(index);
        });
    }
}

function salvarCarrinhoNoLocalStorage() {
    const carrinhoParaSalvar = allItems.map(item => {
        return { quantidade: item.quantidade };
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinhoParaSalvar));
}

function inicializarLoja(categoria, containerId) {
    const containerProdutos = document.getElementById(containerId);
    categoria.forEach((val) => {
        containerProdutos.innerHTML += `
        <div class="produto-single" id="${val.id}">
            <img src="${val.img}"/>
            <p class="nomeproduto">${val.nome}</p>
            <p class="precoproduto">R$ ${val.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <button class="btnadd" onclick="adicionarAoCarrinho(${val.id})" id="botao-${val.id}">+</button>
            <p class="quantidade-no-carrinho"><span class="quantidade-carrinho-${val.id}">${val.quantidade}</span></p>
            <button class="btnrmv" onclick="removerDoCarrinho(${val.id})" id="botao-remover-${val.id}">-</button>
        </div>`;
    });
}

function atualizarQuantidadeProduto(key) {
    const item = allItems[key];
    const produtoElement = document.getElementById(item.id);
    if (produtoElement) {
        const quantidadeElement = produtoElement.querySelector(`.quantidade-carrinho-${item.id}`);
        if (quantidadeElement) {
            quantidadeElement.textContent = item.quantidade;
            if (item.quantidade > 0) {
                produtoElement.classList.add('selecionado');
            } else {
                produtoElement.classList.remove('selecionado');
            }
        }
    }
}

function atualizarCarrinho() {
    var containerCarrinho = document.getElementById('carrinho');
    containerCarrinho.innerHTML = "";
    allItems.forEach((val) => {
        if (val.quantidade > 0) {
            containerCarrinho.innerHTML += `
            <div class="info-single-checkout">
                <p style="float:left;">Produto: ${val.nome}</p>
                <p style="float:right; margin-left: 15px;"> Quantidade: ${val.quantidade}</p>
                <p style="float:right;">Valor unitário: R$ ${val.preco.toFixed(2)}</p>
                <button onclick="removerDoCarrinho(${val.id})">Remover</button>
                <div style="clear:both;"></div>
            </div>`;
        }
    });
}

function validarPedido() {
    const produtosSelecionados = allItems.some(item => item.quantidade > 0);
    if (produtosSelecionados == "") {
        alert('Nenhum produto foi selecionado. Selecione pelo menos um produto antes de continuar.');
        return false
    } return true
}

function validarNome() {
    var nomeInput = document.getElementById("nome");
    if (nomeInput.value === "") {
        alert("Por favor, preencha seu nome antes de continuar.");
        nomeInput.focus();
        return false;
    } return true;
}

function redirecionarParaCarrinho() {
    if (validarPedido() && validarNome()) {
    window.location.href = 'carrinho.html';
    }
}

const campoNome = document.getElementById('nome');
const visualizarPedidoButton = document.getElementById('visualizarPedidoButton');

visualizarPedidoButton.addEventListener('click', function () {
    const nome = campoNome.value;
    const nomeCompleto = nome;
    console.log('Nome Completo:', nomeCompleto);
    localStorage.setItem('nome', nome);
});

inicializarLoja(lanches, 'produtosLanches');
inicializarLoja(bebidas, 'produtosBebidas');
inicializarLoja(doces, 'produtosDoces');
inicializarCarrinhoDoLocalStorage();
atualizarCarrinho();
calcularEExibirTotalCarrinho();