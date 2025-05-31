document.addEventListener('DOMContentLoaded', () => {
  // 🎯 1. Handle day button selection
  const dayButtons = document.querySelectorAll('.days-vertical-list .day-btn');
  dayButtons.forEach((button) => {
    button.addEventListener('click', () => {
      dayButtons.forEach((btn) => btn.classList.remove('selected'));
      button.classList.add('selected');

      const selectedDayText = button.textContent;
      const daySelectedElement = document.querySelector('.footer-inputs strong');
      if (daySelectedElement && daySelectedElement.textContent.includes('Day Selected:')) {
        daySelectedElement.parentElement.innerHTML = `<strong>Day Selected:</strong> ${selectedDayText}`;
      }
    });
  });

  // 🎯 2. Handle rating button selection
  const ratingButtonContainers = document.querySelectorAll('.results-table > div');
  ratingButtonContainers.forEach((container) => {
    const buttons = container.querySelectorAll('.rating-btns button');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((btn) => btn.classList.remove('selected'));
        button.classList.add('selected');
      });
    });
  });

  // 🎯 3. Handle Edit buttons
  const editButtons = document.querySelectorAll('.box button');
  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      // TODO: Implement edit functionality
      console.log('Edit button clicked');
    });
  });

  // 🎯 4. Handle Enter Record button
  const submitButton = document.querySelector('.submit-btn');
  submitButton.addEventListener('click', () => {
    // TODO: Implement record submission
    console.log('Record submitted');
  });
}); 