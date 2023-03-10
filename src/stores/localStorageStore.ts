import { v4 as uuid } from 'uuid';

export class localStorageStore {
    private _data: { [key: string]: unknown }[] = [];
    private _key = '';

    constructor(key: string) {
        if (typeof window !== 'undefined') {
            this._key = key;
            const data = window.localStorage.getItem(key);
            try {
                this._data = data === null ? [] : JSON.parse(data);
            } catch (err) {
                console.log(err);
            }
        }
    }


    getAll(): { [key: string]: unknown }[] {
        return this._data;
    }

    get(id: string): { [key: string]: unknown } | undefined {
        return this._data.find(d => d.id === id);
    }


    save(record: { [key: string]: unknown }): boolean | undefined {
        try {
            if (record.id === null) {
                record.id = uuid();
                this._data.push(record);
            }

            this._synchronize();
        } catch (err) {
            return false;
        }

        return true;
    }


    delete(id: string): boolean {
        const index = this._data.findIndex(record => record.id === id);
        try {

            if (index !== -1) {
                this._data.splice(index, 1);
                this._synchronize();
                return true;
            }
        } catch (e) {
            console.log(e);
        }

        return false;

    }

    private _synchronize(): void {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(this._key, JSON.stringify(this._data));
        }
    }


}