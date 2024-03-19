export const barChartBoxVisit = {
  title: "Total Visits",
  dataKey: "visit",
  chartData: [
    {
      name: "Sun",
      visit: 4000,
    },
    {
      name: "Mon",
      visit: 3000,
    },
    {
      name: "Tue",
      visit: 2000,
    },
    {
      name: "Wed",
      visit: 2780,
    },
    {
      name: "Thu",
      visit: 1890,
    },
    {
      name: "Fri",
      visit: 2390,
    },
    {
      name: "Sat",
      visit: 3490,
    },
  ],
};

export const pieChartBoxVisit = {
  title: "Leads by Source",
  pieData: [
    {
      name: "Desktop",
      value: 400,
      color: "#0088FE"
    },
    {
      name: "Laptop",
      value: 500,
      color: "#FFBB28"
    },
    {
      name: "Mobile",
      value: 300,
      color: "#00C49F"
    },
    {
      name: "Tablet",
      value: 100,
      color: "#FF8042"
    },
  ]
}

export const userColumns = [
    { field: 'user_id', headerName: 'ID', width: 90 },
    { field: 'google_id', headerName: 'Google ID', width: 100 },
    {
        field: 'fname',
        headerName: 'First name',
        width: 150,
    },
    {
        field: 'lname',
        headerName: 'Last name',
        width: 150,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
    },
    {
      field: 'password',
      headerName: 'Password',
      width: 150,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 100
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 100
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
        `${params.row.fname || ''} ${params.row.lname || ''}`,
    },
];

export const eventsColumns = [
  { field: 'event_id', headerName: 'ID', width: 90},
  {
    field: 'event_name',
    headerName: 'GP Name',
    width: 150
  },
  {
    field: 'circuit_name',
    headerName: 'Circuit Name',
    width: 150
  },
  {
    field: 'event_date',
    headerName: 'Date',
    width: 120
  },
  {
    field: 'event_time',
    headerName: 'Time',
    width: 120
  },
  {
    field: 'total_capacity',
    headerName: 'Capacity',
    width: 120
  },
  {
    field: 'flag_icon',
    headerName: 'Flag Icon',
    sortable: false,
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithFlag">
          <img className="cellFlag" src={`http://localhost:7000/${params.row.flag_icon}`} alt="flag icon"/>
        </div>
      );
    }
  },
  {
    field: 'photo',
    headerName: 'Event Photo',
    sortable: false,
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithPhoto">
          <img className="cellPhoto" src={`http://localhost:7000/${params.row.photo}`} alt="event photo"/>
        </div>
      );
    }
  },
  {
    field: 'circuit_map',
    headerName: 'Circuit Image',
    sortable: false,
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithCircuit">
          <img className="cellCircuit" src={`http://localhost:7000/${params.row.circuit_map}`} alt="flag icon"/>
        </div>
      );
    }
  },
  {
    field: 'completed',
    headerName: 'Completed',
    width: 100
  }
];

export const standsColumns = [
  { field: "stands_id", headerName: 'ID', width: 90 },
  { field: "event_id", headerName: "Event ID", width: 150},
  {
    field: "stand_name",
    headerName: "Stand",
    width: 200
  },
  {
    field: "price",
    headerName: "Price",
    width: 150
  },
  {
    field: "capacity",
    headerName: "Capacity",
    width: 150
  }
];


export const ticketsColumns = [
  { field: "ticket_id", headerName: "ID", width: 90},
  { field: "event_id", headerName: "Event ID", width: 150},
  { field: "stand_id", headerName: "Stand ID", width: 150},
  { field: "user_id", headerName: "User ID", width: 150},
  { 
    field: "attended", 
    headerName: "Attended", 
    width: 150
  },
];