const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const target = item.dataset.page;
    pages.forEach((page) => page.classList.toggle('active', page.id === target));
    navItems.forEach((nav) => nav.classList.toggle('active', nav === item));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});