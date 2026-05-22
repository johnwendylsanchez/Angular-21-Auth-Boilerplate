import { AccountService } from '@app/_services';
import { EMPTY } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

export function appInitializer(accountService: AccountService) {
    return () => {
        if (window.location.pathname.startsWith('/account/')) {
            return EMPTY;
        }

        return accountService.refreshToken()
            .pipe(
                timeout(5000),
                // catch error to start app on success, failure, or timeout
                catchError(() => EMPTY)
            );
    };
}
