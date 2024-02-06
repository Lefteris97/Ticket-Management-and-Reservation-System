const db = require('../database')

class Event{
    constructor(event_name, circuit_name, event_date, flag_icon, photo, sold_out){
        this.event_name = event_name;
        this.circuit_name = circuit_name;
        this.event_date = event_date;
        this.flag_icon = flag_icon;
        this.photo = photo;
        this.sold_out = sold_out;
    }

    // functions
    // save to database
    save(){
        let q = `
        INSERT INTO events(
            event_name,
            circuit_name,
            event_date,
            flag_icon,
            photo,
            sold_out
        )
        VALUES(
            '${this.event_name}',
            '${this.circuit_name}',
            '${this.event_date}',
            '${this.flag_icon}',
            '${this.photo}',
            '${this.sold_out}'
        )
        `;

        return db.execute(q);
    }

    // methods
    static findAll(){
        let q = `SELECT * FROM events`;

        return db.execute(q);
    }

    static findById(id){
        let q = `SELECT * FROM events WHERE event_id = ?`;

        return db.execute(q, [id]);
    }

    static updateById(id, event_name, circuit_name, event_date, flag_icon, photo, sold_out){
        let q = `
            UPDATE events
            SET event_name = ?,
                circuit_name = ?,
                event_date = ?,
                flag_icon = ?,
                photo =?,
                sold_out = ?
            WHERE event_id = ?
        `;

        return db.execute(q, [event_name, circuit_name, event_date, flag_icon, photo, sold_out, id]);
    }

    static deleteById(id){
        let q = `DELETE FROM events WHERE event_id = ?`;

        return db.execute(q, [id]);
    }
}

module.exports = Event