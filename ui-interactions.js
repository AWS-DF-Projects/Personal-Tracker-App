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
    const selectedDayBtn = document.querySelector('.day-btn.selected');
    const selectedDay = selectedDayBtn ? selectedDayBtn.textContent.trim() : null;

    if (!selectedDay) {
      alert("Pick a day first!");
      return;
    }

    // Collect goal ratings
    const goalData = {};
    const ratingRows = document.querySelectorAll('.results-table > div');

    ratingRows.forEach((row, index) => {
      const selectedRating = row.querySelector('.rating-btns button.selected');
      if (selectedRating) {
        goalData[`goal_${index + 1}`] = parseInt(selectedRating.textContent.trim());
      }
    });

    // Grab notes
    const notesBox = document.querySelector('.footer-inputs textarea');
    const notes = notesBox ? notesBox.value.trim() : "";

    const jsonOutput = {
      day: selectedDay,
      notes,
      goals: goalData
    };

    console.log("✅ JSON Record:", JSON.stringify(jsonOutput, null, 2));

    // 🧠 THE MISSING PIECE: Send to AWS API Gateway
    fetch('https://xrljpz0uf6.execute-api.us-east-1.amazonaws.com/PROD', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonOutput)
    })
    .then(data => {
      console.log('🎉 Data saved successfully to AWS:', data);
      alert('✅ Successfully saved to AWS!');

      // Optional: show a save summary
      const summary = document.querySelector('.save-summary');
      if (summary) {
        const goalsHtml = Object.entries(jsonOutput.goals)
          .map(([goal, rating]) => `<p><strong>${goal.replace('_', ' ')}:</strong> ${rating}</p>`)
          .join('');

        summary.innerHTML = `
          <p><strong>Saved for Day:</strong> ${jsonOutput.day}</p>
          <p><strong>Notes:</strong> ${jsonOutput.notes || 'None'}</p>
          ${goalsHtml}
        `;
      }
    })
    .catch(error => {
      console.error('❌ Failed to send data to AWS:', error);
      alert('⚠️ Something went wrong while saving.');
    });

  });
});
