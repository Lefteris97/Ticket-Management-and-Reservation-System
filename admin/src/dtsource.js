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
        type: 'string',
        width: 150,
    },
    {
        field: 'lname',
        headerName: 'Last name',
        type: 'string',
        width: 150,
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'string',
        width: 150,
    },
    {
      field: 'password',
      headerName: 'Password',
      type: 'string',
      width: 150,
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'string',
      width: 100
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      type: 'string',
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