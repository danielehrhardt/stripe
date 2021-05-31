export var GooglePayCheckoutOption;
(function (GooglePayCheckoutOption) {
    /**
     * Standard text applies for the given totalPriceStatus (default).
     */
    GooglePayCheckoutOption["DEFAULT"] = "DEFAULT";
    /**
     * The selected payment method is charged immediately after the payer confirms their selections.
     * This option is only available when `totalPriceStatus` is set to `FINAL`.
     */
    GooglePayCheckoutOption["COMPLETE_IMMEDIATE_PURCHASE"] = "COMPLETE_IMMEDIATE_PURCHASE";
})(GooglePayCheckoutOption || (GooglePayCheckoutOption = {}));
export var GooglePayBillingAddressFormat;
(function (GooglePayBillingAddressFormat) {
    /**
     * Name, country code, and postal code (default).
     */
    GooglePayBillingAddressFormat["MIN"] = "MIN";
    /**
     *  Name, street address, locality, region, country code, and postal code.
     */
    GooglePayBillingAddressFormat["FULL"] = "FULL";
})(GooglePayBillingAddressFormat || (GooglePayBillingAddressFormat = {}));
export var GooglePayAuthMethod;
(function (GooglePayAuthMethod) {
    /**
     * This authentication method is associated with payment cards stored on file with the user's Google Account.
     * Returned payment data includes personal account number (PAN) with the expiration month and the expiration year.
     */
    GooglePayAuthMethod["PAN_ONLY"] = "PAN_ONLY";
    /**
     * This authentication method is associated with cards stored as Android device tokens.
     * Returned payment data includes a 3-D Secure (3DS) cryptogram generated on the device.
     */
    GooglePayAuthMethod["CRYPTOGRAM_3DS"] = "CRYPTOGRAM_3DS";
})(GooglePayAuthMethod || (GooglePayAuthMethod = {}));
export var GooglePayPriceStatus;
(function (GooglePayPriceStatus) {
    /**
     * Used for a capability check. Do not use this property if the transaction is processed in an EEA country.
     */
    GooglePayPriceStatus["NOT_CURRENTLY_KNOWN"] = "NOT_CURRENTLY_KNOWN";
    /**
     * Total price may adjust based on the details of the response, such as sales tax collected based on a billing address.
     */
    GooglePayPriceStatus["ESTIMATED"] = "ESTIMATED";
    /**
     * Total price doesn't change from the amount presented to the shopper.
     */
    GooglePayPriceStatus["FINAL"] = "FINAL";
})(GooglePayPriceStatus || (GooglePayPriceStatus = {}));
//# sourceMappingURL=enum.js.map