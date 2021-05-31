import type { PaymentMethod } from '@stripe/stripe-js';
export * from './enum';
export declare type AvailabilityResponse = {
    available: boolean;
};
export declare type StripeAccountIdOpt = {
    /**
     * Optional
     * Used on Android only
     */
    stripeAccountId?: string;
};
export declare type IdempotencyKeyOpt = {
    /**
     * Optional
     * Used on Android only
     */
    idempotencyKey?: string;
};
export declare type CustomerPaymentMethodsResponse = {
    paymentMethods: PaymentMethod[];
};
export interface TokenResponse {
    id: string;
    type: string;
    created: Date;
}
