const db = require('../database')

class Event{
    constructor(event_fields){
        this.event_name = event_fields.event_name;
        this.circuit_name = event_fields.circuit_name;
        this.event_date = event_fields.event_date;
        this.event_time = event_fields.event_time;
        this.total_capacity = event_fields.total_capacity;
        this.flag_icon = event_fields.flag_icon;
        this.photo = event_fields.photo;
        this.circuit_map = event_fields.circuit_map;
        this.completed = event_fields.completed;
    }

    // functions
    // save to database
    save(){

        let completedValue = this.completed !== undefined && this.completed !== null ? `'${this.completed}'` : 'DEFAULT';

        let q = `
        INSERT INTO events(
            event_name,
            circuit_name,
            event_date,
            event_time,
            total_capacity,
            flag_icon,
            photo,
            circuit_map,
            completed
        )
        VALUES(
            '${this.event_name}',
            '${this.circuit_name}',
            '${this.event_date}',
            '${this.event_time}',
            '${this.total_capacity}',
            '${this.flag_icon}',
            '${this.photo}',
            '${this.circuit_map}',
            ${completedValue}
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

    static updateById(id, event_fields){

        let q = `
            UPDATE events
            SET event_name = ?,
                circuit_name = ?,
                event_date = ?,
                event_time = ?,
                total_capacity = ?,
                flag_icon = ?,
                photo =?,
                circuit_map =?,
                completed = ?
            WHERE event_id = ?
        `;

        return db.execute(q, [event_fields.event_name, event_fields.circuit_name, event_fields.event_date, event_fields.event_time, event_fields.total_capacity, event_fields.flag_icon, event_fields.photo, event_fields.circuit_map, event_fields.completed, id]);
    }

    static deleteById(id){
        let q = `DELETE FROM events WHERE event_id = ?`;

        return db.execute(q, [id]);
    }

    static updateTotalCapacityByEventId(id, newCapacity){
        let q = `UPDATE events SET total_capacity = ? WHERE event_id = ?`

        return db.execute(q, [newCapacity, id]);
    }
}

module.exports = Event