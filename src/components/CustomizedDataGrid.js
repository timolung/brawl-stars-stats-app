import * as React from 'react';
import styled from 'styled-components';

import { DataGrid } from '@mui/x-data-grid';

const StyledDataGrid = styled(DataGrid)`
  .MuiDataGrid-row:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Example box-shadow for hover effect */
    transition: box-shadow 0.3s ease; /* Smooth transition for the hover effect */
  }
`;

export default function CustomizedDataGrid({rows, columns, onClick}) {
  return (
    <StyledDataGrid
      autoHeight
      disableColumnFilter
      disableColumnMenu
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 30,
          },
        },
      }}
      pageSizeOptions={[30]}
      onRowClick={onClick}
    />
  );
}
