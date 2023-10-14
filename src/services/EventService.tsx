import BaseClanManagementBackendService from "@/services/BaseClanManagementBackendService";
import {Event} from '@/domain/event'

export class EventService extends BaseClanManagementBackendService<Event> {
    url= "/events";
    async createEvent(data: Event): Promise<Event> {
        return await this.create(this.url, data);
    }

    async fetchEvents(): Promise<Event[]> {
        return await this.fetch(this.url);
    }

    async updateEvent(event: Event): Promise<Event> {
        return this.update(this.url +"/"+ event.eventid?.toString(), event);
    }

    async deleteEvent(id: number){
        return this.delete(this.url+"/"+id);
    }
}