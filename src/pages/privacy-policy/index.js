import Header from "@/sharedComponents/Header";
import Footer from "@/sharedComponents/Footer";
import detectDevice from "@/utils/detectDevice";
import Styles from "./index.module.scss";
import ColorTitle from "@/sharedComponents/ColorTitle";
import FAQ from "@/pageSections/FAQ";

export default function ContactUs({ data, isMobile }) {
  console.log("data", data, isMobile);

  return (
    <div id="root">
      <Header isMobile={isMobile} />
      <div className={Styles.container}>
        <ColorTitle text="Privacy <span>Policy</span>" />
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
        <FAQ showTitle={false} data={data} />
        {/* {data.map((item, idx) => {
          return (
            <div className={Styles.container__section} key={idx}>
              {item.title && <h3>{item.title}</h3>}
              <FAQ data={item} showTitle={false} />
              {item.disclaimer && <p>{item.disclaimer}</p>}
            </div>
          );
        })} */}
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const userAgent = context.req.headers["user-agent"];
  const isMobile = detectDevice(userAgent);

  const data = {
    description: `<p>We at Altruvo Social Ventures Private Limited value the trust you place in us. This is why we
    adhere to the highest standards for secure transactions and user information privacy. Please
    read the following statement to learn about our information gathering and dissemination
    practices. This Privacy Policy should be read in conjunction with the Terms of Use for a full
    understanding of Altruvo's practices and the responsibilities of users when interacting with
    the site www.altruvo.org, our mobile application, and other platforms (hereinafter referred to
    as the “Platform”).</p><p>This Privacy Policy is published in accordance with the provisions of the Indian Information
    Technology Act, 2000 and the rules made thereunder, specifically, The Information
    Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or
    Information) Rules, 2011, and the Information Technology (Intermediary Guidelines) Rules,
    2011.</p><p>All terms used in this Privacy Policy will have the same meaning and definition assigned to
    them in the Information Technology Act, 2000 and the rules made thereunder.</p><p><b>Note:</b></p><p>Our privacy policy is subject to change at any time without notice. To ensure you are aware
    of any changes, please review this policy periodically.</p><p>By visiting this Platform, you agree to be bound by the terms and conditions of this Privacy
    Policy and the Terms of Use of the Platform. If you do not agree, please do not use or access
    the Platform.</p><p>By mere use of the Platform, you expressly consent to our use and disclosure of your
    personal information in accordance with this Privacy Policy. This Privacy Policy is
    incorporated into and subject to the Terms of Use.</p>`,
    faqs: [
      {
        question:
          "Collection of Personally Identifiable Information and Other Information",
        answer: `<p>When you use our Platform, we collect and store your personal information which is
            provided by you from time to time. Our primary goal in doing so is to provide you with a
            safe, efficient, smooth, and customized experience. This allows us to provide services and
            features that meet your needs and to customize our Platform to make your experience safer
            and easier. More importantly, we collect personal information from you that we consider
            necessary for achieving this purpose.</p><p>In general, you can browse the Platform without telling us who you are or revealing any
            personal information about yourself. Once you give us your personal information, by signing
            up through our portal you are not anonymous to us. Where possible, we indicate which fields
            are required and which fields are optional. You always have the option to not provide
            information by choosing not to use a particular service or feature on the Platform. We may
            automatically track certain information about you based upon your behavior on our Platform.
            We use this information to do internal research on our user's demographics, interests, and
            behavior to better understand, protect, and serve our users. This information is compiled and
            analyzed on an aggregated basis. This information may include the URL that you just came
            from (whether this URL is on our Platform or not), which URL you next go to (whether this
            URL is on our Platform or not), your computer browser information, and your IP address.</p><p>We use data collection devices such as "cookies" on certain pages of the Platform to help
            analyze our web page flow, measure promotional effectiveness, and promote trust and safety.
            "Cookies" are small files placed on your hard drive that assist us in providing our services.
            We offer certain features that are only available through the use of a "cookie".</p><p>We also use cookies to allow you to enter your password less frequently during a session.
            Cookies can also help us provide information that is targeted to your interests. Most cookies
            are "session cookies," meaning that they are automatically deleted from your hard drive at the
            end of a session. You are always free to decline our cookies if your browser permits. At this
            time, all features of the Platform will work even if you disable cookies. However, in the
            future and in the event that we add certain new or improved features and services to the
            Platform, the Platform or some parts of it may not be accessible if cookies are disabled. You
            may also be required to re-enter your password more frequently during a session.</p><p>Additionally, you may encounter "cookies" or other similar devices on certain pages of the
            Platform that are placed by third parties. We do not control the use of cookies by third parties.</p><p>If you choose to donate or contribute on or through the Platform, we collect information
            about your donation patterns and generally your usage behavior.</p><p>If you transact with us (through making donations/contributions), we collect some additional
            information, such as a billing address, a credit/debit card number and credit/debit card
            expiration date, and/or other payment instrument details and tracking information from
            cheques or money orders.</p><p>If you choose to post messages on our message boards, chat rooms, or other message areas or
            leave feedback, we will collect that information you provide to us. We retain this information
            as necessary to resolve disputes, provide user support, and troubleshoot problems as
            permitted by law.</p><p>If you send us personal correspondence, such as emails or letters, or if other users or third
            parties send us correspondence about your activities or postings on the Platform, we may
            collect such information into a file specific to you.</p><p>We collect personally identifiable information (email address, name, phone number, credit
            card/debit card/other payment instrument details, etc.) from you when you set up an account
            with us. While you can browse some sections of our Platform without being a registered
            member, certain activities (such as making a donation/contribution) do require registration.
            We do use your contact information to send you information such as receipts, certificates,
            upcoming events, newsletters, etc. We also provide certain data to the Campaigner to interact
            with you and send you information of the type aforementioned as well as to complete certain
            transactions and fulfill commitments such as rewards, updates, and the like.</p>`,
      },
      {
        question: "Use of Demographic/Profile Data/Your Information",
        answer: `<p>We use personal information to provide the services you request. To the extent we use your
        personal information to market to you, we will provide you with the ability to opt-out of such
        uses. We use your personal information to resolve disputes; troubleshoot problems; help
        promote a safe service; collect money either by us or through an authorized payment gateway
        facility; measure user interests in fundraisers hosted on our site; inform you about updates;
        customize your experience; detect and protect us against error, fraud, and other criminal
        activity; enforce our terms and conditions; and as otherwise described to you at the time of
        collection.</p><p>In our efforts to continually improve our product and service offerings, we collect and
        analyze demographic and profile data about our user's activity on our Platform.</p><p>We identify and use your IP address to help diagnose problems with our server and to
        administer our Platform. Your IP address is also used to help identify you and to gather broad
        demographic information.</p>`,
      },
      {
        question: "Sharing of Personal Information",
        answer: `<p>The following is information that we will not share with any third parties or disclose to any
        person other than as required by law: Sensitive Personal Data or Information of any person
        being the password, financial information such as bank account or credit card or debit card or
        other payment instrument details, sexual orientation, or any other sensitive personal
        information not essential for the continued use of the Platform.</p><p>We may share your personal information with third-party vendors or our other corporate
        and/or associate entities and affiliates to help with identity verification; detect and prevent
        identity theft, fraud, other potentially illegal acts, and cybersecurity incidents; correlate
        related or multiple accounts to prevent abuse of our services; and to facilitate joint or co-
        branded services that you request where such services are provided by more than one
        associate entity. In certain cases, in order to provide you with services, we may receive your
        personal information (such as your Permanent Account Number) from third parties regarding
        the verification of your identity status. To avail these services from third parties we may be
        required to share your personal information available with us (for instance, your mobile
        number) with the third party. We will only collect from and share your personal information
        with third parties if it is strictly necessary for the provision of our services. We do not retain
        the data obtained from these third parties for any purpose other than the provision of our
        services to you. Altruvo assumes no liability and is not responsible for the manner in which
        third parties gather and extract your personal information. These entities and affiliates may
        not market to you as a result of such sharing unless you explicitly opt-in.</p><p>We may disclose personal information if required to do so by law or in the good faith belief
        that such disclosure is reasonably necessary to respond to summons, court orders, or other
        legal processes. We may disclose personal information to law enforcement officers, third-
        party rights owners, or others in the good faith and belief that such disclosure is reasonably
        necessary to: enforce our Terms of Use or Privacy Policy; respond to claims that an
        advertisement, posting, or other content violates the rights of a third party; or protect the
        rights, property, or personal safety of our users or the general public.</p><p>We and our affiliates will share, part with, and allow any other business entity to use the
        personal information provided by the User to Altruvo, in the event we (or our assets) plan to
        merge with, or be acquired by that business entity, or re-organization, amalgamation,
        restructuring of business. Should such a transaction occur, that other business entity (or the
        new combined entity) will be required to follow this privacy policy with respect to your
        personal information.</p>`,
      },
      {
        question: "Links to Other Sites",
        answer: `Our Platform links to other websites and apps that may collect personally identifiable
        information about you. Altruvo is not responsible for the privacy practices or the content of
        those linked websites and apps.`,
      },
      {
        question: "Security Precautions/Security Breach",
        answer: `<p>Our Platform has stringent security measures in place to protect the loss, misuse, and
        alteration of the information under our control. Whenever you change or access your account
        information, we offer the use of a secure server. Once your information is in our possession,
        we adhere to strict security guidelines, protecting it against unauthorized access. Our web
        hosts, transaction affiliates, etc., all use industry-grade and standardized methods to protect
        your information from any misuse.</p><p>If any User has sufficient reason to believe their Data, as regarded as that which we do not
        share with third parties, has been compromised or there has been a breach of security due to a
        cybersecurity incident, you may write to us immediately at the contact details mentioned
        below so that we may take suitable measures to either rectify such a breach and inform the
        concerned authorities of a cybersecurity incident.</p>`,
      },
      {
        question:
          "Review of Information/Account Deactivation/Removal of Information",
        answer: `<p>If at any time a User wishes to review the information provided to Altruvo at the time of
        registering with Altruvo or at any time thereafter, you may do so by signing into your account
        and amending the same.</p><p>We provide all users with the opportunity to opt-out of receiving non-essential (promotional,
        marketing-related) communications from us on behalf of our Campaigner, and from us in
        general, after setting up an account. All Users are also given the option of canceling their
        User accounts and bringing to our attention their desire to discontinue the use of our services.</p><p>If you want to deactivate your account or remove your contact information from all
        altruvo.org's lists and newsletters, please write to us at workaltruvo@gmail.com.</p>`,
      },
      {
        question: "Advertisements on altruvo.org",
        answer: `We use third-party advertising companies to serve ads when you visit our Platform. These
        companies may use information (not including your name, address, email address, or
        telephone number and generally other information which may identify you personally) about
        your visits to this and other websites and apps in order to provide advertisements about goods
        and services of interest to you.`,
      },
      {
        question: "Your Consent",
        answer: `<p>By using the Platform and/or by providing your information, you consent to the collection
        and use of the information you disclose on the Platform in accordance with this Privacy
        Policy, including but not limited to your consent for sharing your information as per this
        privacy policy.</p><p>If we decide to change our privacy policy, we will post those changes on this page so that you
        are always aware of what information we collect, how we use it, and under what
        circumstances we disclose it.</p><p>The donors/contributors hereby permit Altruvo to share their personal information such as
        name, email address, and contact information with the respective Campaigner and
        beneficiaries of the donations made by the donors via altruvo.org.</p><p>By continuing to the next step you are willingly giving Altruvo permission to contact you via
        WhatsApp, Email, SMS, and other modes of communication.</p>`,
      },
      {
        question: "Retention of Information",
        answer: `<p>Information provided by you to Altruvo is processed, stored, and retained through our servers
        and web hosts being Amazon Web Services.</p><p>Our web hosts and agency managing your information are compliant with IS/ISO/IEC27001
        or an equivalent in standards of Security Techniques and Information Security Management
        System Requirements.</p>`,
      },
      {
        question: "Contact",
        answer: `In case of queries, you may contact us on the details provided in the <a href="/contact-us">Contact Us</a> page.`,
      },
    ],
  };

  // Pass data to the page via props
  return { props: { data, isMobile } };
}
