export class Crawler {
    id: string;
    resource: string;
    status: string;
    patients: Array<string>;
    finished: Array<string>;
    queued_time: string;
    start_time: string;
    end_time: string;

    constructor(id?: string) {
        this.id = id;
    }
}
