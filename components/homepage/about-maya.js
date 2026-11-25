import Image from 'next/image';

export default function AboutMaya() {
  return (
    <section aria-labelledby="about-heading" className="flex flex-col items-center gap-6 rounded-xl bg-lavender p-6 text-center sm:flex-row sm:p-10 sm:text-left">
      <Image src="/images/site/avatar.jpg" alt="Portrait of Maya" width={144} height={144}
        className="h-36 w-36 shrink-0 rounded-full object-cover object-top" />
      <div className="space-y-3">
        <h2 id="about-heading" className="font-editorial text-3xl text-brand">Hi, I'm Maya.</h2>
        <p className="max-w-prose leading-relaxed text-ink">I blog about weeknight recipes and simple nutrition notes.</p>
      </div>
    </section>
  );
}
