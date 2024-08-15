import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
type MessageTypes = 'success' | 'info' | 'error' | 'warn';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showSuccess(message: string) {
    this.showAlert('success', 'Success Message', message);
  }

  showError(message: string) {
    this.showAlert('error', 'Error Message', message);
  }

  showWarning(message: string) {
    this.showAlert('warn', 'Warning Message', message);
  }

  private showAlert(type: MessageTypes, title: string, message: string) {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: message,
      sticky: false,
    });
  }
}
