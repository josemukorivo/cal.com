import { AdminRequired } from "components/ui/AdminRequired";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, { ElementType, FC, Fragment } from "react";

import classNames from "@lib/classNames";

export interface NavTabProps {
  tabs: {
    name: string;
    href: string;
    icon?: ElementType;
    adminRequired?: boolean;
  }[];
  linkProps?: Omit<LinkProps, "href">;
}

const NavTabs: FC<NavTabProps> = ({ tabs, linkProps }) => {
  const router = useRouter();
  return (
    <>
      <nav className="-mb-px flex space-x-5 rtl:space-x-reverse sm:rtl:space-x-reverse" aria-label="Tabs">
        {tabs.map((tab) => {
          let href;
          let isCurrent;

          if (tab.href) {
            href = tab.href;
            isCurrent = router.asPath === tab.href;
          } else if (tab.tabName) {
            //TODO: Handle Current Implementation
            href = "";
            isCurrent = router.query.tabName === tab.tabName;
          }
          const onClick = tab.tabName
            ? (e) => {
                e.preventDefault();
                router.push({
                  query: {
                    ...router.query,
                    tabName: tab.tabName,
                  },
                });
              }
            : () => {};

          const Component = tab.adminRequired ? AdminRequired : Fragment;
          return (
            <Component key={tab.name}>
              <Link key={tab.name} href={href} {...linkProps}>
                <a
                  onClick={onClick}
                  className={classNames(
                    isCurrent
                      ? "border-neutral-900 text-neutral-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                  )}
                  aria-current={isCurrent ? "page" : undefined}>
                  {tab.icon && (
                    <tab.icon
                      className={classNames(
                        isCurrent ? "text-neutral-900" : "text-gray-400 group-hover:text-gray-500",
                        "-ml-0.5 hidden h-5 w-5 ltr:mr-2 rtl:ml-2 sm:inline-block"
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <span>{tab.name}</span>
                </a>
              </Link>
            </Component>
          );
        })}
      </nav>
      <hr />
    </>
  );
};

export default NavTabs;
