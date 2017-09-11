import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaseModel } from '../abstractions/base.model';
import { BaseCrudStore } from '../abstractions/base-crud.store';
import { AlertService } from '../../core/services/alert.service';
import { ServiceLocator } from '../../core/utils/service-locator';

export abstract class BaseComponent<T extends BaseModel> {
    protected recordId?: number = undefined;
    isLoadingData: boolean = false;
    isEdit: boolean = false;
    record: T;
    titleAction: string = '';

    protected constructor(
        protected alertService: AlertService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected store: BaseCrudStore<T>,
        protected baseType: { new(): T; }
    ) {
        this.record = new baseType();
        this.alertService = ServiceLocator.injector.get(AlertService);
        this.activatedRoute.params.subscribe((params: Params) => {
            this.recordId = params['id'] ? +params['id'] : undefined;
            this.isEdit = this.recordId !== undefined;
            this.titleAction = this.isEdit ? 'Editar' : 'Criar';
        });
    }

    //ToDo - Verificar uma forma melhor de fazer isso
    abstract afterInit(): void;

    protected init(): void {
        if (this.isEdit) {
            this.isLoadingData = true;
            this.store.get(this.recordId!).subscribe(resp => {
                this.record = resp
                this.isLoadingData = false;
                this.afterInit();
            });
        } else
            this.afterInit();
    }

    protected saveRecord(): void {
        if (this.isEdit)
            this.store.edit(this.record).subscribe(resp => this.showSuccessAndReturn());
        else
            this.store.add(this.record).subscribe(resp => this.showSuccessAndReturn());
    }

    protected showSuccessAndReturn(): void {
        this.alertService.showSuccess('Registro salvo com sucesso!', '', () => this.returnToPrevious());
    }

    protected returnToPrevious(): void {
        if (this.isEdit)
            this.router.navigate(['../../search'], { relativeTo: this.activatedRoute });
        else
            this.router.navigate(['../search'], { relativeTo: this.activatedRoute });
    }
}
