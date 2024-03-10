export const userInputs = [
    {
        id: "fname",
        label: "First Name",
        type: "text",
    },
    {
        id: "lname",
        label: "Last Name",
        type: "text",
    },
    {
        id: "email",
        label: "Email",
        type: "email",
    },
    {
        id: "password",
        label: "Password",
        type: "password",
    },
    {
        id: "role",
        label: "Role",
        type: "text",
        placeholder: "user"
    },
];

export const eventInputs = [
    {
        id: "event_name",
        label: "GP Name",
        type: "text"
    },
    {
        id: "circuit_name",
        label: "Circuit Name",
        type: "text"
    },
    {
        id: "event_date",
        label: "Date",
        // type: "date"
        type: "text"
    },  
    {
        id: "event_time",
        label: "Time",
        type: "time"
    },
    {
        id: "total_capacity",
        label: "Capacity",
        type: "number"
    },
    {
        id: "completed",
        label: "Completed",
        type: "number",
        placeholder: 0
    },
];

export const standInputs = [
    {
        id: "event_id",
        label: "Event ID",
        type: "number"
    },
    {
        id: "stand_name",
        label: "Stand",
        type: "text",
        placeholder: "GrandStand"
    },
    {
        id: "price",
        label: "Price",
        type: "number"
    },
    {
        id: "capacity",
        label: "Capacity",
        type: "number"
    },
];

export const ticketInputs = [
    {
        id: "event_id",
        label: "Event ID",
        type: "number"
    },
    {
        id: "stand_id",
        label: "Stand ID",
        type: "number"
    },
    {
        id: "user_id",
        label: "User ID",
        type: "number"
    },
    {
        id: "attended",
        label: "Attended",
        type: "number",
        placeholder: 0
    },
];