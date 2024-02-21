import styles from "../page.module.scss";
import Header from "../components/header";

export default function Privacy() {
  return (
    <main className={styles.main}>
      <Header styles={styles} />

      <div className={styles.hero}>
        <h1>Privacy Policy</h1>

        <ol className={styles.privacy}>
          <li>
            <p>Collection and Storage of Personal Data</p>
            <span>
              Shortzy only collects and stores personal data that are necessary
              for providing link shortening services and managing them. Access
              to link shortening functionality is available for both users with
              accounts and those who use the application anonymously.
            </span>
          </li>

          <li>
            <p>Data Collected During Registration and Login</p>
            <span>
              Users have the option to log in to the Shortzy app using their
              Google or GitHub account. In such cases, Shortzy only collects
              necessary identification data, such as user ID, username, email
              address, and profile picture. This information is used solely for
              user authentication and personalizing the user experience within
              the app.
            </span>
          </li>

          <li>
            <p>Data Collected During App Usage</p>
            <span>
              When using the Shortzy app, certain activity data is also
              collected, such as the URLs being shortened and information about
              clicks on shortened links. This data is stored to ensure the
              functionality of the app and click statistics. It is not
              associated with personal data of users who use the app
              anonymously.
            </span>
          </li>

          <li>
            <p>Protection of Personal Data</p>
            <span>
              Shortzy takes all necessary technical and organizational measures
              to protect users&apos; personal data from unauthorized access,
              loss, or unauthorized disclosure. All data is stored on secure
              servers, and access is restricted to authorized personnel only.
            </span>
          </li>

          <li>
            <p>Access to Personal Data</p>
            <span>
              Personal data of Shortzy users is not disclosed to third parties
              without explicit user consent unless required by law or in
              accordance with the provisions of this privacy policy.
            </span>
          </li>

          <li>
            <p>Consent to Privacy Policy</p>
            <span>
              By using the Shortzy app, the user agrees to the terms of this
              privacy policy. If the user does not agree to the terms of the
              privacy policy, they should refrain from using the app.
            </span>
          </li>
        </ol>

        <p>This privacy policy was last updated on February 21, 2024.</p>
      </div>
    </main>
  );
}
