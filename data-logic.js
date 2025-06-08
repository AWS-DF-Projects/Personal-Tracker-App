// Function to update personal info box
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

  const currentWeekObj = JSON.parse(JSON.parse(`"${dataUI.current_week_numbers}"`));
  const lastWeekObj    = JSON.parse(JSON.parse(`"${dataUI.last_weeks_numbers}"`));


    safeUpdate('high-score-percent',   dataUI.high_score['score_%']);     // high_score['score_%']
    safeUpdate('high-score-date',      dataUI.high_score['score_date']);  // high_score['score_date']
    safeUpdate('last-5-average_per',   dataUI['last_5_average_%']);       // last_5_average_%
    
    safeUpdate('seven-day-lost',       dataUI['7_day_lost']);             // 7_day_lost
    safeUpdate('total_lost_profile',   dataUI.total_lost);                // total_lost
    safeUpdate('total_lost',           dataUI.total_lost);                // total_lost
    safeUpdate('current-week',         dataUI.current_week);              // current_week
    safeUpdate('last-weeks-weight',    dataUI.last_weeks_weight);         // last_weeks_weight

    // Example: update one score just to check if parsing works
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



// Fetch and update UI on page load
function updateAllData() {
  fetch('mock/progress-data.json')
    .then((res) => res.json())
    .then((data) => {
      console.log('📦 Mock JSON loaded:', data);
      document.getElementById('current-date').textContent = new Date().toLocaleDateString();

      const parsed = JSON.parse(data.body);
      console.log('📦 Parsed body array:', parsed);

      parsed.forEach((item, index) => {
        console.log(`Item ${index} SK:`, item.SK);
      });

      const validItems = [ // remove any undefined/null
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

// Initialize data when page loads
document.addEventListener('DOMContentLoaded', updateAllData);



