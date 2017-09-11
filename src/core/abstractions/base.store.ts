import { RequestService } from '../services/request.service';
import { ServiceLocator } from '../utils/service-locator';

export abstract class BaseStore {
    protected baseController: string = '';
    protected requestService: RequestService;

    protected constructor() {
        this.requestService = ServiceLocator.injector.get(RequestService);
    }

    protected getUrl(action: string): string {
        return `${this.baseController}/${action}`;
    }
}
