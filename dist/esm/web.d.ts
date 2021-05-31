import { WebPlugin } from '@capacitor/core';
import type { AccountParams, ApplePayOptions, ApplePayResponse, BankAccountTokenRequest, BankAccountTokenResponse, CardBrandResponse, CardTokenRequest, CardTokenResponse, ConfirmPaymentIntentOptions, ConfirmPaymentIntentResponse, ConfirmSetupIntentOptions, ConfirmSetupIntentResponse, CreatePiiTokenOptions, CreateSourceTokenOptions, CustomerPaymentMethodsResponse, FinalizeApplePayTransactionOptions, GooglePayOptions, GooglePayResponse, IdentifyCardBrandOptions, PresentPaymentOptionsResponse, SetPublishableKeyOptions, StripePlugin, TokenResponse, ValidateCardNumberOptions, ValidateCVCOptions, ValidateExpiryDateOptions, ValidityResponse, AvailabilityResponse } from './definitions';
export declare class StripeWeb extends WebPlugin implements StripePlugin {
    private publishableKey;
    private stripe;
    constructor();
    setPublishableKey(opts: SetPublishableKeyOptions): Promise<void>;
    createCardToken(card: CardTokenRequest): Promise<CardTokenResponse>;
    createBankAccountToken(bankAccount: BankAccountTokenRequest): Promise<BankAccountTokenResponse>;
    confirmPaymentIntent(opts: ConfirmPaymentIntentOptions): Promise<ConfirmPaymentIntentResponse>;
    confirmSetupIntent(opts: ConfirmSetupIntentOptions): Promise<ConfirmSetupIntentResponse>;
    payWithApplePay(options: {
        applePayOptions: ApplePayOptions;
    }): Promise<ApplePayResponse>;
    cancelApplePay(): Promise<void>;
    finalizeApplePayTransaction(options: FinalizeApplePayTransactionOptions): Promise<void>;
    payWithGooglePay(options: {
        googlePayOptions: GooglePayOptions;
    }): Promise<GooglePayResponse>;
    createSourceToken(options: CreateSourceTokenOptions): Promise<TokenResponse>;
    createPiiToken(options: CreatePiiTokenOptions): Promise<TokenResponse>;
    createAccountToken(account: AccountParams): Promise<TokenResponse>;
    customizePaymentAuthUI(options: any): Promise<void>;
    presentPaymentOptions(): Promise<PresentPaymentOptionsResponse>;
    isApplePayAvailable(): Promise<AvailabilityResponse>;
    isGooglePayAvailable(): Promise<AvailabilityResponse>;
    validateCardNumber(opts: ValidateCardNumberOptions): Promise<ValidityResponse>;
    validateExpiryDate(opts: ValidateExpiryDateOptions): Promise<ValidityResponse>;
    validateCVC(opts: ValidateCVCOptions): Promise<ValidityResponse>;
    identifyCardBrand(opts: IdentifyCardBrandOptions): Promise<CardBrandResponse>;
    addCustomerSource(opts: {
        sourceId: string;
        type?: string;
    }): Promise<CustomerPaymentMethodsResponse>;
    customerPaymentMethods(): Promise<CustomerPaymentMethodsResponse>;
    deleteCustomerSource(opts: {
        sourceId: string;
    }): Promise<CustomerPaymentMethodsResponse>;
    private cs;
    initCustomerSession(opts: any | {
        id: string;
        object: 'ephemeral_key';
        associated_objects: {
            type: 'customer';
            id: string;
        }[];
        created: number;
        expires: number;
        livemode: boolean;
        secret: string;
    }): Promise<void>;
    setCustomerDefaultSource(opts: {
        sourceId: string;
        type?: string;
    }): Promise<CustomerPaymentMethodsResponse>;
}
