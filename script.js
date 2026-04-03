// Carrinho na página index.html
let cart = [];

function addToCart(service, price) {
  cart.push({ service, price });
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<li>Nenhum item adicionado</li>';
    cartTotal.textContent = 'Total: R$ 0';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.service} - R$ ${item.price}`;
    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.onclick = () => removeFromCart(index);
    li.appendChild(btn);
    cartItems.appendChild(li);
  });
  cartTotal.textContent = `Total: R$ ${total}`;
}

function handleCheckout(event) {
  event.preventDefault();

  if (cart.length === 0) {
    alert('Por favor, adicione ao menos um serviço ao carrinho antes de finalizar.');
    return false;
  }
  
  const name = event.target.name.value.trim();
  const email = event.target.email.value.trim();
  const phone = event.target.phone.value.trim();

  if (!name || !email || !phone) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return false;
  }

  const messageBox = document.getElementById('form-message');
  messageBox.textContent = 'Enviando pedido...';

  // Simula envio do pedido com um delay
  setTimeout(() => {
    messageBox.textContent = 'Pedido enviado com sucesso! Entraremos em contato em breve.';
    event.target.reset();
    cart = [];
    updateCart();
  }, 1500);

  return false;
}

// Função para validação do formulário na página form.html
function validarFormulario() {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  
  if (!nome || !email || !phone) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }
  
  // Validação simples do email utilizando expressão regular
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    alert("Por favor, insira um email válido.");
    return false;
  }
  
  return true;
}