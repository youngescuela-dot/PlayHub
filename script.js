let data = {};
const itemList = document.getElementById("itemList");
const modal = document.getElementById("gameModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalLink = document.getElementById("modalLink");
const closeModal = document.getElementById("closeModal");
const sectionTitle = document.getElementById("sectionTitle");

// Diccionario de títulos por categoría
const titles = {
  juegos: "🎮 Juegos",
  emuladores: "🕹️ Emuladores recomendados",
  celulares: "📱 Celulares recomendados",
  programas: "💻 Programas útiles",
  sistemas: "⚙️ Sistemas operativos"
};

// Cargar JSON
fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    loadCategory("juegos"); // cargar por defecto
  });

// Cargar categoría
function loadCategory(category) {
  sectionTitle.textContent = titles[category] || category;
  itemList.innerHTML = "";

  if (!data[category]) return;

  // Ordenar alfabéticamente por nombre
  const sortedItems = [...data[category]].sort((a, b) => a.name.localeCompare(b.name));

  sortedItems.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("game-item");
    div.textContent = item.name;
    div.onclick = () => openModal(item);
    itemList.appendChild(div);
  });
}

// Modal
function openModal(item) {
  modal.style.display = "flex";
  modalTitle.textContent = item.name;
  modalDesc.textContent = item.desc;
  modalLink.href = item.link;
}

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }
