const db = require('../database')

class Ticket{
    constructor(ticket_fields){
        this.event_id = ticket_fields.event_id;
        this.stand_id = ticket_fields.stand_id;
        this.user_id = ticket_fields.user_id;
        this.attended = ticket_fields.attended;
    }

    save(){

        let attendedValue = this.attended !== undefined && this.attended !== null ? `'${this.attended}'` : 'DEFAULT';

        let q = `
        INSERT INTO tickets(
            event_id,
            stand_id,
            user_id,
            attended
        )
        VALUES(
            '${this.event_id}',
            '${this.stand_id}',
            '${this.user_id}',
            ${attendedValue}
        )
        `;

        return db.execute(q);
    }

    static findAll(){
        let q = `SELECT * FROM tickets`

        return db.execute(q);
    }

    static findById(id){
        let q = `SELECT * FROM tickets WHERE ticket_id = ?`;

        return db.execute(q, [id]);
    }

    static findTicketByEventAndUser(event_id, user_id){
        let q = `
            SELECT * FROM tickets 
                WHERE event_id = ? AND user_id = ?`;

        return db.execute(q, [event_id, user_id]);
    }

    static getTotalAttendees(id){
        let q = `
                SELECT COUNT(*) AS total_attendees FROM tickets
                WHERE attended = 1 AND event_id = ?;
                `

        return db.execute(q, [id]);
    }

    static getUserTicketForEvent(userId, eventId){
        let q = `
                SELECT 
                    tickets.ticket_id,
                    tickets.user_id,
                    tickets.event_id,
                    users.fname,
                    users.lname,
                    events.circuit_map,
                    events.event_name,
                    stands.stand_name,
                    stands.price
                FROM 
                    tickets
                JOIN 
                    users ON tickets.user_id = users.user_id
                JOIN 
                    events ON tickets.event_id = events.event_id
                JOIN 
                    stands ON tickets.stand_id = stands.stand_id
                WHERE 
                    users.user_id = ? AND events.event_id = ?
                `

        return db.execute(q, [userId, eventId]);
    }

    static updateById(id, ticket_fields){
        let q = `
            UPDATE tickets
            SET event_id = ?,
                stand_id = ?,
                user_id = ?,
                attended = ?
            WHERE ticket_id = ?
        `;

        return db.execute(q, [ticket_fields.event_id, ticket_fields.stand_id, ticket_fields.user_id, ticket_fields.attended, id]);
    }

    static deleteById(id){
        let q = `DELETE FROM tickets WHERE ticket_id = ?`

        return db.execute(q, [id]);
    }

}   

module.exports = Ticket