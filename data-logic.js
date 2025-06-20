// Function to update personal info box and goals in the UI
function webpageUI(data) {
  const profileData = data.find((item) => item.SK === 'PROFILE');
  const dataUI      = data.find((item) => item.SK === 'DATA_UI');
  const goalData    = data.find((item) => item.SK === 'GOALS');

  window.goalData = goalData || {};

  const safeUpdate = (id, value) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  };

  if (profileData) {
    safeUpdate('user-name',       profileData.name);                      
    safeUpdate('user-age',        profileData.age);                       
    safeUpdate('weigh-day-info',  profileData.weight_day);                
    safeUpdate('start-weight',    profileData.start_weight);              
  }       

  if (goalData) {
    safeUpdate('goal-1-text',       goalData.goal_1);                  
    safeUpdate('goal-2-text',       goalData.goal_2);                  
    safeUpdate('goal-3-text',       goalData.goal_3);                  
    safeUpdate('goal-4-text',       goalData.goal_4);                  
    safeUpdate('goal-5-text',       goalData.goal_5);                  
    safeUpdate('goal-1-text-input', goalData.goal_1);                  
    safeUpdate('goal-2-text-input', goalData.goal_2);                  
    safeUpdate('goal-3-text-input', goalData.goal_3);                  
    safeUpdate('goal-4-text-input', goalData.goal_4);                  
    safeUpdate('goal-5-text-input', goalData.goal_5);                  
  }       

  if (dataUI) {
    const currentWeekObj = JSON.parse(JSON.parse(`"${dataUI.current_week_numbers}"`));
    const lastWeekObj    = JSON.parse(JSON.parse(`"${dataUI.last_weeks_numbers}"`));

    safeUpdate('high-score-percent',   dataUI.high_score['score_%']);     
    safeUpdate('high-score-date',      dataUI.high_score['score_date']);  
    safeUpdate('last-5-average_per',   dataUI['last_5_average_%']);       
    
    safeUpdate('seven-day-lost',       dataUI['7_day_lost']);             
    safeUpdate('total_lost_profile',   dataUI.total_lost);                
    safeUpdate('total_lost',           dataUI.total_lost);                
    safeUpdate('current-week',         dataUI.current_week);              
    safeUpdate('last-weeks-weight',    dataUI.last_weeks_weight);         

    safeUpdate('goal1-score-this-week', currentWeekObj.scores.goal_1);
    safeUpdate('goal2-score-this-week', currentWeekObj.scores.goal_2);
    safeUpdate('goal3-score-this-week', currentWeekObj.scores.goal_3);
    safeUpdate('goal4-score-this-week', currentWeekObj.scores.goal_4);
    safeUpdate('goal5-score-this-week', currentWeekObj.scores.goal_5);
    safeUpdate('total-score-this-week', currentWeekObj.scores.total_score);
    
    safeUpdate('goal1-score-last-week', lastWeekObj.scores.goal_1);
    safeUpdate('goal2-score-last-week', lastWeekObj.scores.goal_2);
    safeUpdate('goal3-score-last-week', lastWeekObj.scores.goal_3);
    safeUpdate('goal4-score-last-week', lastWeekObj.scores.goal_4);
    safeUpdate('goal5-score-last-week', lastWeekObj.scores.goal_5);
    safeUpdate('total-score-last-week', lastWeekObj.scores.total_score);
  }
}

// Log the day, goals, AND input text values when called
function logDayAndGoalsWithInput() {
  const selectedDay = document.querySelector(".day-btn.selected")?.textContent || 'No day selected';

  if (!window.goalData) {
    console.warn("⚠️ Goal data not loaded yet!");
    return;
  }

  for (let i = 1; i <= 5; i++) {
    const goalKey = `goal_${i}`;
    const goalText = window.goalData[goalKey] || 'No goal text found';

    // Grab input box value for this goal
    const inputEl = document.getElementById(`goal-${i}-text-input`);
    const inputVal = inputEl ? inputEl.value : '[No input box]';

  }
}

// Fetch and update UI on page load
function updateAllData() {
  const mock        = 'mock/progress-data.json'; 
  // const awsApi    = 'https://xrljpz0uf6.execute-api.us-east-1.amazonaws.com/PROD'; // Uncomment when ready for API

  fetch(mock)
    .then((res) => res.json())
    .then((data) => {
      console.log('📦 Mock JSON loaded:', data);
      document.getElementById('current-date').textContent = new Date().toLocaleDateString();

      const parsed = JSON.parse(data.body);
      console.log('📦 Parsed body array:', parsed);

      parsed.forEach((item, index) => {
        console.log(`Item ${index} SK:`, item.SK);
      });

      const validItems = [
        parsed.find((item) => item.SK === 'PROFILE'),
        parsed.find((item) => item.SK === 'GOALS'),
        parsed.find((item) => item.SK === 'DATA_UI')
      ].filter(Boolean);

      webpageUI(validItems);
    })
    .catch((err) => {
      console.error('❌ API Call Failed:', err);
    });
}

// Add event listener to Submit button to trigger logging
document.addEventListener('DOMContentLoaded', () => {
  updateAllData();

  const submitBtn = document.getElementById('submit-button'); // Make sure your submit button has this ID
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default form submit if inside a form
      logDayAndGoalsWithInput();
    });
  } else {
    console.warn('⚠️ Submit button (#submit-button) not found!');
  }
});
