const endpoints = {
    BASE_URL: 'https://j6izt8d6m7.execute-api.us-east-1.amazonaws.com/prod',
    CLUB_DATA: (clubTag) => `/club-data/${clubTag}`,
    CLUB_MEMBERS: (clubTag) => `/club-members/${clubTag}`,
    BATTLE_LOG: (playerTag) => `/battle-log/${playerTag}`,
    PLAYER_DATA: (playerTag) => `/player-data/${playerTag}`,
};
  
export { endpoints };