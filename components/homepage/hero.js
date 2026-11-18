import Image from 'next/image';
import classes from './hero.module.css';

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src='/images/site/avatar.jpg' alt="An illustrated portrait of Maya Reyes" width={320} height={320} />
      </div>
      <h1>Hi, I'm Maya.</h1>
      <p>I blog about weeknight recipes and simple nutrition notes.</p>
    </section>
  );
};
export default Hero;
