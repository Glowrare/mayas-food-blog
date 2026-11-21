import Link from 'next/link';
import classes from './site-footer.module.css';
import Logo from './logo';

const SiteFooter = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.top}>
        <div className={classes.logo}>
          <Link href="/" aria-label="Maya's Kitchen Notes">
            <Logo />
          </Link>
          <small>Weeknight recipes and simple nitrition notes</small>
        </div>
        <div className={classes.explore}>
          <h3>Explore</h3>
          <div className={classes.links}>
            <Link href="/posts">All Recipes</Link>
            <Link href="/contact">Reach Out</Link>
          </div>
        </div>
      </div>
      <div className={classes.copy}>
        &copy; 2026 Maya Reyes . Made with love
      </div>
    </footer>
  );
};
export default SiteFooter;
