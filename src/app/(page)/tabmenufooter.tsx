"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Tabmenufooter = ({
  title,
  icon,
  link,
}: {
  title: string;
  icon: any;
  link: string;
}) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  // Get the first segment of the path
  const firstPath = pathSegments[1];
  const linkSegments = link.split("/");
  const linkPath = linkSegments[1];
  if (link == "/") {
    return (
      <Link
        href={link}
        className={`
        ${pathname == link ? "text-success" : "text-white "}
        flex select-none 
         p-1 w-[100px] flex-col items-center`}
      >
        <div>{icon}</div>
        <p className="text-sm">{title}</p>
      </Link>
    );
  } else if (firstPath === "trade" && linkPath == "trade") {
    return (
      <Link
        href={link}
        className={`text-success flex select-none 
         p-1 w-[100px] flex-col items-center`}
      >
        <div>{icon}</div>
        <p className="text-sm">{title}</p>
      </Link>
    );
  } else {
    return (
      <Link
        href={link}
        className={`
      ${pathname.includes(link) ? "text-success" : "text-white "}
      flex select-none 
       p-1 w-[100px] flex-col items-center`}
      >
        <div>{icon}</div>
        <p className="text-sm">{title}</p>
      </Link>
    );
  }
};
export default Tabmenufooter;
