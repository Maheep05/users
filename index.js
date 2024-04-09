const users = [
  {
    id: 1,
    logged_in: "2023-01-15",
    lastSeenAt: ["2023-01-20", "2023-02-10", "2023-03-05"],
  },
  {
    id: 2,
    logged_in: "2023-01-05",
    lastSeenAt: ["2023-01-10", "2023-02-05", "2023-03-02", "2023-04-01"],
  },
];

// current month and year
const currentMonth = 1;
const currentYear = 2023;

// Function to check if a user is active
function isActive(user) {
  const loggedInDate = new Date(user.logged_in);

  const activityDurationMonths =
    (currentYear - loggedInDate.getFullYear()) * 12 +
    currentMonth -
    (loggedInDate.getMonth() + 1);
  return activityDurationMonths > 6;
}

//   Function to check if user's last seen count is above threshold { threshold is define bt us only to check the legitmacy of user data}
function isLegitimate(user) {
  const lastSeenCounts = user.lastSeenAt.reduce((counts, timestamp) => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    counts[month] = (counts[month] || 0) + 1;
    return counts;
  }, {});

  const lastSeenThreshold = 3; 
  
  return Object.values(lastSeenCounts).every(
    (count) => count >= lastSeenThreshold
  );
}

// Filter active and legitimate users
const activeAndLegitimateUsers = users.filter(
  (user) => isActive(user) && isLegitimate(user)
);

console.log(activeAndLegitimateUsers);
