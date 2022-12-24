import { FuseNavigationService } from '@fuse/components/navigation';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { QuoteManagementAppNavigation } from 'app/layout/common/navigation';
import { confirmedValidator } from 'app/layout/common/validators';


@Component({
    selector     : 'auth-register',
    templateUrl  : './register.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RegisterComponent implements OnInit
{
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    registerationForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
		private _fuseNavigationService: FuseNavigationService
    )
    { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.registerationForm = this._formBuilder.group({
			company	          : [false, Validators.required],
            email             : ['', [Validators.required, Validators.email]],
            password          : ['', Validators.required],
			confirmPassword   : ['', [Validators.required, confirmedValidator]]
        }, {validators: [confirmedValidator('password', 'confirmPassword')]});
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register
     */
    register(): void
    {
		console.log(this.registerationForm, this.registerationForm.invalid);

        // Return if the form is invalid
        if ( this.registerationForm.invalid )
        {
            return;
        }

        // Disable the form
        this.registerationForm.disable();

        // Hide the alert
        this.showAlert = false;

		const payload = this.registerationForm.value;

		// Sign in
		this._authService.register(payload).subscribe({
			next: (resp) => {
				// Set the redirect url.
				// The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
				// to the correct page after a successful sign in. This way, that url can be set via
				// routing file and we don't have to touch here.
				const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

				this._fuseNavigationService.storeNavigation('main', QuoteManagementAppNavigation.navigation);

				// Navigate to the redirect url
				this._router.navigateByUrl(redirectURL);
			},
			error: (error) => {
				// Re-enable the form
				this.registerationForm.enable();

				// Reset the form
				this.registerationForm.reset();

				// Set the alert
				this.alert = {
					type   : 'error',
					message: error.error.message
				};

				// Show the alert
				this.showAlert = true;
			}
		});
    }
}
