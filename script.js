const storeContainer = document.getElementById('app-store-container');
const modal = document.getElementById('install-modal');
const closeModal = document.getElementById('close-modal');
const stepsList = document.getElementById('install-steps-list');
const modalDownloadBtn = document.getElementById('modal-download-btn');

fetch('apps.json').then(res => res.json()).then(apps => {
  apps.forEach(app => {
    const card = document.createElement('div');
    card.className = 'app-card';
    let ssHTML = '';
    app.screenshots.forEach(img => { ssHTML += `<img src="${img}">`; });
    card.innerHTML = `<div class="app-header"><img src="${app.icon}"><div><h3>${app.name}</h3><p>${app.category} • ${app.size}</p></div></div><p>${app.description}</p><div class="screenshots">${ssHTML}</div><button class="btn primary-btn install-btn">How to Install & Download</button>`;
    card.querySelector('.install-btn').addEventListener('click', () => showInstallModal(app));
    storeContainer.appendChild(card);
  });
});

function showInstallModal(app) {
  stepsList.innerHTML = '';
  app.install_steps.forEach(step => {
    const li = document.createElement('li'); li.textContent = step; stepsList.appendChild(li);
  });
  modalDownloadBtn.href = app.download_link;
  modal.style.display = 'flex';
}

closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });