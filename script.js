// ---------- DATA (edit freely) ----------
const MENU = {
  "Today's Offers": null,
  "Electronics": {"Mobile phones":["Smartphones","iPhones","Tablets","Feature phones"],"Large appliances":["Refrigerators","Washing machines","Air conditioners"],"Entertainment":["TV & accessories","Cameras","Gaming","Laptops"],"Home appliances":["Rice cookers","Blenders","Microwave ovens","Vacuum cleaners"],"Small devices":["Wi-Fi dongles","Routers","SSD & hard disks","Memory cards"]},
  "Fashion": {"Girls' clothing":["Ethnic wear","Casual wear","Formal wear","Sportswear"],"Boys' clothing":["Jeans","T-shirts & polos","Shorts","Trousers"],"Jackets":["Blazers","Bomber jackets","Denim","Leather"],"Accessories":["Watches","Eyewear","Jewellery","Handbags"],"Beauty":["Perfumes","Lipsticks","Grooming","Gift hampers"]},
  "Kids & Toys": {"Kids clothing":["Ethnic wear","Sleepwear","Dresses","Winter wear"],"Baby care":["Lotions & oil","Baby food","Bath towels"],"Toys & games":["Arts & crafts","Educational","Outdoor play","Video games"]},
  "Home & Furniture": {"Kitchen":["Dinner sets","Cookware","Containers & jars"],"Furniture":["Bedroom","Living room","Office","Mattresses"],"Home decor":["Lighting","Painting","Curtains"],"Garden":["Gardening","Sheds","Outdoor storage"]},
  "Sports & Fitness": {"Single sports":["Bikes","Fishing","Cycling","Archery"],"Team sports":["Cricket","Badminton","Swimming gear"],"Fitness":["Exercise machines","Home gyms","Exercise bikes"],"Camping":["Tents","Sleeping bags","Coolers"]},
  "Grocery": {"Fresh":["Vegetables","Fruits","Dry fruits"],"Packed food":["Beverages","Baking","Candy & gum"],"Pets":["Dogs","Cats","Fish","Pet food"],"Household":["Laundry","Paper & plastic","Batteries"]},
  "Gifts & Office": {"Trending":["Best priced","Chocolates","Gift cards"],"Gifts":["Personalised gifts","Flowers","Photo books"],"Office":["Calendars","Mousepads","Phone cases"]},
  "Health & Beauty": {"Health":["Home health care","Vitamins","Diet & nutrition"],"Beauty":["Face wash","Makeup","Massage & spa"],"Pharmacy":["Home delivery","Transfer prescriptions","Health check-up"]},
  "Automotive": {"Motors":["Bikes","Scooters","Autos"],"Accessories":["GPS navigation","Bluetooth devices","Speakers"],"Safety":["Helmets","Sensors","Anti-theft"],"Car care":["Washes & cleaners","Wax & polish","Detailing kits"]},
  "Books & Media": {"Books":["Exam books","Academic","Journals","Children's"],"Music":["New releases","Collections","Boxed sets"],"Movies":["New releases","Classic","Animated"]}
};
const PRODUCTS = [
  ["Electronics","Audio speaker","🔊",100,null,"Sale","#dbeafe"],["Electronics","Refrigerator","🧊",300,null,"New","#e0f2fe"],
  ["Electronics","Smart phone","📱",70,null,"","#ede9fe"],["Electronics","Digital camera","📷",80,null,"","#fee2e2"],
  ["Fashion","T-shirt","👕",10,12.5,"20% off","#fce7f3"],["Fashion","Women's sandal","👡",20,null,"","#ffedd5"],
  ["Fashion","Jewellery","💍",60,null,"New","#fef9c3"],["Fashion","Party dress","👗",15,null,"","#f3e8ff"],
  ["Gifts","Coffee mug","☕",14,17.5,"20% off","#fef3c7"],["Gifts","Teddy bear","🧸",20,null,"Sale","#ffe4e6"],
  ["Gifts","Chocolates","🍫",60,null,"","#e7e5e4"],["Gifts","Gift card","🎁",22,null,"New","#dcfce7"],
  ["Home","Wall clock","🕰️",80,89,"10% off","#e0e7ff"],["Home","Plants & vases","🪴",40,null,"","#d1fae5"],
  ["Home","Queen size bed","🛏️",250,null,"","#fae8ff"],["Home","Flower pot","🌷",30,null,"Sale","#fef2f2"],
  ["Sports","Roller skates","🛼",180,null,"","#cffafe"],["Sports","Football","⚽",70,87.5,"20% off","#ecfccb"],
  ["Sports","Nylon shuttle","🏸",56,null,"","#fef9c3"],["Sports","Cricket kit","🏏",80,null,"New","#ffedd5"]
].map((p,i)=>({id:i,cat:p[0],name:p[1],icon:p[2],price:p[3],was:p[4],tag:p[5],bg:p[6]}));
const TABS = ["All","Electronics","Fashion","Gifts","Home","Sports"];
const CHIPS = ["Mobiles","Electronics & appliances","Furniture","Home decor","Books & music","Fashion","Kids","Groceries","Health","Automotive","Food","Sports","Games & toys","Gifts"];

// ---------- STATE ----------
let tab = "All", query = "", cart = {};
try{ cart = JSON.parse(localStorage.getItem("msaf-cart")||"{}") }catch(e){}
const $ = id => document.getElementById(id);
const money = n => "$" + (Math.round(n*100)/100).toString();

// ---------- MENU ----------
$("menu").innerHTML = Object.entries(MENU).map(([k,v])=>{
  if(!v) return `<li><a href="#products">${k}</a></li>`;
  const cols = Object.entries(v).map(([h,l])=>`<div><h4>${h}</h4>${l.map(x=>`<a href="#products" onclick="doSearch('${x.replace(/'/g,"")}')">${x}</a>`).join("")}</div>`).join("");
  return `<li><a href="#products" aria-haspopup="true">${k}</a><div class="mega"><div class="wrap">${cols}</div></div></li>`;
}).join("");

// ---------- PRODUCTS ----------
function render(){
  $("tabs").innerHTML = TABS.map(t=>`<button class="${t===tab?'on':''}" onclick="setTab('${t}')">${t}</button>`).join("");
  const q = query.toLowerCase();
  const list = PRODUCTS.filter(p=>(tab==="All"||p.cat===tab) && (!q || (p.name+" "+p.cat).toLowerCase().includes(q)));
  $("grid").innerHTML = list.length ? list.map(p=>`
    <article class="card">
      ${p.tag?`<span class="badge ${p.tag==='New'?'new':''}">${p.tag}</span>`:""}
      <div class="pic" style="background:${p.bg}">${p.icon}</div>
      <div class="body"><h3>${p.name}</h3><p>${p.cat}</p>
        <div class="price">${money(p.price)}${p.was?`<s>${money(p.was)}</s>`:""}</div>
        <button class="add" onclick="add(${p.id})">Add to cart</button></div>
    </article>`).join("") : `<p class="empty">No products match “${query}”. Try another search.</p>`;
}
function setTab(t){tab=t;query="";$("q").value="";render()}
function doSearch(v){ if(v!==undefined){$("q").value=v} query=$("q").value.trim(); tab="All"; render(); $("products").scrollIntoView({behavior:"smooth"}) }

// ---------- CART ----------
function save(){try{localStorage.setItem("msaf-cart",JSON.stringify(cart))}catch(e){}}
function add(id){cart[id]=(cart[id]||0)+1;save();drawCart();toast(PRODUCTS[id].name+" added to cart")}
function change(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];save();drawCart()}
function drawCart(){
  const ids=Object.keys(cart); let total=0,n=0;
  $("items").innerHTML = ids.length ? ids.map(id=>{const p=PRODUCTS[id],q=cart[id];total+=p.price*q;n+=q;
    return `<div class="line"><span class="t">${p.icon}</span><div><b>${p.name}</b><br>${money(p.price)}<div class="qty"><button onclick="change(${id},-1)" aria-label="Decrease">−</button>${q}<button onclick="change(${id},1)" aria-label="Increase">+</button></div></div><b>${money(p.price*q)}</b></div>`}).join("")
    : `<p class="empty">Your cart is empty. Add something you like.</p>`;
  $("total").textContent=money(total); $("count").textContent=n;
}
function toggleCart(o){document.body.classList.toggle("open",o)}
function checkout(){ if(!Object.keys(cart).length) return toast("Your cart is empty"); cart={};save();drawCart();toggleCart(false);toast("Order placed (demo) — thank you!") }
let tt; function toast(m){const t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),2200)}

// ---------- SLIDER ----------
const slides=[...document.querySelectorAll(".slide")]; let si=0;
$("dots").innerHTML=slides.map((_,i)=>`<i onclick="go(${i})"></i>`).join("");
function go(i){si=i;slides.forEach((s,k)=>s.classList.toggle("on",k===i));[...$("dots").children].forEach((d,k)=>d.classList.toggle("on",k===i))}
go(0); setInterval(()=>go((si+1)%slides.length),5000);

// ---------- DEAL TIMER (resets weekly to next Sunday midnight) ----------
function tick(){const n=new Date(),e=new Date(n);e.setDate(n.getDate()+(7-n.getDay())%7+(n.getDay()===0?7:0));e.setHours(0,0,0,0);
  let s=Math.max(0,Math.floor((e-n)/1000));$("d").textContent=Math.floor(s/86400);$("h").textContent=Math.floor(s%86400/3600);$("m").textContent=Math.floor(s%3600/60);$("s").textContent=s%60}
tick(); setInterval(tick,1000);

// ---------- INIT ----------
$("chips").innerHTML = CHIPS.map(c=>`<a href="#products" onclick="doSearch('${c.split(" ")[0].replace(/[^a-zA-Z]/g,"")}')">${c}</a>`).join("");
$("yr").textContent = new Date().getFullYear();
render(); drawCart();
