import Image from "next/image";
import { getPost, getPosts } from "@onur/data/api/post";
import slug from "slug";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  MARKS,
  BLOCKS,
  INLINES,
  Document,
  Block,
  Inline,
  Text,
} from "@contentful/rich-text-types";
import PrismContent from "./PrismContent";
import type { Metadata } from "next";
import { BackButton } from "@onur/components/ui/back-button";

interface Props {
  params: Promise<{ id: string }>;
}

interface EmbeddedAssetBlock extends Block {
  data: {
    target: {
      fields: {
        file: {
          url: string;
        };
        description: string;
      };
    };
  };
}

const isText = (node: Block | Inline | Text): node is Text => {
  return node.nodeType === "text";
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: `${slug(post.fields.title)}-${post.sys.id}`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: paramId } = await params;
  const id = paramId.split("-").slice(-1)[0];
  const post = await getPost(id);

  return {
    title: `Blog - ${post.fields?.title}`,
    description: post.fields?.description,
  };
}

export default async function Post({ params }: Props) {
  const { id: paramId } = await params;
  const id = paramId.split("-").slice(-1)[0];
  const post = await getPost(id);

  let languages = "";
  post.fields.languages?.forEach((language) => {
    languages = languages + `language-${language} `;
  });

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => (
        <strong className="font-bold">{text}</strong>
      ),
      [MARKS.ITALIC]: (text: React.ReactNode) => (
        <em className="italic">{text}</em>
      ),
      [MARKS.UNDERLINE]: (text: React.ReactNode) => (
        <u className="underline">{text}</u>
      ),
      [MARKS.CODE]: (text: string) => {
        return (
          <div className="my-4">
            <pre className="line-numbers m-0">
              <code className={languages}>{text}</code>
            </pre>
          </div>
        );
      },
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node: Block, children: React.ReactNode) => (
        <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: Block, children: React.ReactNode) => (
        <h2 className="text-3xl font-bold mt-7 mb-3">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: Block, children: React.ReactNode) => (
        <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node: Block, children: React.ReactNode) => (
        <h4 className="text-xl font-bold mt-5 mb-2">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node: Block, children: React.ReactNode) => (
        <h5 className="text-lg font-bold mt-4 mb-2">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node: Block, children: React.ReactNode) => (
        <h6 className="text-base font-bold mt-3 mb-2">{children}</h6>
      ),
      [BLOCKS.PARAGRAPH]: (node: Block, children: React.ReactNode) => {
        // Check if the paragraph contains only a code block
        if (
          node.content.length === 1 &&
          isText(node.content[0]) &&
          node.content[0].marks?.some((mark) => mark.type === "code")
        ) {
          // Render code block directly
          return options.renderMark[MARKS.CODE](node.content[0].value);
        }
        // Otherwise, wrap in a paragraph as usual
        return <p className="my-4 leading-7">{children}</p>;
      },
      [BLOCKS.UL_LIST]: (node: Block, children: React.ReactNode) => (
        <ul className="list-disc list-outside my-4 space-y-2 ml-6 pl-2">
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (node: Block, children: React.ReactNode) => (
        <ol className="list-decimal list-outside my-4 space-y-2 ml-6 pl-2">
          {children}
        </ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: Block, children: React.ReactNode) => (
        <li className="leading-7 pl-2">{children}</li>
      ),
      [BLOCKS.QUOTE]: (node: Block, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4 text-gray-600 dark:text-gray-400">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => (
        <hr className="my-8 border-t border-gray-300 dark:border-gray-700" />
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: Block) => {
        const assetBlock = node as EmbeddedAssetBlock;
        const { fields } = assetBlock.data.target;
        return (
          <img
            src={fields.file.url}
            width="100%"
            height="auto"
            alt={fields.description}
            className="my-6 rounded-lg"
          />
        );
      },
      [INLINES.HYPERLINK]: (node: Inline, children: React.ReactNode) => {
        const { uri } = node.data;
        if (uri.includes("player.vimeo.com/video")) {
          return (
            <iframe
              title="Unique Title 001"
              src={uri}
              frameBorder="0"
              allowFullScreen
              className="w-full h-[50vh]"
            ></iframe>
          );
        } else if (uri.includes("youtube.com/embed")) {
          return (
            <iframe
              title="Unique Title 002"
              src={uri}
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
              allowFullScreen
              className="w-full h-[50vh]"
            ></iframe>
          );
        }
        // Regular hyperlinks
        return (
          <a
            href={uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            {children}
          </a>
        );
      },
    },
  };

  const rawRichTextField = post.fields.body as Document;
  if (!rawRichTextField) {
    return (
      <div className="flex flex-col items-center mx-auto text-center relative p-8 max-w-7xl">
        <p>No content available</p>
      </div>
    );
  }

  const body = documentToReactComponents(rawRichTextField, options);

  const { file, description: imgDescription } =
    post.fields.image?.fields || {};
  const src = file ? `https:${file.url}` : "";

  const tags = post.metadata.tags?.map((tag) => tag.sys.id) || [];

  return (
    <PrismContent post={post}>
      <BackButton />
      <div className="flex flex-col items-center mx-auto relative p-8 max-w-[900px]">
        <div className="text-start inline-flex justify-start mt-10 mb-6">
          {tags.map((tag) => (
            <div
              key={tag}
              className="text-[var(--fg)] px-2.5 py-1.5 text-sm rounded bg-[var(--tags)] inline-flex mr-1.5 mb-1.5 cursor-pointer"
            >
              {tag}
            </div>
          ))}
        </div>
        <p className="text-center mb-6 leading-tight text-5xl">
          {post.fields.title}
        </p>
        <p className="leading-normal text-2xl mb-8">{post.fields.description}</p>
        {src && (
          <Image
            src={src}
            alt={imgDescription || ""}
            layout="responsive"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "100%", height: "auto" }}
            className="align-middle object-cover mb-8"
            unoptimized={true}
          />
        )}
        <div className="w-full max-w-[90vw] text-base md:text-lg mt-6">
          {body}
        </div>
      </div>
    </PrismContent>
  );
}

