import BaseClanManagementBackendService from "@/services/BaseClanManagementBackendService";
import {Event} from '@/domain/event'

export class EventService extends BaseClanManagementBackendService<Event> {
    async createEvent(data: Event): Promise<Event> {
        return await this.create("/events", data);
    }

    async fetchEvents(): Promise<Event[]> {
        return await this.fetch("/events");
    }

    async updateEvent(event: Event): Promise<Event> {
        return this.update("/events/" + event.eventid?.toString(), event);
    }
}