import { Fragment } from 'react';
import Link from 'next/link';
import { cn } from '../../lib/utils';

const buttonBase =
  'inline-block rounded-[4px] p-2 uppercase no-underline outline-none focus:outline focus:outline-1 focus:outline-dotted';

const designs = {
  default:
    'border-none bg-primary-700 text-grey-50 hover:bg-primary-500 hover:text-grey-50 focus:bg-primary-500 focus:text-grey-50',
  alt: 'border-2 border-solid border-primary-700 bg-grey-100 text-grey-800 hover:border-dashed hover:border-primary-500 hover:bg-grey-100 hover:text-grey-800 focus:border-dashed focus:border-primary-500 focus:bg-grey-100 focus:text-grey-800',
};

const Button = (props) => {
  const { path, mode = 'btn', text, design = 'default', clickHandler } = props;
  const className = cn(buttonBase, designs[design] ?? designs.default);

  return (
    <Fragment>
      {mode === 'link' && (
        <Link href={path} className={className}>
          {text}
        </Link>
      )}
      {mode === 'btn' && (
        <button type="button" className={className} onClick={clickHandler}>
          {text}
        </button>
      )}
    </Fragment>
  );
};
export default Button;
