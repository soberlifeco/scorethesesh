"use client";

import Script from "next/script";

const FORM_HTML = `
<style type="text/css">@import url("https://assets.mlcdn.com/fonts.css?version=1788452");</style>
<style type="text/css">
.ml-form-embedSubmitLoad { display: inline-block; width: 20px; height: 20px; }
.g-recaptcha { transform: scale(1); -webkit-transform: scale(1); transform-origin: 0 0; -webkit-transform-origin: 0 0; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
.ml-form-embedSubmitLoad:after { content: " "; display: block; width: 11px; height: 11px; margin: 1px; border-radius: 50%; border: 4px solid #fff; border-color: #ffffff #ffffff #ffffff transparent; animation: ml-form-embedSubmitLoad 1.2s linear infinite; }
@keyframes ml-form-embedSubmitLoad { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
#mlb2-46463845.ml-form-embedContainer { box-sizing: border-box; display: table; margin: 0 auto; position: static; width: 100% !important; }
#mlb2-46463845.ml-form-embedContainer h4, #mlb2-46463845.ml-form-embedContainer p, #mlb2-46463845.ml-form-embedContainer span, #mlb2-46463845.ml-form-embedContainer button { text-transform: none !important; letter-spacing: normal !important; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper { background-color: rgba(255,255,255,0.05); border-width: 1px; border-color: rgba(255,255,255,0.12); border-radius: 18px; border-style: solid; box-sizing: border-box; display: inline-block !important; margin: 0; padding: 0; position: relative; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper.embedPopup, #mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper.embedDefault { width: 400px; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper.embedForm { max-width: 400px; width: 100%; }
#mlb2-46463845.ml-form-embedContainer .ml-form-align-left { text-align: left; }
#mlb2-46463845.ml-form-embedContainer .ml-form-align-center { text-align: center; }
#mlb2-46463845.ml-form-embedContainer .ml-form-align-default { display: table-cell !important; vertical-align: middle !important; text-align: center !important; }
#mlb2-46463845.ml-form-embedContainer .ml-form-align-right { text-align: right; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedHeader img { border-top-left-radius: 4px; border-top-right-radius: 4px; height: auto; margin: 0 auto !important; max-width: 100%; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody, #mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody { padding: 26px 22px 0 22px; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody.ml-form-embedBodyHorizontal { padding-bottom: 0; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent, #mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent { text-align: center; margin: 0 0 18px 0; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent h4, #mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent h4 { color: #ffffff; font-family: var(--font-space-grotesk), 'Open Sans', Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 700; margin: 0 0 8px 0; text-align: center; word-break: break-word; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p, #mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p { color: rgba(255,255,255,0.7); font-family: var(--font-inter), 'Open Sans', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px; margin: 0 0 10px 0; text-align: center; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p:last-child, #mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p:last-child { margin: 0; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody form { margin: 0; width: 100%; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent, #mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow { margin: 0 0 20px 0; width: 100%; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow { margin: 0 0 10px 0; width: 100%; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow.ml-last-item { margin: 0; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input { background-color: rgba(255,255,255,0.06) !important; color: #ffffff !important; border-color: rgba(255,255,255,0.18); border-radius: 9999px !important; border-style: solid !important; border-width: 1px !important; font-family: var(--font-inter), 'Open Sans', Arial, Helvetica, sans-serif; font-size: 15px !important; height: auto; line-height: 21px !important; margin: 0; padding: 13px 20px !important; outline: none; width: 100% !important; box-sizing: border-box !important; max-width: 100% !important; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit { margin: 0 0 20px 0; float: left; width: 100%; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button { background-color: #39FF14 !important; border: none !important; border-radius: 9999px !important; box-shadow: none !important; color: #000000 !important; cursor: pointer; font-family: var(--font-space-grotesk), 'Open Sans', Arial, Helvetica, sans-serif !important; font-size: 15px !important; font-weight: 700 !important; line-height: 21px !important; height: auto; padding: 13px !important; width: 100% !important; box-sizing: border-box !important; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button.loading { display: none; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button:hover { background-color: #5dff3f !important; }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::placeholder { color: rgba(255,255,255,0.4); }
#mlb2-46463845.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:focus { border-color: rgba(57,255,20,0.7) !important; }
.ml-error input, .ml-error textarea, .ml-error select { border-color: red !important; }
@media only screen and (max-width: 400px) { .ml-form-embedWrapper.embedDefault, .ml-form-embedWrapper.embedPopup { width: 100% !important; } }
</style>

<div id="mlb2-46463845" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-46463845">
  <div class="ml-form-align-center">
    <div class="ml-form-embedWrapper embedForm">
      <div class="ml-form-embedBody ml-form-embedBodyDefault row-form">
        <div class="ml-form-embedContent">
          <h4>Get on the list</h4>
          <p>Launch updates, and first in line on 6th December.</p>
        </div>
        <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/2638909/forms/199881784273405207/subscribe" data-code="" method="post" target="_blank">
          <div class="ml-form-formContent">
            <div class="ml-form-fieldRow ml-last-item">
              <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                <input aria-label="email" aria-required="true" type="email" class="form-control" data-inputmask="" name="fields[email]" placeholder="Email" autocomplete="email">
              </div>
            </div>
          </div>
          <input type="hidden" name="ml-submit" value="1">
          <div class="ml-form-embedSubmit">
            <button type="submit" class="primary">Register interest</button>
            <button disabled="disabled" style="display: none;" type="button" class="loading">
              <div class="ml-form-embedSubmitLoad"></div>
              <span class="sr-only">Loading...</span>
            </button>
          </div>
          <input type="hidden" name="anticsrf" value="true">
        </form>
      </div>
      <div class="ml-form-successBody row-success" style="display: none">
        <div class="ml-form-successContent">
          <h4>You are on the list</h4>
          <p>I will email you before anyone else. Keep an eye on your inbox, and check spam or promotions just in case.</p>
        </div>
      </div>
    </div>
  </div>
</div>
`;

export function MailerLiteForm() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: FORM_HTML }} />
      <Script
        id="ml-success-fn"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function ml_webform_success_46463845() {
              var $ = window.ml_jQuery || window.jQuery;
              $('.ml-subscribe-form-46463845 .row-success').show();
              $('.ml-subscribe-form-46463845 .row-form').hide();
            }
          `,
        }}
      />
      <Script
        src="https://groot.mailerlite.com/js/w/webforms.min.js?v83147fa8ce2d95cb73ece7f28b469519"
        strategy="afterInteractive"
      />
      <Script
        id="ml-tracking-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `fetch("https://assets.mailerlite.com/jsonp/2638909/forms/199881784273405207/takel")`,
        }}
      />
    </>
  );
}
