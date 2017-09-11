import { BsModalRef } from 'ngx-bootstrap/modal';

export abstract class BaseModalComponent {
    model: any = {};

    protected constructor(
        public bsModalRef: BsModalRef
    ) { }

    afterModelLoad(): void { };
}
