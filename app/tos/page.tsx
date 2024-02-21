import React from "react";
import styles from "../page.module.scss";
import Header from "../components/header";

export default function ToS() {
  return (
    <main className={styles.main}>
      <Header styles={styles} />

      <div className={styles.hero}>
        <h1>Terms of Service</h1>

        <ol className={styles.privacy}>
          <li>
            <p>Use of the Service</p>
            <span>
              By accessing or using the Service, you represent and warrant that
              you are legally capable of entering into binding contracts and
              comply with these Terms. If you are under the age of 18, you may
              only use the Service with the involvement of a parent or guardian.
              If you are accessing or using the Service on behalf of a company,
              entity, or organization, you represent and warrant that you have
              the authority to bind such entity to these Terms.
            </span>
            <span>
              While some features of the Service may be available without
              creating an account, certain aspects require account registration.
              When creating an account, you agree to provide accurate, current,
              and complete information, and to update such information as
              necessary to maintain its accuracy. You are solely responsible for
              maintaining the confidentiality of your account credentials and
              for all activities that occur under your account.
            </span>
          </li>

          <li>
            <p>User Content</p>
            <span>
              By submitting content to the Service, including but not limited to
              URLs and associated information, you grant Shortzy a worldwide,
              non-exclusive, royalty-free, sublicensable, and transferable
              license to use, reproduce, distribute, prepare derivative works
              of, display, and perform your content in connection with the
              Service.
            </span>
            <span>
              You agree not to submit any content that is unlawful, defamatory,
              libelous, threatening, pornographic, harassing, hateful, racially
              or ethnically offensive, or encourages conduct that would be
              considered a criminal offense, give rise to civil liability,
              violate any law, or is otherwise inappropriate.
            </span>
          </li>

          <li>
            <p>Intellectual Property</p>
            <span>
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of Shortzy and its
              licensors. The Service is protected by copyright, trademark, and
              other laws of both the United States and foreign countries.
            </span>
          </li>

          <li>
            <p>Limitation of Liability</p>
            <span>
              The Service is provided on an "as-is" and "as available" basis.
              Shortzy makes no warranties, expressed or implied, and hereby
              disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </span>
            <span>
              In no event shall Shortzy, nor its directors, employees, partners,
              agents, suppliers, or affiliates, be liable for any indirect,
              incidental, special, consequential, or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other
              intangible losses, resulting from your access to or use of or
              inability to access or use the Service; any conduct or content of
              any third party on the Service; any content obtained from the
              Service; and unauthorized access, use, or alteration of your
              transmissions or content, whether based on warranty, contract,
              tort, or any other legal theory, whether or not we have been
              informed of the possibility of such damage, and even if a remedy
              set forth herein is found to have failed of its essential purpose.
            </span>
          </li>

          <li>
            <p>Changes to Terms of Service</p>
            <span>
              Shortzy reserves the right, at its sole discretion, to modify or
              replace these Terms at any time. If a revision is material, we
              will provide at least 30 days&apos; notice prior to any new terms
              taking effect. What constitutes a material change will be
              determined at our sole discretion.
            </span>
            <span>
              By continuing to access or use our Service after any revisions
              become effective, you agree to be bound by the revised terms. If
              you do not agree to the new terms, you are no longer authorized to
              use the Service.
            </span>
          </li>

          <li>
            <p>Consent to Terms of Service</p>
            <span>
              By using the Service, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service.
            </span>
          </li>
        </ol>

        <p>This Terms of Service were last updated on February 21, 2024.</p>
      </div>
    </main>
  );
}
