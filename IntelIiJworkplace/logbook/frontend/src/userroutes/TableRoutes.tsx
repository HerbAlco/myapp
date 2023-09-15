import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import moment from 'moment';


interface Route {
  routeId: number;
  userId: number;
  routeStartDate: string;
  routeEndDate: string;
  distance: number;
  startLocation: string;
  endLocation: string;
  routeDuration: number;
  purpose: string;
  routeCost: number;
}

interface TableRoutesProps {
  apiUrl: string;
}

export default function TableRoutes({ apiUrl }: TableRoutesProps) {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [userNames, setUserNames] = useState<{ [userId: number]: string }>({});

  useEffect(() => {
    axios
      .get<Route[]>(apiUrl)
      .then(async (response) => {
        const routesWithUserNames = await Promise.all(
          response.data.map(async (route) => {
            const userId = route.userId;
            if (!userNames[userId]) {
              const userResponse = await axios.get(`http://10.1.1.5:8080/api/v1/auth/user/${userId}`);
              const userName = userResponse.data.firstname;
              setUserNames((prevUserNames) => ({
                ...prevUserNames,
                [userId]: userName,
              }));
            }
            return { ...route, userName: userNames[userId] };
          })
        );
        setRoutes(routesWithUserNames);
      })
      .catch((error) => {
        console.error('Chyba při načítání dat:', error);
      });
  }, [apiUrl, userNames]);

  const tableHeadStyle: React.CSSProperties = {
    backgroundColor: 'lightgray',
    fontWeight: 'bold',
  };
  
  const tableCellStyle: React.CSSProperties = {
    border: '1px solid lightgray', // Přidejte rámec pro buňky
  };
  
  const tableContainerStyle: React.CSSProperties = {
    border: '1px solid lightgray',
  };

  function calculateRouteDuration(startDate: string, endDate: string): number {
    const startMoment = moment(startDate);
    const endMoment = moment(endDate);
    const durationInMinutes = endMoment.diff(startMoment, 'minutes');
    return durationInMinutes;
  }

  return (
    <TableContainer component={Paper} style={tableContainerStyle}>
      <Table sx={{ minWidth: 1150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" style={{ ...tableHeadStyle, ...tableCellStyle }}>ID Trasy</TableCell>
            <TableCell align="right" style={{ ...tableHeadStyle, ...tableCellStyle }}>Jméno&nbsp;(ID)</TableCell>
            <TableCell align="right" style={{ ...tableHeadStyle, ...tableCellStyle }}>Datum</TableCell>
            <TableCell align="right" style={{ ...tableHeadStyle, ...tableCellStyle }}>
              <div>Odjezd</div>
              <div>Příjezd</div>
            </TableCell>
            <TableCell align="right" style={{ ...tableHeadStyle, ...tableCellStyle }}>Vzdálenost&nbsp;(km)</TableCell>
            <TableCell align="right" style={{ ...tableHeadStyle, ...tableCellStyle }}>Trasa odkud</TableCell>
            <TableCell align="right" style={{ ...tableHeadStyle, ...tableCellStyle }}>Trasa kam</TableCell>
            <TableCell align="right" style={{ ...tableHeadStyle, ...tableCellStyle }}>Trvání&nbsp;(min)</TableCell>
            <TableCell align="right" style={{ ...tableHeadStyle, ...tableCellStyle }}>Druh</TableCell>
            <TableCell align="right" style={{ ...tableHeadStyle, ...tableCellStyle }}>Cena&nbsp;(Kč)</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
        {routes.map(route => (
          <TableRow key={route.routeId}>
            <TableCell style={tableCellStyle}>{route.routeId}</TableCell>
            <TableCell style={tableCellStyle}>{userNames[route.userId]}</TableCell>
            <TableCell style={tableCellStyle}>Od: 
              {moment(route.routeStartDate).format('DD-MM-YYYY')}
              <br />
              Do: 
              {moment(route.routeEndDate).format('DD-MM-YYYY')}
            </TableCell>
            <TableCell style={tableCellStyle}>
              Od: 
              {moment(route.routeStartDate).format('HH:mm')}
              <br />
              Do: 
              {moment(route.routeEndDate).format('HH:mm')}
            </TableCell>
            <TableCell style={tableCellStyle}>{route.distance}</TableCell>
            <TableCell style={tableCellStyle}>{route.startLocation}</TableCell>
            <TableCell style={tableCellStyle}>{route.endLocation}</TableCell>
            <TableCell style={tableCellStyle}>{calculateRouteDuration(route.routeStartDate, route.routeEndDate)}</TableCell>
            <TableCell style={tableCellStyle}>{route.purpose}</TableCell>
            <TableCell style={tableCellStyle}>{route.routeCost}&nbsp;(Kč)</TableCell>
          </TableRow>
        ))}
      </tbody>
      </Table>
    </TableContainer>
  );
}