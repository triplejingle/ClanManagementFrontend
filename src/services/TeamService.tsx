import BaseClanManagementBackendService from "@/services/BaseClanManagementBackendService";
import {Team} from "@/domain/team";

export class TeamService extends BaseClanManagementBackendService<Team> {
    async fetchTeams(): Promise<Team[]> {
        return this.fetch("teams");
    }

    async updateTeam(teamid: number, team: Team): Promise<Team> {
        return this.update("teams/" + teamid, team);
    }

    async deleteTeam(id: number) {
        return this.delete("teams/" + id);
    }

    async createTeam(eventid: number, data: Team) {
        return this.create("/events/" + eventid + "/teams", data);
    }
}