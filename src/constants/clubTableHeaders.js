import { parseTimeStringToMinutes } from '../utils/timeUtils';

export const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'LastPlayed', headerName: 'Last Played', width: 300, sortComparator: (a, b, sortOrder) => {
        const timeA = parseTimeStringToMinutes(a);
        const timeB = parseTimeStringToMinutes(b);
        return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
      } },
    { field: 'EarliestPlayed', headerName: 'Earliest Played', width: 300, sortComparator: (a, b, sortOrder) => {
        const timeA = parseTimeStringToMinutes(a);
        const timeB = parseTimeStringToMinutes(b);
        return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
      } },
    { field: 'Role', headerName: 'Role', width: 130 },
];

export default columns;