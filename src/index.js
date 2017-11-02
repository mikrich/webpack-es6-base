// Enable HMR
if (module.hot) {
  module.hot.accept();
}

window.addEventListener('handleBodyOnLoad', () => {
  console.log('loaded....................')
});
