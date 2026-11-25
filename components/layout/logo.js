import LeafNode from 'components/icons/leaf-node';

const Logo = () => {
  return (
    <span className="inline-flex flex-col gap-1 leading-none">
      <span className="flex items-center gap-1 font-editorial text-3xl sm:text-4xl">
        Maya's
        <LeafNode />
      </span>
      <span className="text-[10px] font-medium tracking-[0.2em]">
        KITCHEN NOTES
      </span>
    </span>
  );
};
export default Logo;
