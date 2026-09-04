document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("qp_theme"); if (saved === "dark") document.body.classList.add("dark");
    const t = document.getElementById("themeToggle"); if (t) t.addEventListener("click", () => { document.body.classList.toggle("dark"); localStorage.setItem("qp_theme", document.body.classList.contains("dark") ? "dark" : "light"); });
    const products = [
        { name: "Carne com queijo", cat: "pastel", price: 12.00, desc: "Carne temperada, queijo derretido e massa crocante.", img: "assets/pastel-carne.svg" },
        { name: "Frango com catupiry", cat: "pastel", price: 13.00, desc: "Frango cremoso com catupiry e aquele toque especial.", img: "assets/pastel-frango.svg" },
        { name: "Pizza", cat: "pastel", price: 12.50, desc: "Presunto, queijo, tomate e orégano.", img: "assets/pastel-pizza.svg" },
        { name: "Coxinha", cat: "salgado", price: 7.00, desc: "Massa douradinha e recheio cremoso de frango.", img: "assets/coxinha.svg" },
        { name: "Bolinha de queijo", cat: "salgado", price: 6.50, desc: "Crocante por fora e muito queijo por dentro.", img: "assets/bolinha.svg" },
        { name: "Guaraná lata", cat: "bebida", price: 6.00, desc: "Refrescante e geladinho.", img: "assets/refri.svg" }
    ];
    window.qpProducts = products;
    const grid = document.getElementById("products");
    if (grid) {
        grid.innerHTML = products.map((p, i) => `<div class="col-sm-6 col-lg-4 product-item" data-cat="${p.cat}"><article class="product-card"><img class="product-img" src="${p.img}" alt="${p.name}"><div class="pt-3"><span class="badge rounded-pill text-bg-light mb-2">${p.cat}</span><h5 class="fw-bold">${p.name}</h5><p class="small text-secondary">${p.desc}</p><div class="d-flex justify-content-between align-items-center"><span class="price">R$ ${p.price.toFixed(2).replace(".", ",")}</span><button class="btn btn-orange btn-sm rounded-pill" data-product="${i}">Adicionar</button></div></div></article></div>`).join("");
        document.querySelectorAll("[data-product]").forEach(b => b.addEventListener("click", () => openProduct(products[+b.dataset.product])));
        document.querySelectorAll(".filter-btn").forEach(b => b.addEventListener("click", () => { document.querySelectorAll(".filter-btn").forEach(x => x.classList.remove("btn-orange")); document.querySelectorAll(".filter-btn").forEach(x => x.classList.add("btn-outline-orange")); b.classList.add("btn-orange"); b.classList.remove("btn-outline-orange"); document.querySelectorAll(".product-item").forEach(x => x.classList.toggle("d-none", b.dataset.filter !== "all" && x.dataset.cat !== b.dataset.filter)); }));
    }
});
function openProduct(p) { const m = document.getElementById("productModal"); if (!m) return; document.getElementById("modalTitle").textContent = p.name; document.getElementById("modalDesc").textContent = p.desc; document.getElementById("modalPrice").textContent = "R$ " + p.price.toFixed(2).replace(".", ","); document.getElementById("qty").value = 1; new bootstrap.Modal(m).show(); document.getElementById("plus").onclick = () => document.getElementById("qty").value = +document.getElementById("qty").value + 1; document.getElementById("minus").onclick = () => document.getElementById("qty").value = Math.max(1, +document.getElementById("qty").value - 1); document.getElementById("addCart").onclick = () => { bootstrap.Modal.getInstance(m).hide(); alert("Item adicionado ao pedido!") }; }