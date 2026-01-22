import { Component, OnInit, OnDestroy, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import {
  InteractionStatus,
  AuthenticationResult,
  EventMessage,
  EventType,
} from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly authService = inject(MsalService);
  private readonly msalBroadcastService = inject(MsalBroadcastService);
  private readonly zone = inject(NgZone);

  isLoggedIn = false;

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None,
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.zone.run(() => this.checkLoginStatus());
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.LOGOUT_SUCCESS ||
            msg.eventType === EventType.ACTIVE_ACCOUNT_CHANGED,
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((msg: EventMessage) => {
        this.zone.run(() => {
          console.log('MSAL event (home):', msg.eventType);
          if (msg.eventType === EventType.LOGIN_SUCCESS) {
            const payload = msg.payload as AuthenticationResult;
            if (payload?.account) {
              this.authService.instance.setActiveAccount(payload.account);
            }
          }
          this.checkLoginStatus();
        });
      });

    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const accounts = this.authService.instance.getAllAccounts();
    this.isLoggedIn = accounts.length > 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
