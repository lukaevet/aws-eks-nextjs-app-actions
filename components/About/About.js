import styles from "./About.module.sass";

import Section from "../Section/Section";
import Container from "../Container/Container";
import Divider from "../Divider/Divider";
import ProfilePic from "../ProfilePic/ProfilePic";
import Text from "../Text/Text";

export default function About() {
  return (
    <Section id="about" className={styles.about}>
      <Container className={styles.container}>
        
        <div className={styles.content}>
          <Text tag="h2">Ola 👋</Text>
          <Text>
            I'm Luka, a coffee lover ☕, 30-something-year-old
            <b>DevOps Engineer</b> 💻 
          </Text>
          <Text>🧡
          </Text>
        </div>
      </Container>
      <Divider />
    </Section>
  );
}
