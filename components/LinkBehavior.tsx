"use client";

import * as React from "react";
import NextLink, { LinkProps } from "next/link";

const LinkBehavior = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function LinkBehavior(props, ref) {
    return <NextLink ref={ref} {...props} />;
  }
);

export default LinkBehavior;
