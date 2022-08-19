import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit {
  @Input() tipo = 'Sucesso';
  @Input() mensagem!: string;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  onFechar() {
    this.bsModalRef.hide();
  }
}
