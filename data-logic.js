function webpageUI(data) {
  const profileData = data.find((item) => item.SK === 'PROFILE');
  const dataUI      = data.find((item) => item.SK === 'DATA_UI');
  const goalData    = data.find((item) => item.SK === 'GOALS');

  const safeUpdate = (id, value) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  };

  if (profileData) {
    safeUpdate('user-name',       profileData.name);                       // user_name
    safeUpdate('user-age',        profileData.age);                        // user_age
    safeUpdate('weigh-day-info',  profileData.weight_day);                 // weight_day
    safeUpdate('start-weight',    profileData.start_weight);               // start_weight  
  }       

  if (goalData) {
    safeUpdate('goal-1-text',       goalData.goal_1);                  // goal_1
    safeUpdate('goal-2-text',       goalData.goal_2);                  // goal_2
    safeUpdate('goal-3-text',       goalData.goal_3);                  // goal_3
    safeUpdate('goal-4-text',       goalData.goal_4);                  // goal_4
    safeUpdate('goal-5-text',       goalData.goal_5);                  // goal_5
    safeUpdate('goal-1-text-input', goalData.goal_1);                  // goal_1 input
    safeUpdate('goal-2-text-input', goalData.goal_2);                  // goal_2 input
    safeUpdate('goal-3-text-input', goalData.goal_3);                  // goal_3 input
    safeUpdate('goal-4-text-input', goalData.goal_4);                  // goal_4 input
    safeUpdate('goal-5-text-input', goalData.goal_5);                  // goal_5 input
  }       

  if (dataUI) {
    safeUpdate('high-score-percent',   dataUI.high_score['score_%']);     // high_score['score_%']
    safeUpdate('high-score-date',      dataUI.high_score['score_date']);  // high_score['score_date']
    safeUpdate('last-5-average_per',   dataUI['last_5_average_%']);       // last_5_average_%
    safeUpdate('seven-day-lost',       dataUI['7_day_lost']);             // 7_day_lost
    safeUpdate('total-lost',           dataUI.total_lost);                // total_lost
    safeUpdate('current-weight',       dataUI.current_week);              // current_week
    safeUpdate('last-week-weight',     dataUI.last_weeks_weight);         // last_weeks_weight

    // Parse the week numbers
    const currentWeekObj = typeof dataUI.current_week_numbers === 'string' 
      ? JSON.parse(dataUI.current_week_numbers) 
      : dataUI.current_week_numbers;
    const lastWeekObj = typeof dataUI.last_weeks_numbers === 'string'
      ? JSON.parse(dataUI.last_weeks_numbers)
      : dataUI.last_weeks_numbers;

    // Update goal scores
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

// Fetch and update UI on page load
function updateAllData() {
  fetch('mock/progress-data.json')
    .then((res) => res.json())
    .then((data) => {
      let parsed;
      // Try to handle all data shapes
      if (Array.isArray(data)) {
        parsed = data;
      } else if (typeof data.body === 'string') {
        parsed = JSON.parse(data.body);
      } else if (Array.isArray(data.body)) {
        parsed = data.body;
      } else {
        throw new Error('Unrecognized JSON shape!');
      }

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

document.addEventListener('DOMContentLoaded', updateAllData);
