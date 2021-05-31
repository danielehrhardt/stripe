import type { PaymentMethod } from '@stripe/stripe-js';
import type { CardBrand } from '../shared';
export interface HelperDefinitions {
    customizePaymentAuthUI(opts: any): Promise<void>;
    presentPaymentOptions(): Promise<PresentPaymentOptionsResponse>;
    validateCardNumber(opts: ValidateCardNumberOptions): Promise<ValidityResponse>;
    validateExpiryDate(opts: ValidateExpiryDateOptions): Promise<ValidityResponse>;
    validateCVC(opts: ValidateCVCOptions): Promise<ValidityResponse>;
    identifyCardBrand(opts: IdentifyCardBrandOptions): Promise<CardBrandResponse>;
}
export declare type CardBrandResponse = {
    brand: CardBrand;
};
export declare type IdentifyCardBrandOptions = {
    number: string;
};
export declare type PresentPaymentOptionsResponse = {
    useGooglePay?: boolean;
    useApplePay?: boolean;
    paymentMethod?: PaymentMethod;
};
export declare type ValidateCardNumberOptions = {
    number: string;
};
export declare type ValidateCVCOptions = {
    cvc: string;
};
export declare type ValidateExpiryDateOptions = {
    exp_month: number;
    exp_year: number;
};
export declare type ValidityResponse = {
    valid: boolean;
};
