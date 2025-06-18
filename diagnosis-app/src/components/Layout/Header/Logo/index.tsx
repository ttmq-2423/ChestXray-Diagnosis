import { getImagePrefix } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src={`${getImagePrefix()}images/header/logo.png`}
        alt="logo"
        width={80}
        height={60}
        style={{ width: "20", height: "20" }}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
