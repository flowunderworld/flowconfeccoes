// ===== CALCULADORA DE ORÇAMENTO =====
const productSelect = document.getElementById('product');
const quantityInput = document.getElementById('quantity');
const colorsSelect = document.getElementById('colors');
const totalPriceEl = document.getElementById('totalPrice');
const screensCostEl = document.getElementById('screensCost');
const piecesCostEl = document.getElementById('piecesCost');
const summaryEl = document.getElementById('summary');
const whatsappBtn = document.getElementById('whatsappBtn');

let hasInteracted = false;

// Zera o input quando o usuário clica nele pela primeira vez
if (quantityInput) {
    quantityInput.addEventListener('focus', function() {
        if (!hasInteracted) {
            this.value = '';
            hasInteracted = true;
        }
    });

    // Se o usuário sair sem digitar nada, volta para 10
    quantityInput.addEventListener('blur', function() {
        if (this.value === '' || parseInt(this.value) < 1) {
            this.value = '10';
        }
    });
}

function calculatePrice() {
    if (!productSelect || !colorsSelect || !quantityInput) return;

    const productOption = productSelect.options[productSelect.selectedIndex];
    const colorsOption = colorsSelect.options[colorsSelect.selectedIndex];
    const quantity = parseInt(quantityInput.value) || 0;

    if (!productOption.value || !colorsOption.value || quantity < 1) {
        totalPriceEl.textContent = 'R$ 0,00';
        screensCostEl.textContent = 'R$ 0,00';
        piecesCostEl.textContent = 'R$ 0,00';
        return;
    }

    const pricePerPiece = parseFloat(productOption.dataset.price);
    const numberOfColors = parseInt(colorsOption.value);

    // Lógica das telas: < 10 peças = R$ 70 por tela, >= 10 peças = R$ 50 por tela
    let screenPrice;
    if (quantity < 10) {
        screenPrice = 70;
    } else {
        screenPrice = 50;
    }

    const totalScreensCost = numberOfColors * screenPrice;
    const totalPiecesCost = quantity * pricePerPiece;
    const totalCost = totalScreensCost + totalPiecesCost;

    totalPriceEl.textContent = `R$ ${totalCost.toFixed(2).replace('.', ',')}`;
    screensCostEl.textContent = `R$ ${totalScreensCost.toFixed(2).replace('.', ',')}`;
    piecesCostEl.textContent = `R$ ${totalPiecesCost.toFixed(2).replace('.', ',')}`;

    updateSummary();
}

function updateSummary() {
    const product = productSelect.options[productSelect.selectedIndex];
    const colors = colorsSelect.options[colorsSelect.selectedIndex];

    if (product.value && colors.value) {
        summaryEl.style.display = 'block';
        document.getElementById('summaryProduct').textContent = product.text.split(' - ')[0];
        document.getElementById('summaryQuantity').textContent = quantityInput.value + ' unidades';
        document.getElementById('summaryColors').textContent = colors.text;
    }
}

if (productSelect) productSelect.addEventListener('change', calculatePrice);
if (colorsSelect) colorsSelect.addEventListener('change', calculatePrice);
if (quantityInput) quantityInput.addEventListener('input', calculatePrice);

if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
        const product = productSelect.options[productSelect.selectedIndex];
        const colors = colorsSelect.options[colorsSelect.selectedIndex];

        if (!product.value || !colors.value) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const quantity = parseInt(quantityInput.value);
        const screenPrice = quantity < 10 ? 70 : 50;

        const message = `Olá! Realizei uma cotação pelo seu WebSite.
Aqui estão os detalhes do pedido conforme calculado:

*Produto:* ${product.text.split(' - ')[0]}
*Quantidade:* ${quantity} unidades
*Cores (Telas):* ${colors.text}
*Custo das Telas:* ${screensCostEl.textContent} (R$ ${screenPrice},00 por tela)
*Valor das Peças:* ${piecesCostEl.textContent}

*VALOR TOTAL:* ${totalPriceEl.textContent}

Aguardo retorno!`;

        const whatsappNumber = '5511984651912';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
    });
}