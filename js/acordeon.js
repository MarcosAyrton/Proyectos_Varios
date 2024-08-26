document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
      const accordionItem = button.closest('.accordion-item');
      const content = accordionItem.querySelector('.accordion-content');
      
      if (content.classList.contains('show')) {
        content.classList.remove('show');
        button.classList.remove('collapsed');
      } else {
        document.querySelectorAll('.accordion-content').forEach(item => item.classList.remove('show'));
        document.querySelectorAll('.accordion-button').forEach(btn => btn.classList.add('collapsed'));
        content.classList.add('show');
        button.classList.remove('collapsed');
      }
    });
  });