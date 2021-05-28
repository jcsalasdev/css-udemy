const dota2Container = document.querySelector('#header_main-nav');
const dota2 = document.querySelector('.header_main-nav--dota2');
const links = document.querySelectorAll('.header_main-nav--links li');

dota2.addEventListener('click', () => {
    dota2Container.classList.toggle('clicked');
    links.forEach((link) => {
        link.classList.toggle("fade");
    });
});