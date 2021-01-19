import React from "react";
import { useHistory } from "react-router-dom";

import { Container, IconButton } from "@material-ui/core";

import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";

import { SIGN_UP_ROUTE } from "../constants/routes";

function PrivacyPolicy() {
  const history = useHistory();

  return (
    <Container>
      <div className="b-static-content">
        <IconButton color="primary" onClick={() => history.push(SIGN_UP_ROUTE)}>
          <ArrowBackOutlinedIcon  />
        </IconButton>
        <h1>Contents</h1>
        <h3>(Last amended: August 2020)</h3>
        <ol className="b-list-sections-names">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#how-it-works">How It Works</a>
          </li>
          <li>
            <a href="#account-registration">Account Registration</a>
          </li>
          <li>
            <a href="#subscriptions-purchases-and-payment-of-revenue">
              Subscriptions, Purchases and Payment of Revenue
            </a>
          </li>
          <li>
            <a href="#wallet-credits">Wallet Credits</a>
          </li>
          <li>
            <a href="#twitter">Twitter</a>
          </li>
          <li>
            <a href="#account-deactivation">Account Deactivation</a>
          </li>
          <li>
            <a href="#intellectual-property-rights">Intellectual Property Rights</a>
          </li>
          <li>
            <a href="#license">Licence</a>
          </li>
          <li>
            <a href="#acceptable-use">Acceptable Use</a>
          </li>
          <li>
            <a href="#user-content">User Content</a>
          </li>
          <li>
            <a href="#dmca">DMCA</a>
          </li>
          <li>
            <a href="#linking-to-the-website-and-social-media-features">
              Linking to the Website and Social Media Features
            </a>
          </li>
          <li>
            <a href="#links-from-the-website">Links from the Website</a>
          </li>
          <li>
            <a href="#referral-program">Referral Program</a>
          </li>
          <li>
            <a href="#disclaimer-of-warranties-limitations-of-liability">
              Disclaimer of Warranties; Limitations of Liability
            </a>
          </li>
          <li>
            <a href="#user-indemnification">User indemnification</a>
          </li>
          <li>
            <a href="#governing-law-and-dispute-resolution">Governing Law and Dispute Resolution</a>
          </li>
          <li>
            <a href="#waiver-and-severability">Waiver and Severability</a>
          </li>
          <li>
            <a href="#general">General</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ol>
        <h1>Definitions</h1>
        <p>In these Terms following terms have the following meanings:</p>
        <div className="b-list-terms-definitions">
          <p>
            <strong>"Chargeback"</strong>a bona fide demand by a credit-card provider for FIL to make good the loss the
            credit card provider has incurred because the User has without justification disputed a purchase for which
            the User paid for using the User’s credit card;
          </p>
          <p>
            <strong>"Creator"</strong>a User who uploads Content on the Website to be viewed by other Users;
          </p>
          <p>
            <strong>"Commission"</strong>
            the amount calculated as a percentage of the Revenue paid by Fans to view a Creator’s User Content or to use
            the Fan Interaction;
          </p>
          <p>
            <strong>"Incentive Payment"</strong>
            the payments that are made by FIL to Users who introduce new Users to Alizee, which shall be equal to 5% of
            all the Commission earned by the referred User.
          </p>
          <p>
            <strong>"FIL"</strong>
            Fenix International Limited, with company registration number: 10354575 and registered address: Fourth Floor
            Imperial House 8 Kean Street London WC2B 4AS; Fenix Internet LLC, wholly owned subsidiary of Fenix
            International Limited.
          </p>
          <p>
            <strong>"Fan"</strong>a User who follows another Creator and views the Creator’s User Content;
          </p>
          <p>
            <strong>"Fan Interaction"</strong>
            any functionality offered by a Creator as part of that Creator’s User Content which is hosted by Alizee
            which allows a Fan to interact with (as opposed to just view) the User Content and or the Creator.
          </p>
          <p>
            <strong>"Alizee"</strong>
            the social network of Users operating on the Website which enables Users to provide and view User Content
            and where appropriate, utilise Fan Interaction;
          </p>
          <p>
            <strong>"Payment Provider"</strong>
            any third party approved by FIL which enables a User to make payments or a Creator to receive;
          </p>
          <p>
            <strong>"Payout Options"</strong>
            the instruction given by each Creator to a Payment Provider as to how Commission will be transferred by the
            Payment Provider to the Creator;
          </p>
          <p>
            <strong>"Refund"</strong>
            the return of monies to a Fan after a bona fide dispute, often issued prior to a chargeback;
          </p>
          <p>
            <strong>"Revenue"</strong>
            the monies paid by a Fan to FIL to view User Content or to use Fan Interaction;
          </p>
          <p>
            <strong>"User"</strong>
            any user of the Website, whether a Creator or a Fan;
          </p>
          <p>
            <strong>"User Account"</strong>
            the section on the Website which can only be accessed by FIL or the User which inter alia details the
            Payment Provider and Payout Options;
          </p>
          <p>
            <strong>"User Content"</strong>
            any and all photos, videos and other material or facility (including Fan Interaction functionality) uploaded
            onto the Website by a Creator;
          </p>
          <p>
            <strong>"Wallet Credits"</strong>a prepayment made by a Fan to FIL to facilitate access to User Content/Fan
            Interaction under the terms contained within this agreement.
          </p>
          <p>
            <strong>"Website"</strong>
            the website at www.Alizee.com.
          </p>
        </div>
        <ol className="b-list-sections">
          <li data-section="about">
            <div className="invisible-scroll-el" id="about"></div>
            <h1>About</h1>
            <ol>
              <li>
                The Website is a social media website and application service which allows Users to create a profile,
                upload photos and videos onto their profile, set a monthly subscription price payable by other Users who
                wish to view their User Content and thereby generate revenue from Fans. Alizee is operated by FIL.
              </li>
              <li>
                These Terms govern your use of the Website, including any content, functionality, and services offered
                on or through the Website whether part of Alizee. By registering with and using Alizee, you hereby
                accept and agree to be bound by and abide by these Terms. If you do not want to agree to these Terms of
                Service, you must not access or use the Website.
              </li>
              <li>
                Any information given on the Website including responses to “frequently answered questions” is not
                legally binding on FIL is informative only and does not form part of the Terms.
              </li>
              <li>
                The Website is only offered and available to Users who are 18 years of age or older. By using the
                Website, you represent and warrant that you are 18 years of age, that you are of legal age to form a
                binding contract with FIL. If you do not meet all of these conditions, you must not access or use the
                Website. The Privacy Policy outlines in greater detail how FIL uses third parties to verify your
                eligibility.
              </li>
              <li>
                FIL reserves the right to make changes to these Terms at any time and at FIL’s sole discretion. All
                changes are effective immediately from the time FIL posts them, and apply to all access to and use of
                the Website thereafter. By continuing to use Alizee, you agree to the Terms as modified or as they
                currently appear. You are expected to check this page from time to time so you are aware of any changes,
                as they are binding on you.
              </li>
              <li>
                By using Alizee you consent to receiving communications from FIL electronically, including emails and
                messages posted to your Alizee account, all as more fully detailed in the Privacy Policy (available
                here) (http://www.Alizee.com/privacy). You acknowledge and agree that all communications that FIL sends
                to you electronically satisfy any legal requirement that such communications be in writing. If you wish
                at any time to withdraw your consent to receiving communications from FIL, please email
                support@Alizee.com, notifying FIL of the withdrawal of your consent.
              </li>
              <li>
                FIL does not own User Content on Alizee and views expressed by Users on Alizee do not represent FIL’s
                views. All transactions and interactions regarding User Content on Alizee are between Users. Except when
                FIL acts as the agent of a Creator to receive payment for the Creator from a Fan (as further described
                in clause 1.8), at no point will FIL be a party to or be responsible for any transaction or interaction
                between Users.
              </li>
              <li>
                Where FIL receives payment from a Fan to view User Content uploaded by a Creator or utilise Fan
                Interaction, FIL receives such payment on behalf of the Creator and not the Fan. On receipt of payment
                by FIL the Creator shall have no right of action against the Fan for non-payment and the Creator shall
                be obliged to allow the Fan to view the User Content and utilise Fan Interaction (where applicable).
                Section 4 further describes the payment process.
              </li>
              <li>
                FIL reserves the right at any time and without notice to:
                <ol>
                  <li>modify, suspend or terminate Alizee or any portion thereof;</li>
                  <li>restrict, limit, suspend or terminate your access to Alizee or any portion thereof;</li>
                  <li>
                    delete any content you post on Alizee as a Creator if in FIL’s reasonable opinion it does not comply
                    with these Terms and/or any applicable law;
                  </li>
                  <li>
                    monitor your use of Alizee (including any content or message you post or broadcast on Alizee) to
                    verify compliance with these Terms and/or any applicable law;
                  </li>
                  <li>
                    investigate any suspected or alleged misuse or unlawful use of Alizee and cooperate with law
                    enforcement agencies in such investigation;
                  </li>
                  <li>
                    disclose information about your use of Alizee in connection with law enforcement investigation of
                    any suspected or alleged illegal activity, or in response to a lawful court order; or
                  </li>
                  <li>
                    change the Payment Providers. If FIL does this then FIL will use its reasonable endeavours to verify
                    the bona fides and good standing of the new Payment Provider and notify the User and applicable
                    details will be uploaded to the User Account.
                  </li>
                </ol>
              </li>
              <li>
                From time to time, FIL may restrict access to some parts of the Website, or the entire Website, to
                Users.
              </li>
            </ol>
          </li>
          <li data-section="how-it-works">
            <div className="invisible-scroll-el" id="how-it-works"></div>
            <h1>How It Works</h1>
            <ol>
              <li>
                Alizee is a social media platform that lets you create a User profile, which in turn allows you to:
                <ol>
                  <li>
                    upload User Content to be viewed by other Users or Fan Interaction to be used by other Fans; and/or
                  </li>
                  <li>pay to view another User’s User Content or use another User’s Fan Interaction.</li>
                </ol>
              </li>
            </ol>
          </li>
          <li data-section="account-registration">
            <div className="invisible-scroll-el" id="account-registration"></div>
            <h1>Account Registration</h1>
            <ol>
              <li>
                To become a User you must register and create a User Account on Alizee. You must provide a valid email
                address, a username, and a password or a valid Twitter account. It is a condition of your use of the
                Website that all the information you provide on the Website is correct, current, and complete.
              </li>
              <li>
                You agree that all information you provide as a User or otherwise, including but not limited to
                information provided through the use of any interactive features on the Website, is governed by FIL’s
                Privacy Policy at https://Alizee.com/privacy (/privacy), and you proceed on the basis that you are aware
                of how and why FIL process your personal data, as is set out in FIL’s Privacy Policy.
              </li>
              <li>
                If you wish to view User Content you will need to provide details of a payment card to a Payment
                Provider. Your payment card information is stored by the Payment Provider.
              </li>
              <li>
                If you elect to input two or more payment card details onto your User Account if payment of the Revenue
                from the first card is rejected because the payment card is no longer valid then the other payment
                card(s) will be used to collect full payment of the Revenue.
              </li>
              <li>
                If you are a Creator and wish to receive payment of Commissions, you will need to include onto your User
                Account Payout Options and upload a valid form of ID. You may also need to submit additional legal
                information, such as a W-9 if you are resident in the United States of America. The exact information
                required will depend on your country of residence. Amounts due to you as a Creator from Fans will be
                paid to you by one of our Payment Providers in accordance with your Payout Options. With the exception
                of Creators wishing to receive payment by direct bank transfer from FIL, FIL does not store any data
                disclosed by you when you register your Payout Options with the Payment Provider. Section 4 further
                describes the payment processes.
              </li>
              <li>
                By registering on Alizee, you confirm that:
                <ol>
                  <li>
                    all User Account registration and profile information is truthful and accurate and that any User
                    Content you provide is your own and does not infringe the intellectual property rights or any other
                    proprietorial rights of a third party;
                  </li>
                  <li>
                    if you previously had a User Account with Alizee, your old User Account was not terminated or
                    suspended by FIL for violation of the Terms of Service;
                  </li>
                  <li>
                    you register on Alizee for your own personal use and you will not sell, rent or transfer your User
                    Account to any third party; and
                  </li>
                  <li>
                    FIL reserve the right, at any time, to verify the information which you provide to FIL as well as
                    your compliance with the Terms. If FIL is unable to verify this then FIL reserve the right to
                    suspend your account.
                  </li>
                  <li>
                    you will not use any third party payment processors to accept payments for subscriptions, or any
                    other service, via Alizee.
                  </li>
                </ol>
              </li>
              <li>
                You are fully responsible for any and all activities that occur on your account and you are responsible
                for keeping your login details confidential and secure. You agree not to disclose these details to any
                other person or entity and immediately notify FIL at support@Alizee.com if you believe someone has used
                or is using your account without your permission or if your account has been subject to any other breach
                of security. You also agree to ensure that you log out of your account at the end of each session. You
                should use particular caution when accessing your account from a public or shared computer so that
                others are not able to access, view or record your password or other personal information.
              </li>
              <li>
                FIL reserves the right to disable any user name, password, or other identifier, whether chosen by you or
                provided by FIL, at any time and at FIL’s sole discretion for any or no reason, including if, in FIL
                opinion, you have violated any provision of the Terms.
              </li>
            </ol>
          </li>
          <li data-section="subscriptions-purchases-and-payment-of-revenue">
            <div className="invisible-scroll-el" id="subscriptions-purchases-and-payment-of-revenue"></div>
            <h1>Subscriptions, Purchases and Payment of Revenue</h1>
            <ol>
              <li>
                FIL will procure that Payment Providers ensure that Creators will receive the Commission from FIL with
                the difference between the Revenue and Commission being a management fee (which will include Incentive
                Payments) levied by FIL and payments due to the Payment Providers. The management fee is for providing,
                maintaining and operating the Website.
                <span>
                  <i></i>
                </span>
                The Commission will be 80% of the Revenue generated by Fans paying to view User Content uploaded by you
                or use Fan Interaction.
              </li>
              <li>
                In order to view User Content or utilise Fan Interaction on Alizee, you must first add a payment card to
                your account and then click the 'Subscribe' button on the relevant Creator’s profile. Your payment card
                details will be passed to a Payment Provider which will take payment from your payment card and pay it
                into FIL’s account.
              </li>
              <li>
                Depending on your use of Alizee the Payment Provider will take monthly payments or will take payments
                for ad hoc purchases such as Fan Interaction. However, you may cancel the monthly payments at any time
                by turning off the 'Auto-Renew' switch located under the relevant Creator’s User Content profile or by
                contacting FIL at support@Alizee.com. If you cancel your monthly payments you will continue to be
                permitted to view the Creator's User Content until the end of the existing billing period, after which
                no further payments will be taken from your payment card and you will no longer be able to view the
                relevant Creator’s User Content.
              </li>
              <li>
                FIL receives the Revenue and holds the Commission on behalf of the relevant Creator, and not on your
                behalf as a Fan. Once FIL has received payment from you as a Fan you have no further liability to the
                relevant Creator and the Creator shall allow you as a Fan to view the User Content or utilise Fan
                Interaction.
              </li>
              <li>
                FIL will take payment of the Revenue from the Fan and hold the Commission in FIL’s capacity as the agent
                for the Creator.
              </li>
              <li>
                All payments to view User Content or utilise Fan Interaction are final and non-refundable. If FIL is
                alerted that a Fan has sought and received a Refund or Chargeback, FIL will take additional actions. Any
                purchase of the right to view User Content or to use Fan Interaction which is subsequently subject to a
                Refund or Chargeback may result in the User’s account being immediately and permanently excluded from
                Alizee. The Refund or Chargeback amount may be removed from the earning Creator's income. The Creator
                may be alerted to the Fan Refund or Chargeback.
              </li>
            </ol>
          </li>
          <li data-section="wallet-credits">
            <div className="invisible-scroll-el" id="wallet-credits"></div>
            <h1>Wallet Credits</h1>
            <ol>
              <li>
                A Fan can prepay an amount to FIL known as Wallet Credits which the Fan can later use to view User
                Content/access Fan Interaction on the terms contained within this agreement.
              </li>
              <li>Wallet Credits are non-transferable; any unused Wallet Credits cannot be withdrawn.</li>
              <li>
                Once a Fan has applied any of the Wallet Credits in accordance with 5.1 above, the Wallet Credits are
                non-refundable.
              </li>
              <li>
                Purchases on the Website cannot be divided; if a Fan attempts a purchase that is greater than the amount
                of remaining Wallet Credits, the Fan’s connected payment card will be charged the full amount.
              </li>
              <li>Wallet Credits are subject to a maximum amount as determined by FIL, from time to time.</li>
            </ol>
          </li>
          <li data-section="twitter">
            <div className="invisible-scroll-el" id="twitter"></div>
            <h1>Twitter</h1>
            Alizee allows Users to connect a Twitter account and to post any Alizee posts to Twitter. By using this
            feature, you must fully comply with and respect Twitter's Terms of Service, which can be read in full here:
            https://twitter.com/tos
          </li>
          <li data-section="account-deactivation">
            <div className="invisible-scroll-el" id="account-deactivation"></div>
            <h1>Account Deactivation</h1>
            <ol>
              <li>
                Should you wish to deactivate your Alizee membership then you may do so in your User Account section.
              </li>
              <li>
                If you are a Fan then any account deactivation will take place as soon as reasonably possible. You will
                no longer be charged or have access to User Content or Fan Interaction. Any subscriptions will be
                deleted and cannot be subsequently renewed.
              </li>
              <li>
                If you are a Creator then you can only deactivate your membership when your last Fan Subscription has
                expired, and you have withdrawn any balance on your account.
              </li>
              <li>
                If a User is both a Creator and a Fan then the account will be deactivated in two stages (Fan and then
                Creator).
              </li>
              <li>You will receive an email confirmation upon the successful deletion of your account.</li>
            </ol>
          </li>
          <li data-section="intellectual-property-rights">
            <div className="invisible-scroll-el" id="intellectual-property-rights"></div>
            <h1>Intellectual Property Rights</h1>
            <ol>
              <li>
                Other than User Content, the Website and its entire contents, features, and functionality (including but
                not limited to all information, software, text, displays, images, video, and audio, and the design,
                selection, and arrangement thereof), are owned by FIL, FIL licensors, or other providers of such
                material and are protected by international copyright, trademark, patent, trade secret, and other
                intellectual property or proprietary rights laws.
              </li>
              <li>
                You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly
                perform, republish, download, store, or transmit any of the material on the Website, except as follows:
                <ol>
                  <li>
                    you may store files that are automatically cached by your Web browser for display enhancement
                    purposes; and
                  </li>
                  <li>
                    you may print or download one copy of a reasonable number of pages of the Website for your own
                    personal, non-commercial use and not for further reproduction, publication, or distribution.
                  </li>
                </ol>
              </li>
              <li>
                If you print, copy, modify, download, or otherwise use or provide any other person with access to any
                part of the Website in breach of the Terms, your right to use the Website will end immediately and you
                must, at FIL option, return or destroy any copies of the materials you have made.
              </li>
              <li>
                Other than User Content, no right, title, or interest in or to the Website or any content on the Website
                is transferred to you, and all rights not expressly granted are reserved by FIL. Any use of the Website
                not expressly permitted by these Terms is a breach of these Terms and may violate copyright, trademark,
                and other laws.
              </li>
              <li>
                The Alizee name, logo and all related names, logos, product and service names, designs, and slogans are
                trademarks of FIL or FIL affiliates or licensors. You must not use such marks without FIL prior written
                permission. All other names, logos, product and service names, designs, and slogans on the Website are
                the trademarks of their respective owners.
              </li>
            </ol>
          </li>
          <li data-section="license">
            <div className="invisible-scroll-el" id="license"></div>
            <h1>Licence</h1>
            <ol>
              <li>
                Subject to all of the terms, conditions, limitations and restrictions contained in these Terms, we grant
                to you a conditional, revocable, non-transferable, non-sublicensable, non-exclusive and limited licence
                to use the Website for your own lawful and personal use only. You acknowledge and agree that the
                foregoing license may be revoked and terminated by FIL at any time and for any reason (including,
                without limitation, if you violate these Terms or any applicable law). Any use of Alizee other than as
                expressly permitted by these Terms is strictly prohibited. All rights not expressly granted herein are
                reserved by FIL.
              </li>
              <li>
                FIL does not warrant that Alizee is compatible with all devices and operating systems. It is your sole
                responsibility to determine whether or not Alizee is compatible with your device.
              </li>
            </ol>
          </li>
          <li data-section="acceptable-use">
            <div className="invisible-scroll-el" id="acceptable-use"></div>
            <h1>Acceptable Use</h1>
            <ol>
              <li>
                FIL requires that all Users respect and comply with these Terms below, at all times, when using Alizee.
              </li>
              <li>
                You may not:
                <ol>
                  <li>use Alizee other than for your own lawful and personal use in accordance with these Terms;</li>
                  <li>
                    impersonate FIL, one of FIL employees, another User, or any other person or entity or falsely state,
                    suggest or otherwise misrepresent any affiliation, endorsement, sponsorship between you and FIL
                    and/or any other person or entity;
                  </li>
                  <li>
                    falsify account registration information, or make unauthorized use of another's information or
                    content;
                  </li>
                  <li>
                    use Alizee in any manner or for any purpose that is illegal or unlawful, including engaging in any
                    activity that violates any right of any person or entity;
                  </li>
                  <li>
                    copy, reproduce, distribute, modify, or create derivative works from, any portion of Alizee without
                    FIL express written permission;
                  </li>
                  <li>
                    use Alizee for the purpose of exploiting, harming, or attempting to exploit or harm minors in any
                    way by exposing them to inappropriate content, asking for personally identifiable information, or
                    otherwise;
                  </li>
                  <li>
                    transmit, or procure the sending of, any advertising or promotional material, including any “junk
                    mail”, “chain letter”, “spam”, or any other similar solicitation;
                  </li>
                  <li>
                    engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of the Website, or
                    which, as determined by FIL, may harm FIL or Users of the Website or expose them to liability;
                  </li>
                </ol>
              </li>
              <li>
                You shall not create, upload, post, display, publish or distribute User Content that:
                <ol>
                  <li>
                    is obscene, illegal, fraudulent, defamatory, libelous, hateful, discriminatory, threatening or
                    harassing, or in any way which incites violence or violates any of the aforementioned prohibitions;
                  </li>
                  <li>
                    violates another's copyright, trademark, right of privacy, right of publicity, or other property or
                    personal right (for example, using the name, likeness, image or other identity of another without
                    proper consent);
                  </li>
                  <li>promotes or advertises escort services;</li>
                  <li>promotes or advertises fireams or other weapons, drugs, or drug paraphernalia;</li>
                  <li>promotes any illegal activity, or advocates, promotes, or assists any unlawful act;</li>
                  <li>
                    causes annoyance, inconvenience, or needless anxiety or is likely to upset, embarrass, alarm, or
                    annoy any other person;
                  </li>
                  <li>
                    involves 3rd party commercial activities or sales, such as contests, sweepstakes and other sales
                    promotions, barter, or advertising;
                  </li>
                  <li>
                    gives the impression that it emanates from or is endorsed by FIL or any other person or entity, if
                    this is not the case.
                  </li>
                </ol>
              </li>
              <li>
                You shall not remove, erase, modify or tamper with any copyright, trademark or other proprietary rights
                notice that is contained in any User Content that you do not own.
              </li>
              <li>
                You shall not use the Website in any manner that could disable, overburden, damage, or impair the site
                or interfere with any other party’s use of the Website, including their ability to engage in real time
                activities through the Website.
              </li>
              <li>
                You shall not decompile, disassemble, reverse engineer, or otherwise attempt to discover or derive the
                source code of Alizee.
              </li>
              <li>
                You shall not interfere in any way with the operation of Alizee or any server, network or system
                associated with Alizee, including, without limitation: hacking, mail-bombing, flooding, overloading, or
                making "denial of service" attacks; probing, scanning or testing the vulnerability of the site or any
                server, network or system associated with the site; breaching or circumventing firewall, encryption,
                security or authentication routines; accessing information not intended for you, or accessing another
                user's account that you are not expressly authorized to access.
              </li>
              <li>
                You shall not use Alizee for any unauthorized purpose, including, without limitation, for purposes of
                building a competitive product or service, performance or functionality, or for any other competitive
                purposes;
              </li>
              <li>
                You shall not use any automated program, tool or process (including without limitation, web crawlers,
                robots, bots spiders, and automated scripts) to access Alizee or any server, network or system
                associated with Alizee, or to extract, collect, harvest or gather content or information from Alizee.
              </li>
              <li>You shall not make any other use of Alizee that violates these Terms or any applicable law.</li>
              <li>
                Any content posted that is reported by another User or Alizee, and that is deemed unacceptable by FIL,
                will be deleted and the User notified via email. Users who repeatedly violate FIL Acceptable Use policy
                may be deactivated. If FIL becomes aware that a User is underage, FIL will promptly deactivate that
                User's account and delete all information and content of that User from Alizee. If you are a parent or
                legal guardian and become aware that your minor-child has registered on Alizee, please immediately
                notify FIL at support@Alizee.com.
              </li>
              <li>
                By registering an account with Alizee, you represent and warrant that:
                <ol>
                  <li>you are at least 18 years of age;</li>
                  <li>you will fully comply with these Terms;</li>
                  <li>
                    you accept full responsibility for the use of Alizee on any device, whether or not it is owned by
                    you;
                  </li>
                  <li>you accept full responsibility for any User Content created or provided by you; and</li>
                  <li>your use of Alizee will not violate these Terms or any applicable law.</li>
                </ol>
              </li>
              <li>
                If you are using Alizee on behalf of a business or other entity, you warrant that you are authorised to
                grant all the licences stipulated in or entailed by these Terms and that you are authorised to bind the
                business or other entity to these Terms.
              </li>
            </ol>
          </li>
          <li data-section="user-content">
            <div className="invisible-scroll-el" id="user-content"></div>
            <h1>User Content</h1>
            <ol>
              <li>
                By creating and publishing User Content on Alizee, you authorize your Fans to access and view (without
                downloading or copying) your User Content on Alizee for their own lawful and personal use. You also
                represent, warrant and undertake that for each submission:
                <ol>
                  <li>
                    you own, have a valid licence to, or otherwise control all rights in and to your User Content;
                  </li>
                  <li>
                    to the extent your User Content includes or utilises any third-party property, you have secured all
                    rights, licenses, written consents and releases that are necessary for the use of such third-party
                    property in your User Content;
                  </li>
                  <li>you will not post any content depicting any person under 18-years old,</li>
                  <li>
                    you have inspected and are maintaining written documentation sufficient to confirm that all subjects
                    of your submission are in fact 18-years old or older; and
                  </li>
                  <li>your User Content is non-confidential and will be made available to your Fans on Alizee.com.</li>
                </ol>
              </li>
              <li>
                <p>
                  You grant FIL and Our licensees, successors, and assigns the right to use, reproduce, modify, perform,
                  display, distribute, and otherwise disclose to third parties any such material.
                </p>
                <p>
                  For clarification: The clause exists so that we may use your content by adding stickers, text, and
                  watermarks, and to make your content available to Users, as well as for other normal operations of our
                  website. We will never sell your content to other platforms.
                </p>
              </li>
              <li>
                You understand and acknowledge that you are responsible for any User Content you submit or contribute,
                and you have full responsibility for such content, including its legality, reliability, accuracy, and
                appropriateness.
              </li>
              <li>
                You shall indemnify FIL, FIL’s licensees, successors, and assigns against all liabilities, costs,
                expenses, damages and losses (including any direct, indirect or consequential losses, loss of profit,
                loss of reputation and all interest, penalties and legal costs (calculated on a full indemnity basis)
                and all other reasonable professional costs and expenses suffered or incurred arising out of or in
                connection with your User Content.
              </li>
              <li>
                FIL is not responsible or liable to any third party for the content or accuracy of any User Content
                posted by you or any other user of the Website.
              </li>
              <li>
                Upon signing up to Alizee.com, you also agree to act as custodian of records for the content that you
                upload to Alizee.com.
              </li>
              <li>Any questions regarding User Content can be addressed by emailing support@Alizee.com.</li>
            </ol>
          </li>
          <li data-section="dmca">
            <div className="invisible-scroll-el" id="dmca"></div>
            <h1>DMCA</h1>
            <ol>
              <li>
                Alizee respects the intellectual property rights of third parties and voluntarily complies with the
                Digital Millennium Copyright Act (DMCA). Our full DMCA Notice and Takedown Policy can be found here:
                https://Alizee.com/dmca. Alizee has implemented a policy to terminate repeat copyright infringers. A
                copy of our repeat infringer policy (RIP) is available upon request to our users.
              </li>
              <li>
                Please note that, under the DMCA, any person who knowingly makes material misrepresentations in a
                notification of claimed infringement or in a counter-notification may be liable for damages.
              </li>
            </ol>
          </li>
          <li data-section="linking-to-the-website-and-social-media-features">
            <div className="invisible-scroll-el" id="linking-to-the-website-and-social-media-features"></div>
            <h1>Linking to the Website and Social Media Features</h1>
            <ol>
              <li>
                You may link to FIL homepage, provided you do so in a way that is fair and legal and does not damage FIL
                reputation or take advantage of it, but you must not establish a link in such a way as to suggest any
                form of association, approval, or endorsement on FIL part.
              </li>
              <li>
                The Website may provide certain social media features that enable you to:
                <ol>
                  <li>link from your own or certain third-party websites to certain content on the Website;</li>
                  <li>
                    send emails or other communications with certain content, or links to certain content, on the
                    Website;
                  </li>
                  <li>
                    cause limited portions of content on this Website to be displayed or appear to be displayed on your
                    own or certain third-party websites.
                  </li>
                </ol>
              </li>
              <li>
                You may use these features solely as they are provided by FIL, solely with respect to the content they
                are displayed with. However, you must not:
                <ol>
                  <li>establish a link from any website that is not owned by you;</li>
                  <li>
                    12.3.2 cause the Website or portions of it to be displayed on, or appear to be displayed by, any
                    other site, for example, framing, deep linking, or in-line linking;
                  </li>
                  <li>link to any part of the Website other than the homepage; or</li>
                  <li>
                    otherwise take any action with respect to the materials on this Website that is inconsistent with
                    any other provision of these Terms.
                  </li>
                </ol>
              </li>
              <li>
                You agree to cooperate with FIL in causing any unauthorised framing or linking immediately to stop. FIL
                reserves the right to withdraw linking permission without notice.
              </li>
              <li>
                FIL may disable all or any social media features and any links at any time without notice in FIL
                discretion.
              </li>
            </ol>
          </li>
          <li data-section="links-from-the-website">
            <div className="invisible-scroll-el" id="links-from-the-website"></div>
            <h1>Links from the Website</h1>
            <p>
              If the Website contains links to other sites and resources provided by third parties, these links are
              provided for your convenience only. This includes links contained in advertisements, including, without
              limitation, banner advertisements and sponsored links. FIL has no control over the contents of those sites
              or resources, and accepts no responsibility for them or for any loss or damage that may arise from your
              use of them. If you decide to access any of the third-party websites linked to this Website, you do so
              entirely at your own risk and subject to the terms and conditions of use for such websites.
            </p>
          </li>
          <li data-section="referral-program">
            <div className="invisible-scroll-el" id="referral-program"></div>
            <h1>Referral Program</h1>
            <ol>
              <li>
                FIL offers a referral program which incentivises Users to introduce to Alizee people who are interested
                in becoming Users. This clause sets out when FIL will pay an Incentive Payment. FIL reserves the right
                to change the how it pays Incentive Payments but no change will deprive any Users of Incentive Payments
                already earned under before the changes came into effect:
                <ol>
                  <li>Users with a valid User Account with Alizee can participate;</li>
                  <li>each User Account has a unique referral URL which allows Users to earn Incentive Payments;</li>
                  <li>
                    the referred User must use the referring User’s URL and then register with Alizee using the same
                    browser that they used to click the referral link;
                  </li>
                  <li>
                    the referred User has to be someone who has never held a User Account. If the referred User has been
                    or is an existing User FIL will not pay Incentive Payments to the referring User;
                  </li>
                  <li>
                    FIL will not pay Incentive Payments if the referred User does not join Alizee using the correct
                    referral link;
                  </li>
                  <li>
                    if the referred User then sets up more than one new User Account then the obligation to pay
                    Incentive Payments shall only apply to Commissions earned from the first User Account. The referred
                    User will only be a new User with respect to the first User Account.
                  </li>
                  <li>
                    <p>
                      Users may not use confusing business practices to impersonate Alizee with the intention to refer
                      other Users to receive Incentive Payments.
                    </p>
                    <p>
                      More information on how the Referral Programme works can be found at:{" "}
                      <a href="https://Alizee.com/help/" target="_blank">
                        https://Alizee.com/help/
                      </a>
                    </p>
                  </li>
                </ol>
              </li>
              <li>
                If it transpires that Incentive Payments have been made incorrectly then FIL reserves the right to
                recover those monies from the referring User.
              </li>
              <li>
                In order to ensure that the referral program is not abused FIL reserves the right to verify the
                credentials and identity of referred Users and referring Users claiming to have introduced the referred
                Users.
              </li>
              <li>
                The Incentive Payment will be processed on the first calendar business day of each month and paid in
                accordance with the Payment Provider’s terms.
              </li>
              <li>
                The Incentive Payment is deducted from the monies that FIL would retain from the transaction and not
                from the monies earned by the referred User.
              </li>
            </ol>
          </li>
          <li data-section="disclaimer-of-warranties-limitations-of-liability">
            <div className="invisible-scroll-el" id="disclaimer-of-warranties-limitations-of-liability"></div>
            <h1>Disclaimer of Warranties; Limitations of Liability</h1>
            <ol>
              <li>
                By using Alizee, you acknowledge and agree as follows:
                <ol>
                  <li>
                    Alizee and all of its services and features are provided without warranties of any kind, express or
                    implied. To the fullest extent permitted by law, FIL disclaim any and all warranties, express or
                    implied, with respect to Alizee and all of its services and features, including, and without
                    limitation, implied warranties of merchantability and fitness for a particular purpose. FIL does not
                    warrant or guarantee the accuracy, usefulness, completeness or reliability of Alizee, or the results
                    of your use of Alizee. FIL disclaim all liability and responsibility arising from any reliance
                    placed on such materials by you or any other visitor to the Website, or by anyone who may be
                    informed of any of its contents. FIL also do not warrant or guarantee that Alizee and all of its
                    services and features will be available at any particular time or location; that Alizee and all of
                    its services and features will be secure, uninterrupted, and error-free; that any defect or error
                    will be corrected; or that Alizee and all of its services and features will be free of viruses and
                    other harmful components. You are responsible for implementing sufficient procedures and checkpoints
                    to satisfy your particular requirements for antivirus protection and accuracy of data input and
                    output, and for maintaining a means external to the Website for any reconstruction of any lost data.
                    To the fullest extent provided by law, FIL will not be liable for any loss or damage caused by a
                    distributed denial-of-service attack, viruses, or other technologically harmful material that may
                    infect your computer equipment, computer programs, data, or other proprietary material due to your
                    use of the Website or any services or items obtained through the Website or to your downloading of
                    any material posted on it, or on any website linked to it. Your use of Alizee and its services and
                    features will be solely and entirely at your own risk. The foregoing does not affect any warranties
                    that cannot be excluded or limited under applicable law;
                  </li>
                  <li>
                    FIL does not warrant or guarantee that use of the Website will be uninterrupted or error free
                    twenty-four hours a day, seven days a week, since FIL may need to carry out maintenance of the
                    Website from time to time. However, FIL will use its reasonable endeavours to carry out any such
                    maintenance of the Website outside of business hours (between 09:00 and 17:00 UK time) and FIL will
                    endeavour to give reasonable notice, however this may not always be possible;
                  </li>
                  <li>
                    in no event shall FIL be liable (strictly or otherwise) in contract, tort, negligence, strict
                    liability or under any other legal or equitable principle, for any indirect, incidental, exemplary,
                    special, punitive or consequential damages (including, and without limitation, loss of use, profits,
                    data or information, or loss of business goodwill or opportunity) arising out of or related to your
                    use of (or your inability to use) Alizee or any of its services or features, nor shall FIL be held
                    liable in the event your User Content is illegally distributed by another User, however where such
                    distribution does occur please contact FIL at support@Alizee.com and FIL will seek to prevent
                    continuance of such distribution where FIL is reasonably able to do so; and
                  </li>
                  <li>
                    in no event shall FIL total and aggregate liability to you and/or others for any and all claims
                    arising out of or related to your use of (or your inability to use) Alizee or any of its services or
                    features, exceed one hundred pounds sterling (£100.00). This does not affect any liability that
                    cannot be excluded or limited under applicable law.
                  </li>
                </ol>
              </li>
              <li>
                Because some jurisdictions do not allow the exclusion or limitation of liability for consequential or
                incidental damages or total liability, the above limitation may not apply to you. In such case, our
                total and aggregate liability to you arising out of or related to your use of (or your inability to use)
                Alizee or any of its services or features shall be limited to the maximum extent permitted by law or, if
                no amount is specified, one hundred pounds sterling (£100.00).
              </li>
            </ol>
          </li>
          <li data-section="user-indemnification">
            <div className="invisible-scroll-el" id="user-indemnification"></div>
            <h1>User indemnification</h1>
            <ol>
              <li>
                By using Alizee, you agree to indemnify and hold harmless FIL and our employees, agents,
                representatives, successors and assigns from and against any and all claims, demands, causes of action,
                actions, suits, proceedings, judgments, orders, damages, liabilities, losses, costs and expenses
                (including, without limitation, reasonable attorneys' fees and legal costs) arising out of or related to
                any of the following:
                <ol>
                  <li>your use of Alizee or any of its services or features;</li>
                  <li>any User Content created, published, or otherwise made available on Alizee by you;</li>
                  <li>any transaction or interaction between you and any other User of Alizee; and/or</li>
                  <li>your violation of the Terms or any applicable law.</li>
                </ol>
              </li>
              <li>
                Notwithstanding FIL’s appointment as the Creator’s agent to pay the Creator Commission, FIL, the Fan and
                Creator are independent contractors and are responsible for meeting all of their respective legal or
                statutory obligations. This extends to the payment of any taxes or other payments properly demanded by a
                regulatory authority. Should a User fail to meet those obligations then the User shall indemnify FIL for
                any loss or expense, including management time that is as a consequence incurred by FIL.
              </li>
            </ol>
          </li>
          <li data-section="governing-law-and-dispute-resolution">
            <div className="invisible-scroll-el" id="governing-law-and-dispute-resolution"></div>
            <h1>Governing Law and Dispute Resolution</h1>
            <ol>
              <li>
                You and FIL agree that these Terms shall be governed by and construed in accordance with the laws of
                England and Wales (without regard to the conflict of laws provisions thereof) and that any dispute
                between you and FIL concerning Alizee or arising out of or related to these Terms shall be resolved
                exclusively in the courts of England and Wales.
              </li>
              <li>
                Except where prohibited by applicable law, any claim or cause of action by you concerning Alizee or
                arising out of or related to these Terms must be filed within one year after such claim or cause of
                action arose, or be forever barred.
              </li>
            </ol>
          </li>
          <li data-section="waiver-and-severability">
            <div className="invisible-scroll-el" id="waiver-and-severability"></div>
            <h1>Waiver and Severability</h1>
            <ol>
              <li>
                No waiver of any term or condition set out in these Terms shall be deemed a further or continuing waiver
                of such term or condition or a waiver of any other term or condition, and any failure to assert a right
                or provision under these Terms shall not constitute a waiver of such right or provision.
              </li>
              <li>
                If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be
                invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the
                minimum extent such that the remaining provisions of the Terms will continue in full force and effect.
              </li>
            </ol>
          </li>
          <li data-section="general">
            <div className="invisible-scroll-el" id="general"></div>
            <h1>General</h1>
            <ol>
              <li>
                The Terms constitute the sole and entire agreement between you and FIL regarding the Website and
                supersede all prior and contemporaneous understandings, agreements, representations, and warranties,
                both written and oral, regarding the Website.
              </li>
              <li>The Contracts (Rights of Third Parties) Act 1999 is excluded.</li>
            </ol>
          </li>
          <li data-section="contact">
            <div className="invisible-scroll-el" id="contact"></div>
            <h1>Contact</h1>
            If you have any questions, comments, complaints or concerns about Alizee, please contact our support team at
            support@Alizee.com
          </li>
        </ol>
      </div>
    </Container>
  );
}

export default PrivacyPolicy;
