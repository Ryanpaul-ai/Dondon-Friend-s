const shoes=[
{id:1,name:"Urban Runner",cat:"Sneakers",price:2499,tag:"BESTSELLER",image:"urban-runner.jpg"},
{id:2,name:"Cloud Flex",cat:"Running",price:3299,tag:"NEW",image:"cloud-flex.jpg"},
{id:3,name:"Street Classic",cat:"Casual",price:1899,tag:"",image:"street-classic.jpg"},
{id:4,name:"Midnight Force",cat:"Sneakers",price:3599,tag:"POPULAR",image:"midnight-force.jpg"},
{id:5,name:"Speed Pulse",cat:"Running",price:2899,tag:"",image:"speed-pulse.jpg"},
{id:6,name:"Everyday Walk",cat:"Casual",price:1599,tag:"",image:"everyday-walk.jpg"},
{id:7,name:"Retro Court",cat:"Sneakers",price:2799,tag:"TRENDING",image:"retro-court.jpg"},
{id:8,name:"Air Motion",cat:"Running",price:3899,tag:"NEW",image:"air-motion.jpg"}
];
let category="All",cart=[];
const $=id=>document.getElementById(id),money=n=>"₱"+n.toLocaleString("en-PH");
function render(){let list=shoes.filter(p=>(category==="All"||p.cat===category)&&p.name.toLowerCase().includes($("search").value.toLowerCase()));let s=$("sort").value;if(s==="low")list.sort((a,b)=>a.price-b.price);if(s==="high")list.sort((a,b)=>b.price-a.price);if(s==="name")list.sort((a,b)=>a.name.localeCompare(b.name));$("resultCount").textContent=list.length+" products";$("products").innerHTML=list.map(p=>`<article class="product"><div class="shoe-art"><img src="assets/shoes/${p.image}" alt="${p.name} sneaker" loading="lazy"></div><div class="product-info"><div class="product-meta"><span>${p.cat}</span><b class="tag">${p.tag}</b></div><h3>${p.name}</h3><div class="price-row"><span class="price">${money(p.price)}</span><button class="add" data-add="${p.id}">🛒 Add to Cart</button></div></div></article>`).join("");$("noResults").style.display=list.length?"none":"block"}
function renderCart(){$("cartCount").textContent=cart.reduce((s,p)=>s+p.qty,0);$("cartItems").innerHTML=cart.length?cart.map(p=>`<div class="cart-item"><div><b>${p.name}</b><div class="muted">${money(p.price)} × ${p.qty}</div></div><div><button class="qty" data-qty="${p.id}" data-delta="-1">−</button> ${p.qty} <button class="qty" data-qty="${p.id}" data-delta="1">+</button></div></div>`).join(""):'<p class="muted">Your cart is empty. Find your perfect pair!</p>';$('cartTotal').textContent=money(cart.reduce((s,p)=>s+p.price*p.qty,0))}
$("filters").addEventListener("click",e=>{let b=e.target.closest("[data-category]");if(!b)return;category=b.dataset.category;document.querySelectorAll(".chip[data-category]").forEach(x=>x.classList.toggle("active",x===b));render()});
$("search").addEventListener("input",render);$("sort").addEventListener("change",render);
$("products").addEventListener("click",e=>{let b=e.target.closest("[data-add]");if(!b)return;let p=shoes.find(x=>x.id===+b.dataset.add),item=cart.find(x=>x.id===p.id);if(item)item.qty++;else cart.push({...p,qty:1});renderCart();b.textContent="✓ Added";setTimeout(()=>{if(b.isConnected)b.textContent="🛒 Add to Cart"},900)});
$("cartItems").addEventListener("click",e=>{let b=e.target.closest("[data-qty]");if(!b)return;let p=cart.find(x=>x.id===+b.dataset.qty);p.qty+=+b.dataset.delta;if(p.qty<=0)cart=cart.filter(x=>x.id!==p.id);renderCart()});
$("cartToggle").onclick=()=>{$("cart").classList.add("show");$("cart").scrollIntoView({behavior:"smooth"})};$("closeCart").onclick=()=>$ ("cart").classList.remove("show");$("explore").onclick=()=>$("collection").scrollIntoView({behavior:"smooth"});
$("checkout").onclick=()=>$("message").textContent=cart.length?"Demo only: connect a payment and ordering service to accept real orders.":"Please add a pair of shoes first.";
render();renderCart();
