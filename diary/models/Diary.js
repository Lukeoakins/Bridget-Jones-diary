const db = require('../db/connect')

class Diary {
    constructor({
        title,
        diary_date,
        diary_entry
    }){
        this.title = title
        this.diary_date = diary_date
        this.diary_entry = diary_entry
    }

    static async getAll(){
        const response = await db.query('SELECT title FROM entries;')
        if (response.rows.length === 0){
            throw new Error('No entries available')
        }
        return response.rows.map(e => new Diary(e))
    }
}

module.exports = Diary