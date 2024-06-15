import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import fetchData from '../components/fetchData';
import Header from '../components/Header';
import Search from '../components/Search';
import StatCard from '../components/StatCard';
import useSharedState from '../hooks/useSharedState';
import { endpoints } from '../constants/endpoints';

function PlayerPage() {
  const invalidHeader = "Invalid Player Tag";
  const navigate = useNavigate();
  const location = useLocation();
  const statePlayerTag = location.state && location.state.playerTag ? location.state.playerTag : '';
  const {
    searchTag,
    setSearchTag,
    formData,
    setFormData,
    handleSearch,
  } = useSharedState(statePlayerTag);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      const processedPlayerTag = formData.currentTag.replace(/^#/, '');
      try {
        const [battleLogResponse, playerDataResponse] = await Promise.all([
          fetchData(endpoints.BATTLE_LOG(processedPlayerTag)),
          fetchData(endpoints.PLAYER_DATA(processedPlayerTag)),
        ]);
        const { name, club, ...restPlayerData } = playerDataResponse.data;
        setFormData((prevData) => ({
          ...prevData,
          club: club,
          name: name || invalidHeader,
          playerData: name ? restPlayerData : [],
          battleLogData: name ? battleLogResponse.data : [],
        }));
      } catch (error) {
        console.error("Error fetching player details:", error);
      }  

    };
    if (formData.currentTag) {
      fetchPlayerDetails();
    }
  }, [formData.currentTag, setFormData]);

  const handleClubClick = () => {
    navigate(`/club`, { state: { clubTag: formData.club.tag.replace(/^#/, '') } });
  };

  return (
    <Box>
      <Search
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            handleSearch();
        }}
        onSearch={handleSearch}
        placeholder="Enter Player Tag"
      />
      {formData.name && (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Card
              variant="outlined"
              sx={{
                marginBottom: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                height: 'auto', // Set Card height to auto for better alignment
                display: 'flex',
                flexDirection: 'column', // Ensure children stack vertically
              }}
            >
              <CardContent sx={{ flex: '1 1 auto' }}>
                <Header header={formData.name} descriptions={formData.playerData} />
              </CardContent>
            </Card>
            <StatCard
              onClick={handleClubClick}
              title={"Club"}
              text={formData.club.name ? formData.club.name : "N/A"}
              subtext={formData.club.tag ? formData.club.tag : "Not in a Club"}
              sx={{ flex: '0 0 auto' }}
            />
          </Grid>
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                  {formData.battleLogData.map((log, index) => (
                    <Typography key={index} variant="body1">
                      {log.description}: {log.value}
                    </Typography>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default PlayerPage;
