import type { PayUInitiateResponse } from "@/types/checkout";

// submits a hidden POST form to redirect to PayU's hosted checkout
export function redirectToPayU(params: PayUInitiateResponse) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = params.payuUrl;

  const formFields: Record<string, string> = {
    key: params.key,
    txnid: params.txnid,
    amount: params.amount,
    productinfo: params.productinfo,
    firstname: params.firstname,
    email: params.email,
    phone: params.phone,
    surl: params.surl,
    furl: params.furl,
    hash: params.hash,
    service_provider: params.service_provider,
  };

  Object.entries(formFields).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}
