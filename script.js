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
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const navLinks = document.querySelector('.nav__links');

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

///////////////////////////////////////
// Cookie Message
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

///////////////////////////////////////
// Smooth Scroll
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

///////////////////////////////////////
// Tabbed Component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // chooses tab regardless of where we click inside the btn
  if (clicked) {
    const tab = clicked.dataset['tab'];
    tabs.forEach(function (tab) {
      tab.classList.remove('operations__tab--active');
    });
    clicked.classList.add('operations__tab--active');

    tabContent.forEach(function (contentBox) {
      contentBox.classList.remove('operations__content--active');
    });

    document.querySelector('.operations__content--' + tab).classList.add('operations__content--active');
  }
});

///////////////////////////////////////
// Menu Fade Animation
// mouseover is similar to mouseenter with the key difference that mouseenter doesn't bubble
// handler function can ONLY take one argument, to pass additional "arguments" use the bind method
// The problem is that the this keyword becomes undefined in the forEach loop. Providing this as the thisArg parameter fixes the issue. OR we could have used arrow function.
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      if (link !== e.target) {
        link.style.opacity = this.opacity;
      }
    }, this);
  }
};

navLinks.addEventListener('mouseover', handleHover.bind({ opacity: 0.5 }));

navLinks.addEventListener('mouseout', handleHover.bind({ opacity: 1 }));

///////////////////////////////////////
// Sticky Navigation
