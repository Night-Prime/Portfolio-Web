import React, { useEffect, useRef } from "react";
import EditorJS, {
  EditorConfig,
  ToolConstructable,
  BlockToolConstructable,
} from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import { NotificationType, showNotification } from "../../service/notification";
import { uploadToCloudinary } from "../../service/utils";

interface EditorProps {
  onChange?: (data: any) => void;
  initialData?: any;
}

/**
 * This handles the configuration for the plug-and-play Word Editor tool i'm using(EditorJS)
 */

const Editor: React.FC<EditorProps> = ({ onChange, initialData }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Now, we create a new instance
    if (containerRef.current) {
      const editor = new EditorJS({
        holder: containerRef.current,
        tools: {
          header: {
            class: Header as BlockToolConstructable | any,
            config: {
              placeholder: "Enter a header",
              levels: [1, 2, 3, 4],
              defaultLevel: 2,
            },
            inlineToolbar: ["link"],
          },
          list: {
            class: List as BlockToolConstructable | any,
            inlineToolbar: true,
          },
          quote: {
            class: Quote as BlockToolConstructable | any,
            inlineToolbar: true,
          },
          code: Code as BlockToolConstructable | any,
          linkTool: {
            class: LinkTool as BlockToolConstructable | any,
            config: {
              endpoint: "/api/link-preview",
            },
          },
          image: {
            class: ImageTool as BlockToolConstructable | any,
            config: {
              // Direct upload to Cloudinary
              uploader: {
                uploadByFile: uploadToCloudinary,
              },
            },
          },
        },

        data: initialData,
        async onChange() {
          const content = await editor.save();
          if (onChange) {
            onChange(content);
          }
        },
      });
      // Promisify Instance.
      editor.isReady
        .then(() => {
          editorRef.current = editor;
        })
        .catch((reason) => {
          showNotification("Editor Plugin Error: ", NotificationType.ERROR);
        });
    }
  }, []);

  return <div className="w-full h-full" ref={containerRef} />;
};

export default Editor;
