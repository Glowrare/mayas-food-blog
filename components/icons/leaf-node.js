import { cn } from 'lib/utils';

const LeafNode = ({ className }) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn('h-5 w-5', className)}
    >
      <path d="M5 20C5 10 12 4 20 4c0 9-5 15-13 15M5 20l11-11" />
    </svg>
  );
};
export default LeafNode;
