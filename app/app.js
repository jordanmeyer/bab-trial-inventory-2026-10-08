const status = document.querySelector('#status');
status.textContent = 'JavaScript module loaded. Preview is ready.';
document.querySelector('#check').addEventListener('click', () => {
  status.textContent = 'Interaction works. Ready to plan your app.';
});
