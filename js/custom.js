$("[data-countdown]").each(function(){var n=$(this),s=$(this).data("countdown");n.countdown(s,function(n){$(this).html(n.strftime('<span class="countdown-section"><span class="countdown-amount hover-up">%D</span><span class="countdown-period"> days </span></span><span class="countdown-section"><span class="countdown-amount hover-up">%H</span><span class="countdown-period"> hours </span></span><span class="countdown-section"><span class="countdown-amount hover-up">%M</span><span class="countdown-period"> mins </span></span><span class="countdown-section"><span class="countdown-amount hover-up">%S</span><span class="countdown-period"> sec </span></span>'))})});




$(document).ready(function(){

$('#itemslider').carousel({ interval: 3000 });

$('.carousel-showmanymoveone .item').each(function(){
var itemToClone = $(this);

for (var i=1;i<6;i++) {
itemToClone = itemToClone.next();

if (!itemToClone.length) {
itemToClone = $(this).siblings(':first');
}

itemToClone.children(':first-child').clone()
.addClass("cloneditem-"+(i))
.appendTo($(this));
}
});
});














(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
});



// add to cart jQuery

 let products = [];

    function toShort(str,max=50){

        if(str.length > max){
            return  str.substring(0,max)+"....."
        }

        return str;

    }

    function toShow(x){
        $("#products").empty();
        x.map(product=> {
            $("#products").append(`

            <div class="card product pt-4">
                <img src="${product.image}" class="card-img-top" alt="">
                <div class="card-body border rounded">
                    <p class="card-title font-weight-bold text-nowrap overflow-hidden text-primary">
                    ${product.title}
                    </p>
                    <small class="text-black-50">
                    ${toShort(product.description, 120)}
                    </small>
                    <div class="d-flex justify-content-between align-items-end mt-3">
                        <span class="font-weight-bold">${product.price}</span>
                        <button class="btn btn-sm btn-outline-primary add-to-cart" data-id="${product.id}">
                        Add <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>

            `)
        })
    }

    function cartTotal(){

        let count = $(".item-in-cart-cost").length;

        $(".item-in-cart-count").html(count);


        if(count>0){
            let totalCost = $(".item-in-cart-cost").toArray().map(el=>el.innerHTML).reduce((x,y)=>Number(x)+Number(y));
            // console.log(typeof totalCost);
            $(".total").html(`

                <div class="d-flex justify-content-between font-weight-bold px-3">
                    <h4>Total</h4>
                    <h4>$ <span class="cart-cost-total">${Number(totalCost).toFixed(2)}</span></h4>
                </div>

            `)
        }else{
            $(".total").html("empty cart")
        }

    }



    $.get("https://fakestoreapi.com/products/",function (data) {
        products = data;
        toShow(products);
    })

    $("#search").on("keyup",function () {
        let keyword = $(this).val().toLowerCase();
        // $(".product").filter(function () {
        //
        //     $(this).toggle($(this).text().toLowerCase().indexOf(keyword) > -1);
        //
        // });

        console.log();

        if(keyword.trim().length){

            let filterProducts = products.filter(product=>{
                if(product.title.toLowerCase().indexOf(keyword) > -1 || product.description.toLowerCase().indexOf(keyword) > -1 || product.price == keyword){
                    return product;
                }
            })

            toShow(filterProducts);
        }

    });

    $.get("https://fakestoreapi.com/products/categories",function (data) {
        data.map(cat => $("#category").append(`<option value="${cat}">${cat}</option>`))
    })

    $("#category").on("change",function () {

        let selectedCategory = $(this).val();
        console.log(typeof selectedCategory);

        if(selectedCategory != 0){
            let filterProducts = products.filter(product=>{
                if(product.category === selectedCategory){
                    return product;
                }
            })

            toShow(filterProducts);
        }else{
            toShow(products);
        }
    })



    $("#products").delegate(".add-to-cart","click",function () {
        let currentItemId = $(this).attr("data-id");

        let productInfo = products.filter(el=>el.id == currentItemId)[0];

        if($(".item-in-cart").toArray().map(el=>el.getAttribute("data-id")).includes(currentItemId)){

            alert("Already Added")

        }else{

            $("#cart").append(`
        <div class="card border-0 item-in-cart" data-id="${productInfo.id}">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-end">
                    <img src="${productInfo.image}" class="img-in-cart" alt="">
                    <button class="btn btn-outline-danger remove-from-cart">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
                <p class="mt-3">
                    ${productInfo.title}
                </p>
                <div class="d-flex justify-content-between align-items-end">
                    <div class="form-row">
                        <button class="btn btn-outline-primary quantity-minus">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="form-control w-25 mx-2 quantity" unitPrice="${productInfo.price}" value="1" min="1">
                        <button class="btn btn-outline-primary quantity-plus">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <p class="mb-0">$ <span class="item-in-cart-cost">${productInfo.price}</span></p>
                </div>
                <hr>
            </div>
        </div>
        `);

        }

        cartTotal();

    })

    $("#cart").delegate(".remove-from-cart","click",function () {

        $(this).parentsUntil("#cart").remove();
        cartTotal();

    })

    $("#cart").delegate(".quantity-plus","click",function () {

        let q =$(this).siblings(".quantity").val();
        let p = $(this).siblings(".quantity").attr("unitPrice");
        let newQ = Number(q)+1;
        let newCost = p * newQ;
        // console.log(p);
        $(this).siblings(".quantity").val(newQ);
        $(this).parent().siblings("p").find(".item-in-cart-cost").html(newCost.toFixed(2));
        cartTotal();
    })

    $("#cart").delegate(".quantity-minus","click",function () {

        let q =$(this).siblings(".quantity").val();
        let p = $(this).siblings(".quantity").attr("unitPrice");
        if(q>1){

            let newQ = Number(q)-1;
            let newCost = p * newQ;
            // console.log(p);
            $(this).siblings(".quantity").val(newQ);
            $(this).parent().siblings("p").find(".item-in-cart-cost").html(newCost.toFixed(2));
            cartTotal();

        }

    })

    $("#cart").delegate(".quantity","keyup change",function () {

        let q =$(this).val();
        let p = $(this).attr("unitPrice");
        if(q>1){

            let newQ = Number(q);
            let newCost = p * newQ;
            // console.log(p);
            $(this).val(newQ);
            $(this).parent().siblings("p").find(".item-in-cart-cost").html(newCost.toFixed(2));
            cartTotal();

        }else{
            alert("more than one");
        }

    })




// ========================= add to cart  ========================= 


// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];
  
  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for(var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>" 
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = " 
      + "<td>" + cartArray[i].total + "</td>" 
      +  "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();




//////////// bottom to top scroll //////////////

var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});




