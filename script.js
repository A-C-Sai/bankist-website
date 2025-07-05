'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const allSections = document.querySelectorAll('.section');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const message = document.createElement('div');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++) btnsOpenModal[i].addEventListener('click', openModal);
// btnOpenModal is a NodeList NOT an Array but it has the forEach Method
btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

message.classList.add('cookie-message');
message.innerHTML = `We use cookies for imporved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>`;
header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  // message.parentElement.removeChild(message);
  message.remove();
});

message.style.backgroundColor = '#37383d';
message.style.width = '100vw';
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

btnScrollTo.addEventListener('click', function (e) {
  // window.scrollTo(0, window.scrollY + section1.getBoundingClientRect().y);
  // window.scrollTo({
  //   left: 0,
  //   top: window.scrollY + section1.getBoundingClientRect().y,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// }); NOT EFFICIENT BETTER TO USE EVENT DELEGATION

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
