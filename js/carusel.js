const carousel = document.getElementById('carouselExampleCaptions');
  const items = carousel.querySelectorAll('.carousel-item');
  const indicators = carousel.querySelectorAll('.carousel-indicators button');
  let currentIndex = 0;

  function showSlide(index) {
    items[currentIndex].classList.add('opacity-0');
    items[currentIndex].classList.remove('opacity-100');
    items[currentIndex].classList.remove('active');
    indicators[currentIndex].classList.remove('active');
    currentIndex = index;
    items[currentIndex].classList.remove('opacity-0');
    items[currentIndex].classList.add('opacity-100');
    items[currentIndex].classList.add('active');
    indicators[currentIndex].classList.add('active');
  }

  function nextSlide() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= items.length) {
      nextIndex = 0;
    }
    showSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = items.length - 1;
    }
    showSlide(prevIndex);
  }

  carousel.querySelector('.carousel-control-next').addEventListener('click', nextSlide);
  carousel.querySelector('.carousel-control-prev').addEventListener('click', prevSlide);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
  });
