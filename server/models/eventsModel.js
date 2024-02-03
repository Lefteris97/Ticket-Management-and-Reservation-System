const db = require('../database')

class Event{
    constructor(event_name){
        this.event_name = event_name;
    }

    // functions
    // save to database
    save(){
        let q = `
        INSERT INTO events(
            event_name
        )
        VALUES(
            '${this.event_name}'
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
        let q = `SELECT * FROM events WHERE event_id = ${id}`;

        return db.execute(q);
    }

    static updateById(id, eventName){
        let q = `
            UPDATE events
            SET event_name = '${eventName}'
            WHERE event_id = ${id}
        `;

        return db.execute(q);
    }

    static deleteById(id){
        let q = `DELETE FROM events WHERE event_id = ${id}`;

        return db.execute(q);
    }
}

module.exports = Event