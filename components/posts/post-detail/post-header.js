import Image from 'next/image';
import classes from './post-header.module.css';

const PostHeader = (props) => {
  const { title, image } = props;

  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <div className={classes.image}>
        <Image src={image} alt={title} fill sizes="200px" loading="eager" />
      </div>
    </header>
  );
};
export default PostHeader;
