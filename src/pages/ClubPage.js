import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import fetchData from '../components/fetchData';
import Search from '../components/Search';
import { endpoints } from '../constants/endpoints';
import columns from '../constants/clubTableHeaders';
import CustomizedDataGrid from '../components/CustomizedDataGrid';
import Header from '../components/Header';
import useSharedState from '../hooks/useSharedState';

const PlayerListWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

function ClubPage() {
  const invalidHeader = "Invalid Club Tag";
  const navigate = useNavigate();
  const location = useLocation();
  const stateClubTag = location.state && location.state.clubTag ? location.state.clubTag : '#2JR9RGy09';
  const {
    searchTag,
    setSearchTag,
    formData,
    setFormData,
    handleSearch,
  } = useSharedState(stateClubTag);


  useEffect(() => {
    const fetchClubData = async () => {
      const processedClubTag = formData.currentTag.replace(/^#/, '');
      try {
        const [clubMembersResponse, clubDataResponse] = await Promise.all([
          fetchData(endpoints.CLUB_MEMBERS(processedClubTag)),
          fetchData(endpoints.CLUB_DATA(processedClubTag))
        ]);
      
        // Process club members response
        const clubMembersResponseData = clubMembersResponse.data.map((player) => ({ ...player, id: player.Tag }));
    
        // Process club data response
        const { name, ...restClubData } = clubDataResponse.data;

        setFormData((prevData) => ({
          ...prevData,
          name: clubDataResponse.data.name || invalidHeader,
          clubData: clubDataResponse.data.name ? restClubData : [],
          clubMembers: clubDataResponse.data.name ? clubMembersResponseData : [],
        }));
      } catch (error) {
        console.error("Error fetching club data:", error);
      }    
    };
    if (formData.currentTag) {
      fetchClubData();
    }
  }, [formData.currentTag, setFormData]);

  const handleRowClick = (params) => {
    navigate(`/player`, { state: { playerTag: params.row.Tag.replace(/^#/, '') } });
  };

  return (
    <div>
      <Search
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            handleSearch();
          }}
        onSearch={handleSearch}
        placeholder="Enter Club Tag"
      />
      <Header header={formData.name} descriptions={formData.clubData} />
      <PlayerListWrapper>
        
        <CustomizedDataGrid rows={formData.clubMembers} columns={columns} onClick={handleRowClick} />
      </PlayerListWrapper>
    </div>
  );
}

export default ClubPage;
