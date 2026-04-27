import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-lg" aria-label="CBAM Compliance Startseite">
      <Image
        src="/images/Logo.png"
        alt="CBAM Compliance Import Compliance Advisory"
        width={260}
        height={130}
        priority
        className="h-14 w-auto object-contain md:h-16"
      />
    </Link>
  );
}
