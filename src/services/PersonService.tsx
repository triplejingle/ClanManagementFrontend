import BaseClanManagementBackendService from "@/services/BaseClanManagementBackendService";
import {People} from "@/domain/people";


export class PersonService extends BaseClanManagementBackendService<People> {
    async fetchPersons(eventid: number): Promise<People[]> {
        return this.fetch("event/" + eventid + "/persons");
    }

    async deletePerson(id: number) {
        return this.delete("persons/" + id);
    }

    async createPerson(teamid: number, data: People) {
        return this.create("teams/" + teamid + "/persons", data);
    }
}