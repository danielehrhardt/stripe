import { WebPlugin } from '@capacitor/core';
import { CardBrand } from './definitions';
import { formBody, _stripePost, _stripeGet } from './helper';
export class StripeWeb extends WebPlugin {
    constructor() {
        super({
            name: 'Stripe',
            platforms: ['web'],
        });
    }
    async setPublishableKey(opts) {
        if (typeof opts.key !== 'string' || opts.key.trim().length === 0) {
            throw new Error('you must provide a valid key');
        }
        const scriptEl = document.createElement('script');
        scriptEl.src = 'https://js.stripe.com/v3/';
        document.body.appendChild(scriptEl);
        this.publishableKey = opts.key;
        return new Promise((resolve, reject) => {
            scriptEl.addEventListener('error', (ev) => {
                document.body.removeChild(scriptEl);
                reject('Failed to load Stripe JS: ' + ev.message);
            }, { once: true });
            scriptEl.addEventListener('load', () => {
                try {
                    this.stripe = new window.Stripe(opts.key);
                    resolve();
                }
                catch (err) {
                    document.body.removeChild(scriptEl);
                    reject(err);
                }
            }, { once: true });
        });
    }
    async createCardToken(card) {
        if (this.publishableKey === undefined) {
            throw 'publishableKey is undefined';
        }
        const body = formBody(card, 'card', ['phone', 'email']);
        return _stripePost('/v1/tokens', body, this.publishableKey);
    }
    async createBankAccountToken(bankAccount) {
        if (this.publishableKey === undefined) {
            throw 'publishableKey is undefined';
        }
        const body = formBody(bankAccount, 'bank_account');
        return _stripePost('/v1/tokens', body, this.publishableKey);
    }
    async confirmPaymentIntent(opts) {
        if (this.stripe === undefined) {
            throw 'Stripe is undefined';
        }
        if (opts.applePayOptions) {
            throw 'Apple Pay is not supported on web';
        }
        if (opts.googlePayOptions) {
            throw 'Google Pay is not supported on web';
        }
        if (!opts.clientSecret) {
            return Promise.reject('you must provide a client secret');
        }
        let confirmOpts;
        if (opts.paymentMethodId) {
            confirmOpts = {
                payment_method: opts.paymentMethodId,
            };
        }
        else if (opts.card) {
            const token = await this.createCardToken(opts.card);
            confirmOpts = {
                save_payment_method: opts.saveMethod,
                setup_future_usage: opts.setupFutureUsage,
                payment_method: {
                    billing_details: {
                        email: opts.card.email,
                        name: opts.card.name,
                        phone: opts.card.phone,
                        address: {
                            line1: opts.card.address_line1,
                            line2: opts.card.address_line2,
                            city: opts.card.address_city,
                            state: opts.card.address_state,
                            country: opts.card.address_country,
                            postal_code: opts.card.address_zip,
                        },
                    },
                    card: {
                        token: token.id,
                    },
                },
            };
        }
        return this.stripe
            .confirmCardPayment(opts.clientSecret, confirmOpts)
            .then(response => response.paymentIntent || {});
    }
    async confirmSetupIntent(opts) {
        if (!opts.clientSecret) {
            return Promise.reject('you must provide a client secret');
        }
        return Promise.reject('Not supported on web');
    }
    async payWithApplePay(options) {
        console.log(options);
        throw 'Apple Pay is not supported on web';
    }
    async cancelApplePay() {
        throw 'Apple Pay is not supported on web';
    }
    async finalizeApplePayTransaction(options) {
        console.log(options);
        throw 'Apple Pay is not supported on web';
    }
    async payWithGooglePay(options) {
        console.log(options);
        throw 'Google Pay is not supported on web';
    }
    async createSourceToken(options) {
        console.log(options);
        throw 'Not implemented';
    }
    async createPiiToken(options) {
        if (this.publishableKey === undefined) {
            throw 'publishableKey is undefined';
        }
        const body = formBody({ id_number: options.pii }, 'pii');
        return _stripePost('/v1/tokens', body, this.publishableKey);
    }
    async createAccountToken(account) {
        if (this.publishableKey === undefined) {
            return Promise.reject('publishableKey is undefined');
        }
        if (!account.legalEntity) {
            return Promise.reject('you must provide a legal entity');
        }
        const body = {};
        if (account.legalEntity.type === 'individual') {
            body.business_type = 'individual';
            body.individual = account.legalEntity;
            body.tos_shown_and_accepted = account.tosShownAndAccepted;
        }
        else {
            body.business_type = 'company';
            body.company = account.legalEntity;
        }
        delete account.legalEntity.type;
        return _stripePost('/v1/tokens', formBody({ account: body }), this.publishableKey);
    }
    async customizePaymentAuthUI(options) {
        console.log(options);
        return;
    }
    async presentPaymentOptions() {
        return {};
    }
    async isApplePayAvailable() {
        return { available: false };
    }
    async isGooglePayAvailable() {
        return { available: false };
    }
    async validateCardNumber(opts) {
        return {
            valid: opts.number.length > 0,
        };
    }
    async validateExpiryDate(opts) {
        const { exp_month } = opts;
        let { exp_year } = opts;
        if (exp_month < 1 || exp_month > 12) {
            return {
                valid: false,
            };
        }
        if (String(exp_year).length === 2) {
            exp_year = parseInt('20' + String(exp_year));
        }
        const currentYear = new Date().getFullYear();
        if (exp_year > currentYear) {
            return {
                valid: true,
            };
        }
        else if (exp_year === currentYear &&
            exp_month >= new Date().getMonth() + 1) {
            return {
                valid: true,
            };
        }
        else {
            return {
                valid: false,
            };
        }
    }
    async validateCVC(opts) {
        if (typeof opts.cvc !== 'string') {
            return { valid: false };
        }
        const len = opts.cvc.trim().length;
        return {
            valid: len > 0 && len < 4,
        };
    }
    async identifyCardBrand(opts) {
        console.log(opts);
        return {
            brand: CardBrand.UNKNOWN,
        };
    }
    addCustomerSource(opts) {
        if (this.cs === undefined) {
            throw 'CustomerSession is undefined';
        }
        return this.cs.addSrc(opts.sourceId);
    }
    customerPaymentMethods() {
        if (this.cs === undefined) {
            throw 'CustomerSession is undefined';
        }
        return this.cs.listPm();
    }
    deleteCustomerSource(opts) {
        console.log(opts);
        return new Promise(resolve => {
            resolve({
                paymentMethods: [],
            });
        });
    }
    async initCustomerSession(opts) {
        this.cs = new CustomerSession(opts);
    }
    setCustomerDefaultSource(opts) {
        if (this.cs === undefined) {
            throw 'CustomerSession is undefined';
        }
        return this.cs.setDefaultSrc(opts.sourceId);
    }
}
class CustomerSession {
    constructor(key) {
        this.key = key;
        if (!key.secret ||
            !Array.isArray(key.associated_objects) ||
            !key.associated_objects.length ||
            !key.associated_objects[0].id) {
            throw new Error('you must provide a valid configuration');
        }
        this.customerId = key.associated_objects[0].id;
    }
    async listPm() {
        const res = await _stripeGet(`/v1/customers/${this.customerId}`, this.key.secret);
        return {
            paymentMethods: res.sources.data,
        };
    }
    async addSrc(id) {
        await _stripePost('/v1/customers/' + this.customerId, formBody({
            source: id,
        }), this.key.secret);
        return this.listPm();
    }
    async setDefaultSrc(id) {
        await _stripePost('/v1/customers/' + this.customerId, formBody({
            default_source: id,
        }), this.key.secret);
        return await this.listPm();
    }
}
//# sourceMappingURL=web.js.map