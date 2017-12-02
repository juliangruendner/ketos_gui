export class Crawler {
    _id: string;
    resource: string;
    status: string;
    patients: string[];
    finished: string[];
    queued_time: string;
    start_time: string;
    end_time: string;

    constructor(resource: string, patients: string[]) {
        this.resource = resource;
        this.patients = patients;
    }
}
