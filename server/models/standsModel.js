const db = require('../database')

class Stand{
    constructor(event_id, stand_name, capacity){
        this.event_id = event_id;
        this.stand_name = stand_name;
        this.capacity = capacity;
    }

    save(){
        let q = `
        INSERT INTO stands(
            event_id,
            stand_name,
            capacity
        )
        VALUES(
            '${this.event_id}',
            '${this.stand_name}',
            '${this.capacity}'
        )
        `;

        return db.execute(q);
    }

    static findAll(){
        let q = `SELECT * FROM stands`;

        return db.execute(q);
    }

    static findById(id){
        let q = `SELECT * FROM stands WHERE stand_id = ?`;

        return db.execute(q, [id]);
    }

    static updateById(id, event_id, stand_name, capacity){
        let q = `
            UPDATE stands
            SET event_id = ?,
                stand_name = ?,
                capacity = ?
            WHERE stand_id = ?
        `;

        return db.execute(q, [event_id, stand_name, capacity, id]);
    }

    static deleteById(id){
        let q = `DELETE FROM stands WHERE stand_id = ?`;

        return db.execute(q, [id]);
    }
}

module.exports = Stand