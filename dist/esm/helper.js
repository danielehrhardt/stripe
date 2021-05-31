export function flatten(json, prefix, omit) {
    let obj = {};
    for (const prop of Object.keys(json)) {
        if (typeof json[prop] !== 'undefined' &&
            json[prop] !== null &&
            (!Array.isArray(omit) || !omit.includes(prop))) {
            if (typeof json[prop] === 'object') {
                obj = Object.assign(Object.assign({}, obj), flatten(json[prop], prefix ? `${prefix}[${prop}]` : prop));
            }
            else {
                const key = prefix ? `${prefix}[${prop}]` : prop;
                obj[key] = json[prop];
            }
        }
    }
    return obj;
}
export function stringify(json) {
    let str = '';
    json = flatten(json);
    for (const prop of Object.keys(json)) {
        const key = encodeURIComponent(prop);
        const val = encodeURIComponent(json[prop]);
        str += `${key}=${val}&`;
    }
    return str;
}
export function formBody(json, prefix, omit) {
    json = flatten(json, prefix, omit);
    return stringify(json);
}
export async function _callStripeAPI(fetchUrl, fetchOpts) {
    var _a;
    const res = await fetch(fetchUrl, fetchOpts);
    let parsed;
    try {
        parsed = await res.json();
    }
    catch (e) {
        parsed = await res.text();
    }
    if (res.ok) {
        return parsed;
    }
    else {
        throw ((_a = parsed === null || parsed === void 0 ? void 0 : parsed.error) === null || _a === void 0 ? void 0 : _a.message) ? parsed.error.message : parsed;
    }
}
export async function _stripePost(path, body, key, extraHeaders) {
    extraHeaders = extraHeaders || {};
    return _callStripeAPI(`https://api.stripe.com${path}`, {
        body: body,
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Authorization': `Bearer ${key}`, 'Stripe-version': '2020-03-02' }, extraHeaders),
    });
}
export async function _stripeGet(path, key, extraHeaders) {
    extraHeaders = extraHeaders || {};
    return _callStripeAPI(`https://api.stripe.com${path}`, {
        method: 'GET',
        headers: Object.assign({ 'Accept': 'application/json', 'Authorization': `Bearer ${key}`, 'Stripe-version': '2020-03-02' }, extraHeaders),
    });
}
//# sourceMappingURL=helper.js.map