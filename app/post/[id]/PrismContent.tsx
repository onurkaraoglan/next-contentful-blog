"use client";

import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-javascript";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import { Post } from "@onur/data/api/post";

interface Props {
  post: Post;
  children: React.ReactNode;
}

export default function PrismContent({ post, children }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [post]);

  return <div ref={contentRef}>{children}</div>;
}

