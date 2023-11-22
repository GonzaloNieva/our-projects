(function(window){
























	


	var addButtons = document.querySelectorAll('.item-add');
	var shopCart = document.querySelector('.shop-cart');

	var cartPricing = {
		cartList: {},
		priceTotal: 0,
		promoSavings: 0,
		addItem: function(id, price, quantity){
			this.cartList[id] = {"price":+price, "quantity": quantity};
			this.updatePrice();
		},
		removeItem: function(id){
			delete this.cartList[id];
			this.updatePrice();
		},
		updatePrice: function(){
			var sum = 0;
			for(id in this.cartList){
			sum += this.cartList[id].price * this.cartList[id].quantity;

			}this.cartList[id]
			this.priceTotal = sum;
		}
	}

	// Esconder el carrito, minimizar
	document.getElementById('keep-shopping').addEventListener('click', function(){
		shopCart.classList.add('hide');
		document.getElementById('display-cart').classList.remove('hide');
	});

	// Mostrar el carrito, si hay items
	document.getElementById('display-cart').addEventListener('click', function(){
		shopCart.classList.remove('hide');
		this.classList.add('hide');
	});

	// Agregar producto al carrito
	for(var i = 0; i < addButtons.length; i++){
		addButtons[i].addEventListener('click', function(){
			//Adquirimos los detalles del producto
			var itemName = this.parentNode.querySelector('.item-name').innerHTML;
			var itemPrice = this.parentNode.querySelector('.item-price .price').innerHTML;
			var itemImage = this.parentNode.querySelector('img').getAttribute('src');
			
			//Armar y agregar un nuevo item al carrito
			shopCart.querySelector('.shop-cart-list').appendChild(buildCartItem(itemName, itemPrice, itemImage));
			//Mostrar el carrito, si estaba escondido
			shopCart.classList.remove('hide');
			// Actualizacion de precio
			displayPriceTotal(cartPricing.priceTotal);
		})
	}

	//Armado del producto en el  carrito
	function buildCartItem(name, price, image){
		// armar elemento
		var cartItem = document.createElement('li');
		cartItem.className = 'cart-item';

		// Agregamos el item del carrito a la lista de precios y le damos un id
		cartPricing.addItem(Object.keys(cartPricing.cartList).length + 1, price, 1);
		cartItem.setAttribute('data-id', Object.keys(cartPricing.cartList).length);

		// Llenamos los elementos del item del carrito
		var cartImage = "<img src='"+image+"' alt=''>";
		var cartName = "<a href='' class='cart-item-name'>" + name + "</a>";
		var cartPrice = "<div class='cart-item-price'>$<span class='price'>"+ price +"</span></div>";
		cartItem.innerHTML = cartImage + cartName +
													"<input type='text' class='cart-item-quantity' placeholder='1' value='1'>"+
													cartPrice+"<button class='cart-item-remove'>X</button>";

		//Aplicacion del evento para quitar elementos
		cartItem.querySelector('.cart-item-remove').addEventListener('click', function(){
			removeCartItem(this.parentNode);
		});

		// Actualizacion del carro (precio) cuando cambia la cantidad
		cartItem.querySelector('.cart-item-quantity').addEventListener('blur', function(){
			// Si la cantidad del producto en el carrito es 0, se quita
			if(this.value == 0)
				removeCartItem(this.parentNode);
			else if(this.value){
				// Actualiza el precio cuando cambia
				let itemPrice = cartPricing.cartList[this.parentNode.getAttribute('data-id')].price;
				cartPricing.addItem(this.parentNode.getAttribute('data-id'), itemPrice, +this.value);
				// Muestra el nuevo precio
				this.parentNode.querySelector('.cart-item-price .price').innerHTML = (itemPrice * +this.value).toFixed(2);
				displayPriceTotal(cartPricing.priceTotal);
			}
		});
		return cartItem;
	}

	function removeCartItem(node){
		// Actualizacion del objeto
		cartPricing.removeItem(node.getAttribute('data-id'));
		// Quitar elemento
		node.remove();
		displayPriceTotal(cartPricing.priceTotal);
		// Si no hay elementos en el carrito, se esconde
		if(Object.keys(cartPricing.cartList).length == 0)
			shopCart.classList.add('hide');
	}

	function displayPriceTotal(price){
		document.querySelector('.cart-total-num .price').innerHTML = price.toFixed(2);
	}


























})(window);