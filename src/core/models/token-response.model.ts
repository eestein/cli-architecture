import { BaseModel } from '../abstractions/base.model';

export class TokenResponseModel extends BaseModel {
    access_token: string = '';
    token_type: string = '';
    expires_in: number = 0;
    valid_until: Date;
    error: string = '';
    error_description: string = '';
}
