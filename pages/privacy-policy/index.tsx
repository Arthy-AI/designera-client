import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import toast, {Toaster} from "react-hot-toast";
import {IconButton} from "../../components/button/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import {DesigneraTitleLarge} from "../../assets/svg/DesigneraTitleLarge";


export default function PrivacyPolicy() {
  const router = useRouter()

  return (
    <main className="flex flex-col bg-[#212121]">
      <Head>
        <title>Designera | Create AI-Powered Design Ideas in Seconds</title>
        <meta name="description"
              content="Experience AI-generated personalized design ideas for any room. Explore unique home decor inspirations in seconds, and effortlessly create the dream space tailored to you."/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://designera.app/"/>
        <meta property="og:title"
              content="Designera | Create AI-Powered Design Ideas in Seconds"/>
        <meta property="og:description"
              content="Experience AI-generated personalized design ideas for any room. Explore unique home decor inspirations in seconds, and effortlessly create the dream space tailored to you."/>
        <meta property="og:image"
              content="/assets/site/icon.png"></meta>
        <link rel="shortcut icon" href="/assets/site/favicon.ico"/>
        <meta name="theme-color" content="#FF9900"/>
      </Head>

      <div className="flex flex-col justify-center items-center min-h-screen">
        <div
          className={"group fixed top-28 left-24 flex flex-row items-center cursor-pointer"}
          onClick={() => {
            router.push("/")
          }}>
          <IconButton icon={<FontAwesomeIcon
            icon={faArrowLeft}
            color={"#AAA7A5"}
            size={"xl"}
            style={{width: 20, height: 20}}/>}
                      className={"bg-transparent block"}
          />
          <h1
            className={"select-none text-[#AAA7A5] opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-150"}>Back</h1>
        </div>

        <div
          className={"w-1/2 flex flex-col gap-6 p-4 bg-[#2b2b2b] designera-rounded designera-box-shadow text-white break-words"}>
          <div className="separator-white text-xl select-none">Privacy Policy</div>
          <div className={"Font-Regular break-words whitespace-break-spaces"}>
            <div>
              {`
Privacy Policy

Updated at 2023-01-01


Designera (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Designera.

This Privacy Policy applies to our website, and its associated subdomains (collectively, our “Service”) alongside our application, Designera. By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy and our Terms of Service.

Definitions and key terms

To help explain things as clearly as possible in this Privacy Policy, every time any of these terms are referenced, are strictly defined as:

-Cookie: small amount of data generated by a website and saved by your web browser. It is used to identify your browser, provide analytics, remember information about you such as your language preference or login information.
-Company: when this policy mentions “Company,” “we,” “us,” or “our,” it refers to Ömer Şanlı, (Bozkurt Neighborhood, Bilezikci Street, No: 165, 4th Floor, Apartment 16, Istanbul, Turkey) that is responsible for your information under this Privacy Policy.
-Country: where Designera or the owners/founders of Designera are based, in this case is Turkey
-Customer: refers to the company, organization or person that signs up to use the Designera Service to manage the relationships with your consumers or service users.
-Device: any internet connected device such as a phone, tablet, computer or any other device that can be used to visit Designera and use the services.
-IP address: Every device connected to the Internet is assigned a number known as an Internet protocol (IP) address. These numbers are usually assigned in geographic blocks. An IP address can often be used to identify the location from which a device is connecting to the Internet.
-Personnel: refers to those individuals who are employed by Designera or are under contract to perform a service on behalf of one of the parties.
-Personal Data: any information that directly, indirectly, or in connection with other information — including a personal identification number — allows for the identification or identifiability of a natural person.
-Service: refers to the service provided by Designera as described in the relative terms (if available) and on this platform.
-Third-party service: refers to advertisers, contest sponsors, promotional and marketing partners, and others who provide our content or whose products or services we think may interest you.
-Website: Designera."’s" site, which can be accessed via this URL: www.designera.app
-You: a person or entity that is registered with Designera to use the Services.


What Information Do We Collect?

We collect information from you when you visit our website, register on our site, place an order, subscribe to our newsletter, respond to a survey or fill out a form.

-Name / Username
-Email Addresses
-Billing Addresses
-Debit/credit card numbers
-Password


We also collect information from mobile devices for a better user experience, although these features are completely optional:

-Photo Gallery (Pictures): Granting photo gallery access allows the user to upload any picture from their photo gallery, you can safely deny photo gallery access for this website.


How Do We Use The Information We Collect?

Any of the information we collect from you may be used in one of the following ways:

-To personalize your experience (your information helps us to better respond to your individual needs)
-To improve our website (we continually strive to improve our website offerings based on the information and feedback we receive from you)
-To improve customer service (your information helps us to more effectively respond to your customer service requests and support needs)
-To process transactions
-To administer a contest, promotion, survey or other site feature
-To send periodic emails


When does Designera use end user information from third parties?

Designera will collect End User Data necessary to provide the Designera services to our customers.

End users may voluntarily provide us with information they have made available on social media websites. If you provide us with any such information, we may collect publicly available information from the social media websites you have indicated. You can control how much of your information social media websites make public by visiting these websites and changing your privacy settings.


When does Designera use customer information from third parties?

We receive some information from the third parties when you contact us. For example, when you submit your email address to us to show interest in becoming a Designera customer, we receive information from a third party that provides automated fraud detection services to Designera. We also occasionally collect information that is made publicly available on social media websites. You can control how much of your information social media websites make public by visiting these websites and changing your privacy settings.


Do we share the information we collect with third parties?

We may share the information that we collect, both personal and non-personal, with third parties such as advertisers, contest sponsors, promotional and marketing partners, and others who provide our content or whose products or services we think may interest you. We may also share it with our current and future affiliated companies and business partners, and if we are involved in a merger, asset sale or other business reorganization, we may also share or transfer your personal and non-personal information to our successors-in-interest.



We may engage trusted third party service providers to perform functions and provide services to us, such as hosting and maintaining our servers and the website, database storage and management, e-mail management, storage marketing, credit card processing, customer service and fulfilling orders for products and services you may purchase through the website. We will likely share your personal information, and possibly some non-personal information, with these third parties to enable them to perform these services for us and for you.



We may share portions of our log file data, including IP addresses, for analytics purposes with third parties such as web analytics partners, application developers, and ad networks. If your IP address is shared, it may be used to estimate general location and other technographics such as connection speed, whether you have visited the website in a shared location, and type of the device used to visit the website. They may aggregate information about our advertising and what you see on the website and then provide auditing, research and reporting for us and our advertisers.



We may also disclose personal and non-personal information about you to government or law enforcement officials or private parties as we, in our sole discretion, believe necessary or appropriate in order to respond to claims, legal process (including subpoenas), to protect our rights and interests or those of a third party, the safety of the public or any person, to prevent or stop any illegal, unethical, or legally actionable activity, or to otherwise comply with applicable court orders, laws, rules and regulations.


Where and when is information collected from customers and end users?

Designera will collect personal information that you submit to us. We may also receive personal information about you from third parties as described above.


How Do We Use Your Email Address?

By submitting your email address on this website, you agree to receive emails from us. You can cancel your participation in any of these email lists at any time by clicking on the opt-out link or other unsubscribe option that is included in the respective email. We only send emails to people who have authorized us to contact them, either directly, or through a third party. We do not send unsolicited commercial emails, because we hate spam as much as you do. By submitting your email address, you also agree to allow us to use your email address for customer audience targeting on sites like Facebook, where we display custom advertising to specific people who have opted-in to receive communications from us. Email addresses submitted only through the order processing page will be used for the sole purpose of sending you information and updates pertaining to your order. If, however, you have provided the same email to us through another method, we may use it for any of the purposes stated in this Policy. Note: If at any time you would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email.


How Long Do We Keep Your Information?

We keep your information only so long as we need it to provide Designera to you and fulfill the purposes described in this policy. This is also the case for anyone that we share your information with and who carries out services on our behalf. When we no longer need to use your information and there is no need for us to keep it to comply with our legal or regulatory obligations, we’ll either remove it from our systems or depersonalize it so that we can't identify you.


How Do We Protect Your Information?

We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database only to be accessible by those authorized with special access rights to such systems, and are required to keep the information confidential. After a transaction, your private information (credit cards, social security numbers, financials, etc.) is never kept on file. We cannot, however, ensure or warrant the absolute security of any information you transmit to Designera or guarantee that your information on the Service may not be accessed, disclosed, altered, or destroyed by a breach of any of our physical, technical, or managerial safeguards.


Could my information be transferred to other countries?

Designera is incorporated in Turkey. Information collected via our website, through direct interactions with you, or from use of our help services may be transferred from time to time to our offices or personnel, or to third parties, located throughout the world, and may be viewed and hosted anywhere in the world, including countries that may not have laws of general applicability regulating the use and transfer of such data. To the fullest extent allowed by applicable law, by using any of the above, you voluntarily consent to the trans-border transfer and hosting of such information.


Is the information collected through the Designera Service secure?

We take precautions to protect the security of your information. We have physical, electronic, and managerial procedures to help safeguard, prevent unauthorized access, maintain data security, and correctly use your information. However, neither people nor security systems are foolproof, including encryption systems. In addition, people can commit intentional crimes, make mistakes or fail to follow policies. Therefore, while we use reasonable efforts to protect your personal information, we cannot guarantee its absolute security. If applicable law imposes any non-disclaimable duty to protect your personal information, you agree that intentional misconduct will be the standards used to measure our compliance with that duty.


Can I update or correct my information?

The rights you have to request updates or corrections to the information Designera collects depend on your relationship with Designera. Personnel may update or correct their information as detailed in our internal company employment policies.

Customers have the right to request the restriction of certain uses and disclosures of personally identifiable information as follows. You can contact us in order to (1) update or correct your personally identifiable information, (2) change your preferences with respect to communications and other information you receive from us, or (3) delete the personally identifiable information maintained about you on our systems (subject to the following paragraph), by cancelling your account. Such updates, corrections, changes and deletions will have no effect on other information that we maintain, or information that we have provided to third parties in accordance with this Privacy Policy prior to such update, correction, change or deletion. To protect your privacy and security, we may take reasonable steps (such as requesting a unique password) to verify your identity before granting you profile access or making corrections. You are responsible for maintaining the secrecy of your unique password and account information at all times.

You should be aware that it is not technologically possible to remove each and every record of the information you have provided to us from our system. The need to back up our systems to protect information from inadvertent loss means that a copy of your information may exist in a non-erasable form that will be difficult or impossible for us to locate. Promptly after receiving your request, all personal information stored in databases we actively use, and other readily searchable media will be updated, corrected, changed or deleted, as appropriate, as soon as and to the extent reasonably and technically practicable.

If you are an end user and wish to update, delete, or receive any information we have about you, you may do so by contacting the organization of which you are a customer.


Personnel

If you are a Designera worker or applicant, we collect information you voluntarily provide to us. We use the information collected for Human Resources purposes in order to administer benefits to workers and screen applicants.

You may contact us in order to (1) update or correct your information, (2) change your preferences with respect to communications and other information you receive from us, or (3) receive a record of the information we have relating to you. Such updates, corrections, changes and deletions will have no effect on other information that we maintain, or information that we have provided to third parties in accordance with this Privacy Policy prior to such update, correction, change or deletion.


Sale of Business

We reserve the right to transfer information to a third party in the event of a sale, merger or other transfer of all or substantially all of the assets of Designera or any of its Corporate Affiliates (as defined herein), or that portion of Designera or any of its Corporate Affiliates to which the Service relates, or in the event that we discontinue our business or file a petition or have filed against us a petition in bankruptcy, reorganization or similar proceeding, provided that the third party agrees to adhere to the terms of this Privacy Policy.


Affiliates

We may disclose information (including personal information) about you to our Corporate Affiliates. For purposes of this Privacy Policy, "Corporate Affiliate" means any person or entity which directly or indirectly controls, is controlled by or is under common control with Designera, whether by ownership or otherwise. Any information relating to you that we provide to our Corporate Affiliates will be treated by those Corporate Affiliates in accordance with the terms of this Privacy Policy.


Governing Law

This Privacy Policy is governed by the laws of Turkey without regard to its conflict of laws provision. You consent to the exclusive jurisdiction of the courts in connection with any action or dispute arising between the parties under or in connection with this Privacy Policy except for those individuals who may have rights to make claims under Privacy Shield, or the Swiss-US framework.

The laws of Turkey, excluding its conflicts of law rules, shall govern this Agreement and your use of the website. Your use of the website may also be subject to other local, state, national, or international laws.

By using Designera or contacting us directly, you signify your acceptance of this Privacy Policy. If you do not agree to this Privacy Policy, you should not engage with our website, or use our services. Continued use of the website, direct engagement with us, or following the posting of changes to this Privacy Policy that do not significantly affect the use or disclosure of your personal information will mean that you accept those changes.


Your Consent

We've updated our Privacy Policy to provide you with complete transparency into what is being set when you visit our site and how it's being used. By using our website, registering an account, or making a purchase, you hereby consent to our Privacy Policy and agree to its terms.


Links to Other Websites

This Privacy Policy applies only to the Services. The Services may contain links to other websites not operated or controlled by Designera. We are not responsible for the content, accuracy or opinions expressed in such websites, and such websites are not investigated, monitored or checked for accuracy or completeness by us. Please remember that when you use a link to go from the Services to another website, our Privacy Policy is no longer in effect. Your browsing and interaction on any other website, including those that have a link on our platform, is subject to that website’s own rules and policies. Such third parties may use their own cookies or other methods to collect information about you.


Advertising

This website may contain third party advertisements and links to third party sites. Designera does not make any representation as to the accuracy or suitability of any of the information contained in those advertisements or sites and does not accept any responsibility or liability for the conduct or content of those advertisements and sites and the offerings made by the third parties.

Advertising keeps Designera and many of the websites and services you use free of charge. We work hard to make sure that ads are safe, unobtrusive, and as relevant as possible.

Third party advertisements and links to other sites where goods or services are advertised are not endorsements or recommendations by Designera of the third party sites, goods or services. Designera takes no responsibility for the content of any of the ads, promises made, or the quality/reliability of the products or services offered in all advertisements.


Cookies for Advertising

These cookies collect information over time about your online activity on the website and other online services to make online advertisements more relevant and effective to you. This is known as interest-based advertising. They also perform functions like preventing the same ad from continuously reappearing and ensuring that ads are properly displayed for advertisers. Without cookies, it’s really hard for an advertiser to reach its audience, or to know how many ads were shown and how many clicks they received.


Cookies

Designera uses "Cookies" to identify the areas of our website that you have visited. A Cookie is a small piece of data stored on your computer or mobile device by your web browser. We use Cookies to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality like videos may become unavailable or you would be required to enter your login details every time you visit the website as we would not be able to remember that you had logged in previously. Most web browsers can be set to disable the use of Cookies. However, if you disable Cookies, you may not be able to access functionality on our website correctly or at all. We never place Personally Identifiable Information in Cookies.


Blocking and disabling cookies and similar technologies

Wherever you're located you may also set your browser to block cookies and similar technologies, but this action may block our essential cookies and prevent our website from functioning properly, and you may not be able to fully utilize all of its features and services. You should also be aware that you may also lose some saved information (e.g. saved login details, site preferences) if you block cookies on your browser. Different browsers make different controls available to you. Disabling a cookie or category of cookie does not delete the cookie from your browser, you will need to do this yourself from within your browser, you should visit your browser's help menu for more information.


Remarketing Services

We use remarketing services. What Is Remarketing? In digital marketing, remarketing (or retargeting) is the practice of serving ads across the internet to people who have already visited your website. It allows your company to seem like they're “following” people around the internet by serving ads on the websites and platforms they use most.


Payment Details

In respect to any credit card or other payment processing details you have provided us, we commit that this confidential information will be stored in the most secure manner possible.


Kids' Privacy

We collect information from kids under the age of 13 just to better our services. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data without your permission, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.


Changes To Our Privacy Policy

We may change our Service and policies, and we may need to make changes to this Privacy Policy so that they accurately reflect our Service and policies. Unless otherwise required by law, we will notify you (for example, through our Service) before we make changes to this Privacy Policy and give you an opportunity to review them before they go into effect. Then, if you continue to use the Service, you will be bound by the updated Privacy Policy. If you do not want to agree to this or any updated Privacy Policy, you can delete your account.


Third-Party Services

We may display, include or make available third-party content (including data, information, applications and other products services) or provide links to third-party websites or services ("Third- Party Services").
You acknowledge and agree that Designera shall not be responsible for any Third-Party Services, including their accuracy, completeness, timeliness, validity, copyright compliance, legality, decency, quality or any other aspect thereof. Designera does not assume and shall not have any liability or responsibility to you or any other person or entity for any Third-Party Services.
Third-Party Services and links thereto are provided solely as a convenience to you and you access and use them entirely at your own risk and subject to such third parties' terms and conditions.


Tracking Technologies

-Cookies

We use Cookies to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality like videos may become unavailable or you would be required to enter your login details every time you visit the website as we would not be able to remember that you had logged in previously.

-Local Storage

Local Storage sometimes known as DOM storage, provides web apps with methods and protocols for storing client-side data. Web storage supports persistent data storage, similar to cookies but with a greatly enhanced capacity and no information stored in the HTTP request header.

-Sessions

Designera uses "Sessions" to identify the areas of our website that you have visited. A Session is a small piece of data stored on your computer or mobile device by your web browser.


Information about General Data Protection Regulation (GDPR)

We may be collecting and using information from you if you are from the European Economic Area (EEA), and in this section of our Privacy Policy we are going to explain exactly how and why is this data collected, and how we maintain this data under protection from being replicated or used in the wrong way.


What is GDPR?

GDPR is an EU-wide privacy and data protection law that regulates how EU residents' data is protected by companies and enhances the control the EU residents have, over their personal data.

The GDPR is relevant to any globally operating company and not just the EU-based businesses and EU residents. Our customers’ data is important irrespective of where they are located, which is why we have implemented GDPR controls as our baseline standard for all our operations worldwide.


What is personal data?

Any data that relates to an identifiable or identified individual. GDPR covers a broad spectrum of information that could be used on its own, or in combination with other pieces of information, to identify a person. Personal data extends beyond a person’s name or email address. Some examples include financial information, political opinions, genetic data, biometric data, IP addresses, physical address, sexual orientation, and ethnicity.


The Data Protection Principles include requirements such as:

-Personal data collected must be processed in a fair, legal, and transparent way and should only be used in a way that a person would reasonably expect.
-Personal data should only be collected to fulfil a specific purpose and it should only be used for that purpose. Organizations must specify why they need the personal data when they collect it.
-Personal data should be held no longer than necessary to fulfil its purpose.
-People covered by the GDPR have the right to access their own personal data. They can also request a copy of their data, and that their data be updated, deleted, restricted, or moved to another organization.


Why is GDPR important?

GDPR adds some new requirements regarding how companies should protect individuals' personal data that they collect and process. It also raises the stakes for compliance by increasing enforcement and imposing greater fines for breach. Beyond these facts it's simply the right thing to do. At Designera we strongly believe that your data privacy is very important and we already have solid security and privacy practices in place that go beyond the requirements of this new regulation.


Individual Data Subject's Rights - Data Access, Portability and Deletion

We are committed to helping our customers meet the data subject rights requirements of GDPR. Designera processes or stores all personal data in fully vetted, DPA compliant vendors. We do store all conversation and personal data for up to 6 years unless your account is deleted. In which case, we dispose of all data in accordance with our Terms of Service and Privacy Policy, but we will not hold it longer than 60 days.

We are aware that if you are working with EU customers, you need to be able to provide them with the ability to access, update, retrieve and remove personal data. We got you! We've been set up as self service from the start and have always given you access to your data and your customers data. Our customer support team is here for you to answer any questions you might have about working with the API.


California Residents

The California Consumer Privacy Act (CCPA) requires us to disclose categories of Personal Information we collect and how we use it, the categories of sources from whom we collect Personal Information, and the third parties with whom we share it, which we have explained above.

We are also required to communicate information about rights California residents have under California law. You may exercise the following rights:

-Right to Know and Access. You may submit a verifiable request for information regarding the: (1) categories of Personal Information we collect, use, or share; (2) purposes for which categories of Personal Information are collected or used by us; (3) categories of sources from which we collect Personal Information; and (4) specific pieces of Personal Information we have collected about you.
-Right to Equal Service. We will not discriminate against you if you exercise your privacy rights.
-Right to Delete. You may submit a verifiable request to close your account and we will delete Personal Information about you that we have collected.
-Request that a business that sells a consumer's personal data, not sell the consumer's personal data.

If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
We do not sell the Personal Information of our users.
For more information about these rights, please contact us.


California Online Privacy Protection Act (CalOPPA)

CalOPPA requires us to disclose categories of Personal Information we collect and how we use it, the categories of sources from whom we collect Personal Information, and the third parties with whom we share it, which we have explained above.

CalOPPA users have the following rights:

-Right to Know and Access. You may submit a verifiable request for information regarding the: (1) categories of Personal Information we collect, use, or share; (2) purposes for which categories of Personal Information are collected or used by us; (3) categories of sources from which we collect Personal Information; and (4) specific pieces of Personal Information we have collected about you.
-Right to Equal Service. We will not discriminate against you if you exercise your privacy rights.
-Right to Delete. You may submit a verifiable request to close your account and we will delete Personal Information about you that we have collected.
-Right to request that a business that sells a consumer's personal data, not sell the consumer's personal data.

If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.

We do not sell the Personal Information of our users.
                        `}
            </div>
          </div>


          <div className="separator-white text-xl select-none">Contact Us!</div>
          <div className={"Font-Regular text-center flex flex-col items-center"}>
            <div className={"mb-8 Font-SemiBold"}>
              <a href={"mailto:team@arthylabs.com"} className={"underline hover:text-[#FF9900] transition-colors ease-in-out duration-150"}>team@arthylabs.com</a>
            </div>
            <DesigneraTitleLarge/>
          </div>
        </div>

      </div>

      <Toaster/>
    </main>
  );
}
