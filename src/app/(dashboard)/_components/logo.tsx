import Image from "next/image";

const Logo = () => {
  return (
    <Image
      height={48}
      width={130}
      alt="logo"
      src="/logolms.png"
      loading="lazy"
      decoding="async"
      className="h-12"
    />
  );
};

export default Logo;
