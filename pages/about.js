import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";

export default function About() {
  const d = new Date();
  let year = d.getFullYear();
  let tags = [
    "React",
    "JavaScript",
    "TypeScript",
    "GoLang",
    "AngularJS",
    "ASP.Net MVC",
    "AWS",
    "DigitalOcean",
    "CI/CD",
  ];
  return (
    <Layout>
      <Head>
        <title>Onur - About</title>
        <meta name="description" content="Onur Karaoğlan's simple about page" />
      </Head>
      <div className={styles.container}>
        <p className={styles.title}>About Me</p>
        <p className={styles.content}>
          I am a full-stack software engineer with {year - 2015}+ years of
          experience and a Bachelor’s degree in Computer Science. I have
          hands-on experience using various technologies like JavaScript(ES6),
          TypeScript, React.js and Golang to create and implement software
          applications.
        </p>
        <p className={styles.content}>
          {" "}
          Also, I am familiar with AngularJS and .Net MVC. I use version control
          systems and CI/CD pipelines with my projects which run on cloud
          platforms like AWS, DigitalOcean and VSTS(Azure DevOps).
        </p>
        <p className={styles.content}>
          I enjoy being challenged and engaging with projects that require me to
          work outside of my comfort and knowledge set. Continuing to learn new
          languages and development techniques is important to me.
        </p>

        <div>
          <p style={{ display: "inline" }}>Keywords:</p>
          <div className={styles.about_tags}>
            {tags.map((tag) => {
              return (
                <div key={tag} className={styles.tag}>
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
